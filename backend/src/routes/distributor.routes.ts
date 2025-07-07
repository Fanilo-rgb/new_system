import { Router } from 'express';
import {
  createDistributor,
  deleteDistributor, getDistributor,
  getDistributors,
  updateDistributor
} from "../controllers/distributor.controller";

const distributorRouter = Router();

distributorRouter.get("/", getDistributors)

distributorRouter.get("/:id", getDistributor)

distributorRouter.post("/", createDistributor)

distributorRouter.put("/:id", updateDistributor)

distributorRouter.delete("/:id", deleteDistributor)

export default distributorRouter;
