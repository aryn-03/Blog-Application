import exp from 'express'
import { register } from '../services/authService.js';
import { ArticleModel } from '../models/ArticleModel.js';
import { verifyToken } from '../middleware/verifyToken.js';
import upload from '../config/multer.js'
import { uploadToCloudinary } from '../config/cloudinaryUpload.js';
import cloudinary from '../config/cloudinary.js';

export const authorRoute = exp.Router()

// 1. Register author
authorRoute.post(
    '/users',
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
                role: "AUTHOR",
                profileImageUrl: cloudinaryResult?.secure_url,
            });
            res.status(201).json({ message: "author created", payload: newUserObj });
        } catch (err) {
            if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
            }
            next(err);
        }
    }
);


// 3. Create article
// 2. Read articles of specific author
authorRoute.get('/articles/:authorId', verifyToken('AUTHOR'), async (req, res) => {
    const { authorId } = req.params;
    let articles = await ArticleModel.find({ author: authorId, isArticleActive: true }).populate(
        "author",
        "firstName lastName"
    );
    res.status(200).json({ message: "Articles fetched", payload: articles });
});

// 3. Create article
authorRoute.post('/article', verifyToken('AUTHOR'), async (req, res, next) => {
    // Get article from req
    let article = req.body;
    // Create new article 
    let newArticleDoc = new ArticleModel(article);
    // Save to DB
    let createdArticleDoc = await newArticleDoc.save();
    // Send res
    res.status(201).json({ message: "Article created", payload: createdArticleDoc });

});

// get single article for author (only their own articles)
authorRoute.get('/article/:id', verifyToken('AUTHOR'), async (req, res) => {
    try {
        const { id } = req.params;
        const article = await ArticleModel.findOne({ _id: id, author: req.user.userId })
            .populate("author", "firstName lastName")
            .populate("comments.user", "firstName lastName");

        if (!article) return res.status(404).json({ message: "Article not found" });

        res.status(200).json({ message: "Article fetched", payload: article });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Update article for the author
authorRoute.put("/article/:id", verifyToken('AUTHOR'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, content } = req.body;

        const articleOfDB = await ArticleModel.findOne({ _id: id, author: req.user.userId });
        if (!articleOfDB) {
            return res.status(401).json({ message: "Article not found or unauthorized" });
        }

        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            id,
            { $set: { title, category, content } },
            { new: true }
        );

        res.status(200).json({ message: "Article updated", payload: updatedArticle });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 6. Delete article (Soft Delete)
authorRoute.delete("/article/:id", verifyToken('AUTHOR'), async (req, res) => {
    try {
        const { id } = req.params;

        const articleOfDB = await ArticleModel.findOne({ _id: id, author: req.user.userId });
        if (!articleOfDB) {
            return res.status(401).json({ message: "Article not found or unauthorized" });
        }

        const deletedArticle = await ArticleModel.findByIdAndUpdate(
            id,
            { isArticleActive: false },
            { new: true }
        );

        res.status(200).json({ message: "Article deleted", payload: deletedArticle });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

authorRoute.put("/article/:id/restore", verifyToken('AUTHOR'), async (req, res) => {
    try {
        const { id } = req.params;

        const articleOfDB = await ArticleModel.findOne({ _id: id, author: req.user.userId });
        if (!articleOfDB) {
            return res.status(401).json({ message: "Article not found or unauthorized" });
        }

        const restoredArticle = await ArticleModel.findByIdAndUpdate(
            id,
            { isArticleActive: true },
            { new: true }
        );

        res.status(200).json({ message: "Article restored", payload: restoredArticle });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

