import jwt from "jsonwebtoken";
import { User } from "../interfaces/user.interface";
import { Product } from "../interfaces/product.interface";
import { Order } from "../interfaces/order.interface";
import { Item } from "../interfaces/product.interface";
import UserModel from "../models/user.model";

export class UserService {
  static createUser = async (name: string, email: string, password: string): Promise<User> => {
    const newUser = new UserModel({
      name,
      email,
      password,
      cart: {},
      orders: [],
    });
    return await newUser.save();
  };

  static getUserByEmail = async (email: string): Promise<User | null> => {
    return await UserModel.findOne({ email });
  };

  static getUserByID = async (id: string): Promise<User | null> => {
    return await UserModel.findById(id);
  };

  static updateUser = async (id: string, newData: Partial<User>): Promise<User | null> => {
    return await UserModel.findByIdAndUpdate(id, newData, { new: true });
  };

  static deleteUser = async (id: string): Promise<User | null> => {
    return await UserModel.findByIdAndDelete(id);
  };

  static addToCart = async (userId: string, product: Product): Promise<void> => {
    const user = await UserModel.findById(userId);
    if (user) {
        const existingItemIndex = user.cart.findIndex((cartItem) => cartItem._id === product._id);
        if (existingItemIndex !== -1 && user.cart[existingItemIndex].quantity > 0) {
            user.cart[existingItemIndex].quantity += 1;
        } else {
            const cartItem = { ...product, quantity: 1 } as Item;
            user.cart.push(cartItem);
        }
        await user.save();
    }
  };

  static removeFromCart = async (userId: string, productId: string): Promise<void> => {
    const user = await UserModel.findById(userId);
    if (user) {
      const existingItemIndex = user.cart.findIndex((cartItem) => cartItem._id === productId);
      if (existingItemIndex !== -1 && user.cart[existingItemIndex].quantity > 0) {
        user.cart[existingItemIndex].quantity -= 1;
      }
      else user.cart = user.cart.filter((cartItem) => cartItem._id !== productId);
      
      await user.save();
    }
  };

  static clearCart = async (userId: string): Promise<void> => {
    const user = await UserModel.findById(userId);
    if (user) {
      user.cart = [];
      await user.save();
    }
  };

  static addOrderToUser = async (userId: string, order: Order): Promise<void> => {
    const user = await UserModel.findById(userId);
    if (user) {
      user.orders.push(order);
      await user.save();
    }
  };

  static getCart = async (userId: string): Promise<Item[] | null> => {
    const user = await UserModel.findById(userId);
    return user ? user.cart : null;
  };

  static generateToken = (id: string, secret: string): string => {
    return jwt.sign({ id }, secret, { expiresIn: 86400 });
  };
};

export default UserService;
