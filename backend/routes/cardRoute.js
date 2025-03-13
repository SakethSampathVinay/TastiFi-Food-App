import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cardController.js";
import authMiddleaware from "../middleaware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.post("/remove", removeFromCart);
cartRouter.post("/getCart", getCart);

export default cartRouter;
