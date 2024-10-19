import { get } from "mongoose";
import userModel from "../models/userModel.js";

// add items to user cart

const addToCart = async (request, response) => {
  try {
    let userData = await userModel.findOne({ _id: request.body.userId });
    let cartData = userData.cartData || {}; // Initialize cartData to an empty object if not present
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

const removeFromCart = async (request, response) => {
  try {
    console.log("Request Received", request.body);
    let userData = await userModel.findById(request.body.userId);
    let cartData = userData.cartData || {}; // Initialize cartData to an empty object if not present
    if (cartData[request.body.itemId] && cartData[request.body.itemId] > 0) {
      cartData[request.body.itemId] -= 1;
      if (cartData[request.body.itemId] === 0) {
        delete cartData[request.body.itemId];
      }
    }
    console.log("Updating user Data", cartData);
    await userModel.findByIdAndUpdate(request.body.userId, { cartData });
    response.json({ success: true, message: "Removed from Cart" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
};

const getCart = async (request, response) => {
  try {
    const userId = request.body.userId; // Extract userId from request body
    console.log(`Retrieving cart data for user ${userId}`);

    const userData = await userModel.findById(userId);
    if (!userData) {
      console.error(`User not found with ID ${userId}`);
      return response.status(404).json({ success: false, message: "User not found." });
    }

    const cartData = userData.cartData || [];
    console.log(`Cart data for user ${userId}:`, cartData);

    response.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, message: "Error fetching cart data." });
  }
};

export { addToCart, removeFromCart, getCart };