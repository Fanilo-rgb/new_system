import {NextFunction, Request, Response} from "express";
import {ItemType} from "../global/types";
import Ticket from "../models/ticket.model";
import Stock from "../models/stock.model";
import mongoose from "mongoose";
import Sale from "../models/sale.model";
import {createError} from "../global/function";

interface Item extends ItemType {
  ticket: mongoose.Types.ObjectId;
  seatPurchase: boolean;
}

export const getSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dollar = 3600

    const sales = await Sale.aggregate([
      {
        '$group': {
          '_id': {
            '_id': '$product',
            'date': {
              '$dateTrunc': {
                'date': '$createdAt',
                'unit': 'day'
              }
            },
            'closed': '$closed',
            'seatPurchase': '$seatPurchase'
          },
          'quantity': {
            '$sum': '$quantity'
          }
        }
      }, {
        '$lookup': {
          'from': 'products',
          'localField': '_id._id',
          'foreignField': '_id',
          'as': 'product'
        }
      }, {
        '$unwind': {
          'path': '$product'
        }
      }, {
        '$project': {
          '_id': '$product._id',
          'name': '$product.name',
          'bv': {
            '$multiply': [
              '$product.bv', '$quantity'
            ]
          },
          'price': {
            '$ifNull': [
              '$product.price', {
                '$multiply': [
                  '$product.bv', dollar, '$quantity'
                ]
              }
            ]
          },
          'quantity': 1,
          'date': '$_id.date',
          'closed': '$_id.closed',
          'seatPurchase': '$_id.seatPurchase'
        }
      }, {
        '$match': {
          'seatPurchase': false
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: sales,
    })
  } catch (error) {
    next(error);
  }
}

export const handleSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const data: { customer: string, products: Item[], seatPurchase: boolean } = req.body;

  if (!data.customer) {
    throw createError("A customer is required", 400);
  }
  try {
    const ticket = new Ticket({ owner: data.customer, seatPurchase: data.seatPurchase });
    await ticket.save({ session });

    for (const item of data.products) {
      const product = await Stock.findOne({ product: item.product }).session(session);

      if (!product) {
        await session.abortTransaction();
        await session.endSession();
        await Ticket.findByIdAndDelete(ticket._id);
        throw createError("Product not found", 404);
      }

      if (item.quantity === 0) {
        await session.abortTransaction();
        await session.endSession();
        await Ticket.findByIdAndDelete(ticket._id);
        throw createError("The quantity must be greater than 0", 400);
      }

      if (product.quantity < item.quantity) {
        await session.abortTransaction();
        await session.endSession();
        await Ticket.findByIdAndDelete(ticket._id);
        throw createError("Not enough quantity", 400);
      }

      item.ticket = ticket._id as mongoose.Types.ObjectId;
      item.seatPurchase = data.seatPurchase;

      if (!data.seatPurchase) {
        product.quantity -= item.quantity;
        await product.save({ session });
      }

      const newSale = new Sale(item);
      await newSale.save({ session });
    }

    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({
      success: true,
    });

  } catch (error) {
    await session.abortTransaction().catch(() => {});
    await session.endSession();
    next(error);
  }
}

export const getTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticket = await Ticket.aggregate([
      {
        $lookup: {
          from: 'sales',
          localField: '_id',
          foreignField: 'ticket',
          as: 'item'
        }
      }, {
        $lookup: {
          from: 'distributors',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner'
        }
      }, {
        $unwind: {
          path: '$item'
        }
      }, {
        $unwind: {
          path: '$owner'
        }
      }, {
        $lookup: {
          from: 'products',
          localField: 'item.product',
          foreignField: '_id',
          as: 'product'
        }
      }, {
        $unwind: {
          path: '$product'
        }
      }, {
        $group: {
          '_id': '$_id',
          'owner': {
            '$first': '$owner'
          },
          'delivered': {
            '$first': '$delivered'
          },
          'printed': {
            '$first': '$printed'
          },
          'seatPurchase': {
            '$first': '$seatPurchase'
          },
          'products': {
            '$push': {
              'name': '$product.name',
              'bv': '$product.bv',
              'quantity': '$item.quantity',
              'price': {
                '$ifNull': [
                  '$product.price', {
                    '$multiply': [
                      '$product.bv', 3600
                    ]
                  }
                ]
              }
            }
          },
          'createdAt': {
            '$first': '$createdAt'
          }
        }
      }, {
        $project: {
          '_id': 1,
          'owner.name': 1,
          'owner.surname': 1,
          'owner.numberCard': 1,
          'printed': 1,
          'products': 1,
          'createdAt': 1,
          'seatPurchase': 1,
          'delivered': 1
        }
      }, {
        $sort: {
          'createdAt': -1
        }
      }
    ])

    res.status(200).json({
      success: true,
      data: ticket,
    })
  } catch (error) {
    next(error);
  }
}