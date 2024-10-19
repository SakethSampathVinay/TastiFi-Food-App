import express from "express"
import { addToCart, removeFromCart, getCart } from "../controllers/cardController.js"
import authMiddleaware from "../middleaware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleaware, addToCart);
cartRouter.post("/remove",authMiddleaware, removeFromCart);
cartRouter.post("/getCart",authMiddleaware, getCart);

export default cartRouter;