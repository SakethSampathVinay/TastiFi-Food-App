import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    category : {type: String, required: true},  
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;


/*
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema); This line checks if a model named food already exists in mongoose.models. If it does, it reuses that model.
If the model does not exist, it creates a new one using mongoose.model("food", foodSchema).
This approach prevents redefining the model if the code is executed multiple times, which is useful in server environments that may reload the code.
*/