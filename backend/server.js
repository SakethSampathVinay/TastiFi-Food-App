import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cardRoute.js";
dotenv.config();

const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

app.get("/", (request, response) => {
  response.send("API Working"); 
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
// mongodb+srv://sakethsampath2006:7093023759@cluster0.2j1tb.mongodb.net/?
