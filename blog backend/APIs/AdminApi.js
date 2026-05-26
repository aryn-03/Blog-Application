import exp from 'express'
import { UserTypeModel } from '../models/UserModel.js';
import { verifyToken } from '../middleware/verifyToken.js';
export const adminRoute = exp.Router()


// read all articles
// Block user
adminRoute.put("/block", async (req, res, next) => {
    try {
        // Get the email 
        const { email } = req.body;

        // Find the user and set isActive to false
        const blockedUser = await UserTypeModel.findOneAndUpdate(
            { email: email },
            { isActive: false },
            { new: true } // returns the updated document
        );

        if (!blockedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User has been blocked successfully",
            payload: blockedUser
        });
    } catch (err) {
        next(err); 
    }
})

///Unblock user