const jwt = require("jsonwebtoken");
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

const findCustomerByEmail = (email) => {
  return Customer.findOne({ email });
}

const findAnotherCustomerByEmail = (email, customerId) => {
  return Customer.findOne({ email, _id: { $ne: customerId } });
}

const generateToken = (customerId, secret) => {
  return jwt.sign({ customerId }, secret, { expiresIn: 86400 });
};

module.exports = {
  readCustomer,
  readAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  addOrder,
  findCustomerByEmail,
  findAnotherCustomerByEmail,
  generateToken
};