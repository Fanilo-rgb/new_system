import {NextFunction, Request, Response} from "express";
import Customer from "../models/customer.model";
import {CustomerType} from "../global/types";
import {createError} from "../global/function";

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer: CustomerType = req.body
    const newCustomer = new Customer(customer)
    await newCustomer.save();
    res.status(201).json({
      success: true,
      message: "Customer added successfully",
      data: newCustomer
    });
  } catch (error) {
    next(error);
  }
}

export const getCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = await Customer.find({})
    res.status(200).json({
      success: true,
      data: customer
    })
  } catch (error) {
    next(error);
  }
}

export const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const newData = req.body;

  const customer = await Customer.findById(id)

  if (!newData.name || !newData.surname || !newData.height || !newData.weight) {
    throw createError("All field is required", 400);
  }

  if (!customer) {
    throw createError("Customer not found", 400);
  }

  try {
    customer.name = newData.name;
    customer.save();

    res.status(201).json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await Customer.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Customer deleted",
    })
  } catch (error) {
    next(error);
  }
}