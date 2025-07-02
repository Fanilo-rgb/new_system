import { Router } from "express";
import {getStock, getStockEntry, updateStock} from "../controllers/inventory.controller";

const inventoryRouter = Router();

inventoryRouter.get("/", getStock)

inventoryRouter.post("/", updateStock)

inventoryRouter.get("/entries", getStockEntry)

export default inventoryRouter;