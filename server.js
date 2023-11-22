const express = require('express');
require("dotenv").config();
const cors = require("cors");
const bodyParser = require('body-parser');
const connection = require("./src/database/database");
const customerRouter = require("./src/routes/customer.route");
const flavorRouter = require("./src/routes/flavor.route");
const orderRouter = require("./src/routes/order.route");
const docsRouter = require("./src/routes/doc.route");

const app = express();
connection();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(
  {
    origin: ["localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  }
));
app.use("/customer", customerRouter);
app.use("/flavor", flavorRouter);
app.use("/order", orderRouter);
app.use("/docs", docsRouter);

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});