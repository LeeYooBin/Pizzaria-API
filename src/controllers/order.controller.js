const mongoose = require('mongoose');
const orderService = require('../services/order.service');
const customerService = require('../services/customer.service');

const createOrder = async (req, res) => {
  try {
    const { customerId, products } = req.body;

    const customer = await customerService.readCustomer(customerId);
    if (!customer) return res.status(404).send({ message: 'Cliente não encontrado.' });

    if (!products || products.length === 0) return res.status(400).send({ message: 'O pedido deve conter pelo menos um produto.' });
    
    for (const product of products) {
      if (!product.pizza || !product.pizza.flavor || !product.pizza.size) {
        return res.status(400).send({ message: 'Cada pizza deve ter pelo menos um sabor e um tamanho.' });
      }

      if (product.pizza.size < 1 || product.pizza.size > 3) {
        return res.status(400).send({ message: 'Cada pizza deve possui entre 1 e 3 sabores.' });
      }
    }

    const order = await orderService.createOrder({ customer: customerId, products });

    customerService.addOrder(customerId, order._id);

    return res.status(201).send(order);
  } 
  catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Erro ao criar pedido.' });
  }
};

const readOrder = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const order = await orderService.readOrder(id);

    if (!order) return res.status(404).send({ message: 'Pedido não encontrado.' });

    return res.status(200).send(order);
  } 
  catch (e) {
    if (e.kind === 'ObjectId') return res.status(400).send({ message: 'O ID informado está incorreto.' });
    console.error(e);
    return res.status(500).send({ message: 'Erro ao recuperar pedido.' });
  }
};

const readAllOrders = async (_, res) => {
  try {
    const orders = await orderService.readAllOrders();
    return res.status(200).send(orders);
  } 
  catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Erro ao recuperar pedidos.' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const { newStatus } = req.body;

    if (!['pendente', 'em andamento', 'concluído'].includes(newStatus)) return res.status(400).send({ message: 'Status inválido.' });
    
    const updatedOrder = await orderService.updateOrderStatus(id, newStatus);

    if (!updatedOrder) return res.status(404).send({ message: 'Pedido não encontrado.' });

    return res.status(200).send(updatedOrder);
  } 
  catch (e) {
    if (e.kind === 'ObjectId') return res.status(400).send({ message: 'O ID informado está incorreto.' });
    console.error(e);
    return res.status(500).send({ message: 'Erro ao atualizar status do pedido.' });
  }
};

module.exports = {
  createOrder,
  readOrder,
  readAllOrders,
  updateOrderStatus,
};