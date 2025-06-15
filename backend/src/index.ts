import "dotenv/config";
import express from 'express';
import cors from 'cors';
import appRouter from "./routes/app.routes";
import {NODE_ENV, PORT} from "./constants/env";

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/message", appRouter)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}\nEnvironment: ${NODE_ENV}`);
});