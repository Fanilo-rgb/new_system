import {NextFunction, Request, Response} from "express";
import {ProductType} from "../global/types";
import Product from "../models/product.model";
import Stock from "../models/stock.model";
import {createError} from "../global/function";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product: ProductType = req.body
    const newProduct = new Product(product)
    await newProduct.save();

    const savedProduct = await Product.findById(newProduct._id)
    const newStock = new Stock({
      product: newProduct._id,
      quantity: 0,
    })

    await newStock.save()

    res.status(201).json({
      success: true,
      message: "Product created",
      data: savedProduct
    });
  } catch (error) {
    next(error)
  }
}

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
)=> {
  try {
    const dollar = 3600
    const products = await Product.find({}).select("name bv price order").sort({ name: 1 })

    const formatted = products.map(product => ({
      ...product.toObject(),
      price: product.price ?? product.bv * dollar,
    }))

    res.status(200).json({
      success: true,
      data: formatted,
    })
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const newData: ProductType = req.body;

  const product = await Product.findById(id);

  if (!newData.name || !newData.bv || !newData.order) {
    throw createError("All fields are required", 400)
  }

  if (!product) {
    throw createError("Product not found", 404)
  }

  product.name = newData.name;
  product.bv = newData.bv;
  product.order = newData.order;

  if (newData.price) product.price = newData.price;
  try {
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  const stock = await Stock.findOne({ product: id })

  if (!stock || !product) {
    throw createError("Product not found", 404)
  }
  try {

    await stock.deleteOne()
    await product.deleteOne()

    res.status(200).json({
      success: true,
      message: "Product deleted"
    });
  } catch (error) {
    next(error);
  }
};
