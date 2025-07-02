import { Router } from "express";
import {createCustomer, deleteCustomer, getCustomer, updateCustomer} from "../controllers/customer.controller";

const customerRouter = Router();

customerRouter.get("/", getCustomer)

customerRouter.post("/", createCustomer)

customerRouter.put("/:id", updateCustomer)

customerRouter.delete("/:id", deleteCustomer)

export default customerRouter;