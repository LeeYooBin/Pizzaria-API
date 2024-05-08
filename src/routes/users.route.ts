import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", UserController.registerUser);
router.post("/auth", UserController.authentication);
router.post("/cart/add/:id", authMiddleware, UserController.addToCart);
router.post("/order/create/:id", authMiddleware, UserController.createOrder);
router.get("/order/:id", authMiddleware, UserController.getOrders);
router.put("/update/:id", authMiddleware, UserController.updateUser);
router.delete("/delete/:id", authMiddleware, UserController.deleteUser);
router.delete("/cart/remove/:id", authMiddleware, UserController.removeFromCart);

export default router;