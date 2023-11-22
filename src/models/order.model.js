const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
    required: true,
  },
  products: [
    {
      pizza: {
        flavor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'flavors',
          required: true,
        },
        size: {
          type: String,
          enum: ['pequena', 'média', 'grande'],
          required: true,
        },
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  status: {
    type: String,
    enum: ['pendente', 'em andamento', 'concluído'],
    default: 'pendente',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;