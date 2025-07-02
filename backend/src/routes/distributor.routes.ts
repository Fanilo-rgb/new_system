import { Router } from 'express';
import {
  createDistributor,
  deleteDistributor,
  getDistributor,
  updateDistributor
} from "../controllers/distributor.controller";

const distributorRouter = Router();

distributorRouter.get("/", getDistributor)

distributorRouter.post("/", createDistributor)

distributorRouter.put("/:id", updateDistributor)

distributorRouter.delete("/:id", deleteDistributor)

export default distributorRouter;
