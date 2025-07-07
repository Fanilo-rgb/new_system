import {NextFunction, Request, Response} from "express";
import Distributor from "../models/distributor.model";
import {DistributorType} from "../global/types";
import {createError} from "../global/function";

export const createDistributor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const distributor: DistributorType = req.body;
    const newDistributor = new Distributor(distributor);
    await newDistributor.save();
    res.status(201).json({
      success: true,
      message: "Distributor added successfully",
      data: newDistributor,
    })
  } catch (error) {
    next(error)
  }
}

export const getDistributors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const distributors = await Distributor.find({}).select("numberCard name surname cin phone createdAt");
    res.status(200).json({
      success: true,
      data: distributors,
    })
  } catch (error) {
    next(error)
  }
}

export const getDistributor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const distributor = await Distributor.findById(id)
      .populate("upline", "numberCard name surname phone cin")
      .populate("sponsor", "numberCard name surname phone cin");
    if (distributor) {
      res.status(200).json({
        success: true,
        data: distributor,
      })
    }
  } catch (error) {
    next(error)
  }
}

export const updateDistributor = async (
  req: Request,
  res: Response,
  next: NextFunction
)=> {
  const { id } = req.params;
  const newData: DistributorType = req.body;

  if (!newData.numberCard || !newData.name || !newData.gender) {
    throw createError("All field are required", 400)
  }

  try{
    await Distributor.findByIdAndUpdate(id, {
      numberCard: newData.numberCard,
      name: newData.name,
      surname: newData.surname,
      gender: newData.gender,
      phone: newData.phone,
      cin: newData.cin,
      address: newData.address,
      postalCode: newData.postalCode,
      upline: newData.upline,
      sponsor: newData.sponsor,
    })

    const newDistributor = await Distributor.findById(id);

    res.status(201).json({
      success: true,
      message: "Distributor updated successfully",
      data: newDistributor,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteDistributor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    await Distributor.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Distributor removed",
    })
  } catch (error) {
    next(error)
  }
}