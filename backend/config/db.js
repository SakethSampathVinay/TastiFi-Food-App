import mongoose from "mongoose";

export const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        console.error("❌ MONGO_URI is not set in .env file!");
        return;
    }
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ DB Connected successfully");
    } catch (error) {
        console.error("DB Connection Error:", error.message);
    }
};
