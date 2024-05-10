import mongoose, { Schema, Model } from "mongoose";

import { Product } from "../interfaces/product.interface";

const productSchema = new Schema<Product>({
  type: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  info: {
    type: String,
    required: false,
    trim: true,
  },
  img: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true
  }
});

const ProductModel: Model<Product> = mongoose.model("Product", productSchema);

export default ProductModel;
