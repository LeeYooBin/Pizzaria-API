const Customer = require("../models/customer.model");

const readCustomer = (customerId) => {
  return Customer.findById(customerId);
};

const readAllCustomers = () => {
  return Customer.find();
};

const createCustomer = (customer) => {
  return Customer.create(customer);
}

const updateCustomer = (customerId, updatedCustomer) => {
  return Customer.findByIdAndUpdate(customerId, updatedCustomer, { returnDocument: "after" });
};

const deleteCustomer = (customerId) => {
  return Customer.findByIdAndDelete(customerId);
};

const addOrder = (customerId, orderID) => {
  return Customer.findByIdAndUpdate(customerId, { $push: { orders: orderID, createdAt: new Date() } }, { returnDocument: "after" });
}

module.exports = {
  readCustomer,
  readAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  addOrder
};