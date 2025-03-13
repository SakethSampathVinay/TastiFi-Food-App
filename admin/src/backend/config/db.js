import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://sakethsampath2006:7093023759@cluster0.2j1tb.mongodb.net/food-del", {
            // Removed sslValidate
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
    }
};
