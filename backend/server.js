import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"; // Database connection utility
import foodRouter from "./routes/foodRoute.js"; // Food-related routes
import userRouter from "./routes/userRoute.js"; // User-related routes
import cartRouter from "./routes/cardRoute.js"; // Cart-related routes
import orderRouter from "./routes/orderRoute.js"; // Order-related routes
import chatbotRouter from './routes/chatbotRoute.js'; // Chatbot-related routes

import EventEmitter from 'events';

const app = express();
const port = 4000;

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all routes

// Database connection
connectDB(); // Connect to the database

const myEmitter = new EventEmitter();
myEmitter.setMaxListeners(20); // Set a higher limit

// API endpoints
app.use("/api/food", foodRouter); // Food API routes
app.use("/images", express.static("uploads")); // Serve static images
app.use("/api/user", userRouter); // User API routes
app.use("/api/cart", cartRouter); // Cart API routes
app.use("/api/order", orderRouter); // Order API routes
app.use('/api/chatbot', chatbotRouter); 

// Health check route
app.get("/", (request, response) => {
  response.send("API Working"); 
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// mongodb+srv://sakethsampath2006:7093023759@cluster0.2j1tb.mongodb.net/?
