import { Document } from "mongoose";
import { Order } from "./order.interface";
import { Item } from "./product.interface";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  cart: Item[];
  orders: Order[];
  createdAt: Date;
}