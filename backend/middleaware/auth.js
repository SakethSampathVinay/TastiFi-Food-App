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
        if(error instanceof jwt.TokenExpiredError) {
            return response.status(401).send({message: "Token has expired. Please obtain a new one."})
        }
        else {
            console.log(error);
            response.json({success: false, message: "Error"});
        }
    }
}

export default authMiddleaware ;