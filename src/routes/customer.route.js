const express = require("express");
const controller = require("../controllers/customer.controller");
const router = express.Router();

router.get("/findAll", controller.findAllCustomers);
router.get("/find/:id", controller.findCustomerById);

router.post("/create", controller.createCustomer);

router.put("/update/:id", controller.updateCustomerById);

router.delete("/delete/:id", controller.deleteCustomerById);

module.exports = router;