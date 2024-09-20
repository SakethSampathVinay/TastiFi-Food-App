import jwt from "jsonwebtoken";

const authMiddleaware = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  // Check if Authorization header is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({
      success: false,
      message: "Not Authorized. Please log in again.",
    });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return response.status(401).json({
      success: false,
      message: "Token is missing or invalid.",
    });
  }

  try {
    // Verify token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); // Ensure the secret matches with the one used during token creation

    // Attach user ID to request body
    request.body.userId = token_decode.id;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return response.status(401).json({
        success: false,
        message: "Token has expired. Please log in again.",
      });
    } else {
      console.log(error);
      return response.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }
  }
};

export default authMiddleaware;