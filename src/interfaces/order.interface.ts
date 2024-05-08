import { Document } from "mongoose";

export interface Order extends Document {
  items: Record<string, number>;
  total: number;
  paymentType: string;
  comment?: string;
  date: Date;
}