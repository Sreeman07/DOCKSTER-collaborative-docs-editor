const express = require("express");

const router = express.Router();

const userModel = require("../models/userModel");
const verifyToken = require("../middleware/verifyToken");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "secret";



// ================= SIGNUP =================

router.post("/signup", async (req, res) => {

    try {

        const { username, name, email, phone, password } = req.body;

        const emailCon = await userModel.findOne({ email });

        if (emailCon) {
            return res.json({
                success: false,
                message: "Email already exists"
            });
        }

        const phoneCon = await userModel.findOne({ phone });

        if (phoneCon) {
            return res.json({
                success: false,
                message: "Phone already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            username,
            name,
            email,
            phone,
            password: hash
        });

        res.json({
            success: true,
            message: "Signup successful",
            userId: user._id
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });
    }
});



// ================= LOGIN =================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "Invalid email"
            });
        }

        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            secret,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            userId: user._id
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });
    }
});



// ================= GET USER =================

router.post("/getUser", verifyToken, async (req, res) => {

    try {

        const userId = req.user.userId;

        const user = await userModel
            .findById(userId)
            .select("-password");

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });
    }
});



// ================= LOGOUT =================

router.post("/logout", verifyToken, async (req, res) => {

    res.json({
        success: true,
        message: "Logout successful"
    });
});



module.exports = router;