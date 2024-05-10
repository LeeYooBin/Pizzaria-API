import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { OrderService } from "../services/order.service";
import { User } from "../interfaces/user.interface";
import { Payment } from "../interfaces/order.interface";
import bcrypt from "bcrypt";
import validator from "validator";

export class UserController {
  static registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;

    try {
      const sanitizedName = validator.escape(name);
      const sanitizedEmail = validator.escape(email);
      const sanitizedPassword = validator.escape(password);

      if (!sanitizedName || !sanitizedEmail || !sanitizedPassword) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      if (!validator.isEmail(sanitizedEmail)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(sanitizedPassword)) {
        return res.status(400).json({ message: "Password must meet the specified criteria" });
      }

      const existingEmail = await UserService.getUserByEmail(sanitizedEmail);
      if (existingEmail) {
        return res.status(409).send({ message: "The email is already in use" });
      }

      const hashedPassword = await bcrypt.hash(sanitizedPassword, 10);
      const user = await UserService.createUser(sanitizedName, sanitizedEmail, hashedPassword);

      return res.status(201).json({ message: "User registered successfully.", user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error registering user." });
    }
  };

  static authentication = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
      const sanitizedEmail = validator.escape(email);
      const sanitizedPassword = validator.escape(password);

      if (!sanitizedEmail || !sanitizedPassword) {
        return res.status(400).send({ message: "All fields need to be filled in" });
      }

      if (!validator.isEmail(sanitizedEmail)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const user = await UserService.getUserByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");

      const token = UserService.generateToken(user.id, process.env.JWT_SECRET);

      return res.status(200).json({ user, token });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Error authenticating user" });
    }
  };

  static updateUser = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;

    const { name, email, password } = req.body;

    try {
      const existingUser = await UserService.getUserByID(id);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!name && !email && !password) {
        return res.status(400).json({ message: "At least one field must be provided for update." });
      }

      const newData: Partial<User> = {};
      if (name) newData.name = validator.escape(name);
      if (email) newData.email = validator.escape(email);
      if (password) {
        const sanitizedPassword = validator.escape(password);
        const hashedPassword = await bcrypt.hash(sanitizedPassword, 10);
        newData.password = hashedPassword;
      }

      if (email && !validator.isEmail(newData.email as string)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (password && !passwordPattern.test(password)) {
        return res.status(400).json({ message: "Password must meet the specified criteria" });
      }

      if (email) {
        const existingEmail = await UserService.getUserByEmail(newData.email as string);
        if (existingEmail) {
          return res.status(409).send({ message: "The email is already in use" });
        }
      }

      const updatedUser = await UserService.updateUser(id, newData);

      return res.status(200).json({ message: "User updated successfully.", updatedUser });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Error updating user" });
    }
  };

  static deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;

    try {
      const existingUser = await UserService.getUserByID(id);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      await OrderService.deleteOrders(id);
      await UserService.deleteUser(id);

      return res.status(200).json({ message: "User deleted successfully." });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Error deleting user" });
    }
  };

  static addToCart = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;
    const { product } = req.body;

    try {
      const user = await UserService.getUserByID(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await UserService.addToCart(userId, product);

      return res.status(200).json({ message: "Product added to cart successfully" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Error adding product to cart" });
    }
  };

  static removeFromCart = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;
    const { productId } = req.body;

    try {
      const user = await UserService.getUserByID(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await UserService.removeFromCart(userId, productId);

      return res.status(200).json({ message: "Product removed from cart successfully" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Error removing product from cart" });
    }
  };

  static createOrder = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;
    const { total, paymentType, comment } = req.body;

    try {
      const user = await UserService.getUserByID(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!total || !paymentType) {
        return res.status(400).json({ message: "Total and payment type are required" });
      }

      if (typeof total !== "number" || total <= 0) {
        return res.status(400).json({ message: "Total must be a positive number" });
      }

      if (!Object.values(Payment).includes(paymentType.toUpperCase())) {
        return res.status(400).json({ message: "Invalid payment type" });
      }

      const cart = await UserService.getCart(userId);

      if (!cart || cart.length === 0) {
        return res.status(400).json({ message: "Cart is empty. Cannot create order without products." });
      }

      const order = await OrderService.createOrder(
        userId,
        cart,
        total,
        paymentType.toUpperCase(),
        comment || null
      );

      if (!order) {
        return res.status(500).json({ message: "Error creating order" });
      }

      await UserService.addOrderToUser(userId, order);
      await UserService.clearCart(userId);

      return res.status(200).json({ message: "Order created successfully", order });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Error creating order" });
    }
  };

  static getOrders = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;

    try {
      const user = await UserService.getUserByID(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const orders = await OrderService.getOrders(userId);

      return res.status(200).json(orders);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Error creating order" });
    }
  };
}
