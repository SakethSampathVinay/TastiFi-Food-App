import mongoose from "mongoose";
import { connect } from "mongoose"

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://sakethsampath2006:7093023759@cluster0.2j1tb.mongodb.net/food-del").then(() => console.log("DB Connected"));
} 



// Connecting to Database