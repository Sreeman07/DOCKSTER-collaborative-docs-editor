const jwt = require("jsonwebtoken");

const secret = "secret";

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.json({
            success: false,
            message: "No token provided"
        });
    }

    try {

        const decoded = jwt.verify(token, secret);

        req.user = decoded;

        next();

    } catch (error) {

        return res.json({
            success: false,
            message: "Invalid token"
        });
    }
};

module.exports = verifyToken;