import { Order } from "../interfaces/order.interface";
import UserModel from "../models/user.model";

export class OrderService {
  static createOrder = async (
    userId: string,
    items: Record<string, number>,
    total: number,
    paymentType: string,
    comment?: string
  ): Promise<Order | null> => {
    
    return await UserModel.findByIdAndUpdate(userId, { $push: { orders: {
      items,
      total,
      paymentType,
      ...(comment && { comment }),
      date: new Date(),
      } } 
    });
  };

  static getOrders = async (userId: string): Promise<Order[] | null> => {
    const user = await UserModel.findById(userId);
    return user ? user.orders : null;
  };

  static deleteOrders = async (userId: string): Promise<void> => {
    await UserModel.findByIdAndUpdate(userId, { $set: { orders: [] } });
  };
}

export default OrderService;