import { Document } from "mongoose";
import { Item } from "./product.interface";

export interface Order extends Document {
  items: Item[];
  total: number;
  paymentType: Payment;
  comment?: string;
  date: Date;
}

export enum Payment {
  "CREDIT_CARD",
  "DEBIT_CARD",
  "CASH"
}