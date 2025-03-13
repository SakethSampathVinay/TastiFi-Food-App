import foodModel from "../models/foodModel.js";
import fs from "fs"; // fs: The Node.js File System module is used for file operations, such as deleting files.

// add food item
const addFood = async (request, response) => {
  let image_filename = `${request.file.filename}`;
  const food = new foodModel({
    name: request.body.name,
    description: request.body.description,
    price: request.body.price,
    category: request.body.category,
    image: image_filename,
  });

  try {
    await food.save(); // The food item is saved to the database using food.save().
    response.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
};

// all food list

const listFood = async (request, response) => {
  try {
    const foods = await foodModel.find({}); foodModel.find({}) // fetches all the food items from the database.
    response.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
};

// remove food item

const removeFood = async (request, response) => {
  try {
    // Fetch the food item by ID
    const food = await foodModel.findById(request.body.foodId);

    if (!food) {
      // If the food item does not exist, send an error response
      return response.status(404).json({ success: false, message: "Food item not found" });
    }

    // Delete the associated image file, if it exists
    if (food.image) {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) {
          console.error("Failed to delete image:", err);
        }
      });
    }

    // Delete the food item from the database
    await foodModel.findByIdAndDelete(request.body.foodId);

    // Send a success response
    response.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: "Error" });
  }
};

export {addFood, listFood, removeFood}