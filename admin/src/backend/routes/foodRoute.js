import express from "express"
import { addFood, listFood, removeFood} from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router(); // This line creates a new Express router using express.Router(). This router will handle all routes related to food items.

// Image Storage Engine 

const storage = multer.diskStorage({
    destination:"uploads", // destination: Specifies the directory where the uploaded files will be saved. In this case, it is "uploads".
    filename: (request, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`) // 
    }
})

const upload  = multer({storage: storage}) // This upload middleware will be used to handle file uploads in the routes.

foodRouter.post("/add", upload.single("image"), addFood) // This route is used to add a new food item, 
// upload.single("image"): This middleware processes a single file upload with the field name image. The file is then accessible in the request.file object within the addFood controller.
foodRouter.get("/list", listFood) // This route is used to list all food items.
foodRouter.post("/remove", removeFood) // This route is used to remove a food item.

export default foodRouter