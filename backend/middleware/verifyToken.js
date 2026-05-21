const jwt = require("jsonwebtoken");

const secret = "secret";

const verifyToken = (req, res, next) => {

    // Get token from headers
    const token = req.headers.authorization;

    // Check token
    if (!token) {

        return res.json({
            success: false,
            message: "No token provided"
        });
    }

    try {

        // Verify token
        const decoded = jwt.verify(token, secret);

        // Save user data
        req.user = decoded;

        // Continue to next function
        next();

    } catch (error) {

        return res.json({
            success: false,
            message: "Invalid token"
        });
    }
};

module.exports = verifyToken;