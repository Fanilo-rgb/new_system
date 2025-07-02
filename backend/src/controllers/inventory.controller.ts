import { Request, Response, NextFunction } from "express";
import Stock from "../models/stock.model";
import mongoose from "mongoose";
import StockEntry from "../models/stockEntry.model";
import {createError} from "../global/function";

export const getStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dollar = 3600;

    const stock = await Stock.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $addFields: {
          "product.price": {
            $ifNull: ["$product.price", { $multiply: ["$product.bv", dollar] }]
          }
        }
      },
      {
        $project: {
          _id: 1,
          quantity: 1,
          "product.name": 1,
          "product.bv": 1,
          "product.order": 1,
          "product.price": 1
        }
      },
      {
        $sort: {
          "product.name": 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stock
    });
  } catch (error) {
    next(error);
  }
};

export const updateStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const items: { _id: mongoose.Types.ObjectId, quantity: number }[] = req.body

  for (const item of items) {
    const stock = await Stock.findById(item._id)

    if (!stock) {
      throw createError("Stock not found", 404)
    }

    try {
      stock.quantity += item.quantity;
      await stock.save();

      await StockEntry.create({ product: stock.product, quantity: item.quantity });

      res.status(200).json({
        success: true,
      })
    } catch (error) {
      next(error);
    }
  }
}

export const getStockEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dollar = 3600
  try {
    const entry = await StockEntry.aggregate([
      {
        '$group': {
          '_id': {
            '_id': '$product',
            'date': {
              '$dateTrunc': {
                'date': '$createdAt',
                'unit': 'day'
              }
            }
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
          '_id': '$_id._id',
          'name': '$product.name',
          'bv': '$product.bv',
          'price': {
            '$ifNull': [
              '$product.price', {
                '$multiply': [
                  '$product.bv', dollar
                ]
              }
            ]
          },
          'order': '$product.order',
          'quantity': 1,
          'date': '$_id.date'
        }
      }
    ])

    res.status(200).json({
      success: true,
      data: entry,
    })
  } catch (error) {
    next(error);
  }
}