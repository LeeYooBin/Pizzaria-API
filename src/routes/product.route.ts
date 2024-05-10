import { Router } from "express";
import ProductController from "../controllers/product.controller";

const router = Router();

router.get("/", ProductController.getProducts);
router.get("/:productID", ProductController.getProducts);
router.post("/register", ProductController.postProduct);
router.post("/register/group", ProductController.postProducts);
router.post("/update/:productID", ProductController.updateProduct);
router.post("/delete/:productID", ProductController.deleteProduct);

export default router;