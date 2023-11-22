const express = require('express');
const controller = require('../controllers/order.controller');
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

router.get('/find/:id', controller.readOrder);
router.get('/findAll', controller.readAllOrders);

router.post('/create', authMiddleware, controller.createOrder);

router.patch('/updateStatus/:id', controller.updateOrderStatus);

module.exports = router;