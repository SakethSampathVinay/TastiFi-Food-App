import { get } from "mongoose";
import userModel from "../models/userModel.js";

// add items to user cart

const addToCart = async (request, response) => {
  try {
    let userData = await userModel.findOne({ _id: request.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[request.body.itemId]) {
      cartData[request.body.itemId] = 1;
    } else {
      cartData[request.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(request.body.userId, { cartData });
    response.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
};

// remove items from user cart

const removeFromCart = async (request, response) => {
  try {
    let userData = await userModel.findById(request.body.userId);
    let cartData = await userData.cartData;
    if (cartData[request.body.itemId] > 0) {
      cartData[request.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(request.body.userId, { cartData });
    response.json({ success: true, message: "Removed from Cart" });
  } catch {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
};

// fetch user cart data

const getCart = async (request, response) => {
  try{
    let userData = await userModel.findById(request.body.userId);
    let cartData = await userData.cartData;
    response.json({success: true, cartData});
  } catch (error) {
    console.log(error);
    response.json({success: false, message: "Error"});
  }
} 


export { addToCart, removeFromCart, getCart };
