import exp from 'express'
import { authenticate, register } from '../services/authService.js';
// Corrected import name to match the export in verifyToken.js
import { verifyToken } from '../middleware/verifyToken.js'; 
import upload from '../config/multer.js'
import { uploadToCloudinary } from '../config/cloudinaryUpload.js';
import cloudinary from '../config/cloudinary.js';
import { ArticleModel } from '../models/ArticleModel.js'; 

export const userRoute = exp.Router()

//Register user
userRoute.post(
    "/users",
    upload.single("profilePic"),
    async (req, res, next) => {
        let cloudinaryResult;
        try {
            let userObj = req.body;
            if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
            }
            const newUserObj = await register({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url,
            });
            res.status(201).json({
                message: "user created",
                payload: newUserObj,
            });
        } catch (err) {
            if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
            }
            next(err); 
        }
    }
);

// Read all articles - Called verifyToken with 'USER' role
userRoute.get("/articles", verifyToken('USER'), async (req, res) => {
    try {
        let articles = await ArticleModel.find({ isArticleActive: true }).populate(
            "author",
            "firstName lastName profileImageUrl"
        );
        res.status(200).json({ message: "Articles fetched", payload: articles });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// add comments to an article - Called verifyToken with 'USER' role
userRoute.post("/comment/:articleId", verifyToken('USER'), async (req, res) => {
    try {
        const { articleId } = req.params;
        const { comment } = req.body;
        const userId = req.user.userId;

        // push comment subdocument
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            { $push: { comments: { user: userId, comment } } },
            { new: true }
        )
            .populate("comments.user", "firstName lastName profileImageUrl")
            .populate("author", "firstName lastName profileImageUrl");

        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(201).json({
            message: "Comment added successfully",
            payload: updatedArticle,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get single article with author and comments populated
userRoute.get("/article/:id", verifyToken('USER'), async (req, res) => {
    try {
        const { id } = req.params;
        const article = await ArticleModel.findById(id)
            .populate("author", "firstName lastName profileImageUrl")
            .populate("comments.user", "firstName lastName profileImageUrl");

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(200).json({ message: "Article fetched", payload: article });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});