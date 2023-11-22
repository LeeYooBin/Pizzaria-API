const Order = require('../models/order.model');

const createOrder = (order) => {
  return Order.create(order);
};

const readOrder = (orderId) => {
  return Order.findById(orderId).populate('customer', 'name email');
};

const readAllOrders = () => {
  return Order.find().populate('customer', 'name email');
};

const updateOrderStatus = (orderId, newStatus) => {
  return Order.findByIdAndUpdate(orderId, { $set: { status: newStatus } }, { returnDocument: "after" });
};

module.exports = {
  createOrder,
  readOrder,
  readAllOrders,
  updateOrderStatus,
};