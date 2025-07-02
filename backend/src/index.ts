import "dotenv/config";
import express from 'express';
import cors from 'cors';
import {NODE_ENV, PORT} from "./constants/env";
import connectToDatabase from "./config/db";
import errorMiddleware from "./middlewares/error.middleware";
import distributorRouter from "./routes/distributor.routes";
import customerRouter from "./routes/customer.routes";
import productRouter from "./routes/product.routes";
import inventoryRouter from "./routes/inventory.routes";
import saleRouter from "./routes/sale.routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/distributors", distributorRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/inventory", inventoryRouter);
app.use("/api/v1/sales", saleRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`Server started on port: ${PORT}\nEnvironment: ${NODE_ENV}`);
    await connectToDatabase()
});