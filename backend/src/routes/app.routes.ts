import { Router } from 'express';
import {getHelloWorld} from "../controllers/app.controller";

const appRouter = Router();

appRouter.get("/", getHelloWorld)

export default appRouter;