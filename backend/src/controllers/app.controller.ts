import { Response, NextFunction, Request } from "express";

export const getHelloWorld = (
  req: Request,
  res: Response,
  next: NextFunction) => {
  res.status(200).json({ success: true, message: "Hello World" });
}