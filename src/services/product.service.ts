import { Product } from "../interfaces/product.interface";
import ProductModel from "../models/product.model";

export default class ProductService {
  static getProducts = async (): Promise<Product[] | null> => {
    return await ProductModel.find();
  }

  static getProductById = async (productID: string): Promise<Product | null> => {
    return await ProductModel.findById(productID);
  }

  static postProduct = async (product: Partial<Product>): Promise<Product | null> => {
    const newProduct = new ProductModel(product);
    return await newProduct.save();
  }

  static postProducts = async (products: Product[]): Promise<Product[] | null> => {
    return await ProductModel.insertMany(products);
  }

  static putProduct = async (
    productID: string, 
    newData: Partial<Product>
  ): Promise<Product | null> => {
    return await ProductModel.findByIdAndUpdate(productID, newData, { new: true });
  }

  static deleteProduct = async (productID: string): Promise<Product | null> => {
    return await ProductModel.findByIdAndDelete(productID);
  } 
}