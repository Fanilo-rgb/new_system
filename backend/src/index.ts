import express from 'express';
import cors from 'cors';
import appRouter from "./routes/app.routes";

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/message", appRouter)

app.listen(8080, () => {
    console.log('Server started on port 8080 in development environment');
});