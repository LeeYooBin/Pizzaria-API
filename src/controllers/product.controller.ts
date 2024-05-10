import { Request, Response } from "express";
import ProductService from "../services/product.service";

export default class ProductController {
  static getProducts = async (_: any, res: Response): Promise<Response> => {
    try {
      const products = await ProductService.getProducts();
      return res.status(200).json(products);
    }
    catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal server error." });
    }
  };

  static getProductByID = async (req: Request, res: Response): Promise<Response> => {
    const productID = req.params.productID;
    
    try {
      const product = await ProductService.getProductById(productID);

      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      return res.status(200).json(product);
    }
    catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal server error." });
    }
  };

  static postProduct = async (req: Request, res: Response): Promise<Response> => {
    const { data } = req.body;

    try {
      if (!data) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      const product = await ProductService.postProduct(data);

      return res.status(201).json({ message: "Product successfully created", product });
    }
    catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal server error." });
    }
  };

  static postProducts = async (req: Request, res: Response): Promise<Response> => {
    const { data } = req.body;

    try {
      if (!data) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      const products = await ProductService.postProducts(data);

      return res.status(201).json({ message: "Product successfully created", products });
    }
    catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal server error." });
    }
  };

  static updateProduct = async (req: Request, res: Response): Promise<Response> => {
    const productID = req.params.productID;
    const { data } = req.body;

    try {
      if (!data) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      const updatedProduct = await ProductService.putProduct(productID, data);

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    const productID = req.params.productID;

    try {
      const deletedProduct = await ProductService.deleteProduct(productID);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}