import Router from "express";
import {getSale, getTicket, handleSale} from "../controllers/sale.controller";

const saleRouter = Router();

saleRouter.get("/", getSale);

saleRouter.post("/", handleSale);

saleRouter.get("/tickets", getTicket);

export default saleRouter;

