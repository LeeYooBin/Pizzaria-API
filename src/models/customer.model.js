const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  orders: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "order" },
      createdAt: {
        type: Date,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    required: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
});

customerSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Customer = mongoose.model('customers', customerSchema);

module.exports = Customer;