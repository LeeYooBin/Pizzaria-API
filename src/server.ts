import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connection from "./database/database";
import userRouter from "./routes/users.route";
import productRouter from "./routes/product.route";

dotenv.config();
const PORT = 8080;

const app = express();
connection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use("/user", userRouter);
app.use("/products", productRouter);

app.listen(8080, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});