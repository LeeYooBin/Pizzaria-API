const express = require("express");
const controller = require("../controllers/customer.controller");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/findAll", controller.findAllCustomers);
router.get("/find/:id", authMiddleware, controller.findCustomerById);

router.post("/create", controller.createCustomer);
router.post("/login", controller.loginService);

router.put("/update/:id", controller.updateCustomerById);

router.delete("/delete/:id", controller.deleteCustomerById);

module.exports = router;