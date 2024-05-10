import { Double } from "mongodb";
import { Document } from "mongoose";

export interface Product extends Document {
  type: string;
  name: string;
  info?: string;
  img: string;
  price: number;
}