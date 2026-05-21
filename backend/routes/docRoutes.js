const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const docModel = require("../models/docModel");



// ================= CREATE DOC =================

router.post("/create", verifyToken, async (req, res) => {

    try {

        const { docName } = req.body;

        // Get userId from token
        const userId = req.user.userId;

        const doc = await docModel.create({
            uploadedBy: userId,
            title: docName
        });

        res.json({
            success: true,
            message: "Document created",
            docId: doc._id
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });
    }
});



// ================= UPLOAD DOC =================

router.post("/upload", verifyToken, async (req, res) => {

    try {

        const { docId, content } = req.body;

        await docModel.findByIdAndUpdate(docId, {
            content,
            lastUpdate: Date.now()
        });

        res.json({
            success: true,
            message: "Document updated"
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });
    }
});



// ================= GET DOC =================

router.post("/get", verifyToken, async (req, res) => {

    try {

        const { docId } = req.body;

        const doc = await docModel.findById(docId);

        if (!doc) {

            return res.json({
                success: false,
                message: "Document not found"
            });
        }

        res.json({
            success: true,
            doc
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });
    }
});



// ================= GET ALL DOCS =================

router.post("/all", verifyToken, async (req, res) => {

    try {

        // Get userId from token
        const userId = req.user.userId;

        const docs = await docModel.find({
            uploadedBy: userId
        });

        res.json({
            success: true,
            docs
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });
    }
});



// ================= DELETE DOC =================

router.post("/delete", verifyToken, async (req, res) => {

    try {

        const { docId } = req.body;

        await docModel.findByIdAndDelete(docId);

        res.json({
            success: true,
            message: "Document deleted"
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });
    }
});



module.exports = router;