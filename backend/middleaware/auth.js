import jwt from "jsonwebtoken";

const authMiddleaware = async (request, response, next) => {
    const {token} = request.headers;
    if(!token) {
        return response.json({success: false, message: "Not Authorized Login Again"});
    }
    try {
        const token_decode = jwt.verify(token,  process.env.JWT_TOKEN);
        request.body.userId = token_decode.id;
        next();
    } catch(error) {
        console.log(error);
        response.json({success: false, message: "Error"});
    }
}

export default authMiddleaware