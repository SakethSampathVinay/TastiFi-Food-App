import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import validator from "validator";

// Login

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const loginUser = async (request, response) => {
  // TO DO: implement login functionality
  const {email, password} = request.body;
  try {
    const user  = await userModel.findOne({email});
    if(!user){
      return response.json({success: false, message: "User Doesn't exist"});
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return response.json({success: false, message: "Invalid Credentials"});
    }
    const token = createToken(user._id);
    console.log("Generated Token: " , token)
    response.json({success: true, token});

  } catch (error) {
    console.log(error);
    response.json({success: false, message: "Error"});
  }
};

// register user
const registerUser = async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response.json({
      success: false,
      message: "Name, email, and password are required",
    });
  }
  if (!validator.isEmail(email)) {
    return response.json({ success: false, message: "Invalid email address" });
  }
  if (password.length < 8) {
    return response.json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }
  if (!process.env.JWT_SECRET) {
    return response.json({
      success: false,
      message: "JWT_TOKEN is not set in the environment",
    });
  }

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return response.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({ name, email, password: hashedPassword });

    await user.save();

    const token = createToken(user._id);
    return response.json({ success: true, token });
  } catch {
    return response.json({ success: false, message: "Error registering user" });
  }
};

export { loginUser, registerUser };
