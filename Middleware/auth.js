const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        
        const token = req.header('Authorization').split(' ')[1];
        console.log('Extracted Token:', token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "You must be logged in to create a post. Please log in first."
            });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_KEY);
            console.log('Payload:', payload);
            req.user = payload;
            console.log("check userr",req.user);
            next();
        } catch (error) {
            console.error('Token Verification Error:', error);
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        });
    }
};
