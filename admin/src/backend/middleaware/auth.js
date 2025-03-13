import jwt from "jsonwebtoken";

const authMiddleware = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({
      success: false,
      message: "Not Authorized. Please log in again.",
    });
  }

  const token = authHeader.split(" ")[1]; // Extract token correctly

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.body.userId = decoded.id; // Ensure your token payload includes `id`

    next(); // Proceed to the next middleware or route
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      console.error("Invalid or malformed JWT token");
      return response.status(401).send({ error: "Invalid token" });
    } else {
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default authMiddleware; 
