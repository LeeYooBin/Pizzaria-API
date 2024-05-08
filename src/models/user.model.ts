import mongoose, { Schema, Model } from "mongoose";

import { User } from "../interfaces/user.interface";

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  cart: {},
  orders: [],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel: Model<User> = mongoose.model("User", userSchema);

export default UserModel;
