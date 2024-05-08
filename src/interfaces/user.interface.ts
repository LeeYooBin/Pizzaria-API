import { Document } from "mongoose";
import { Order } from "./order.interface";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  cart: Record<string , number>;
  orders: Order[];
  createdAt: Date;
}