import exp from "express"
import { authenticate } from '../services/authService.js';
import { verifyToken } from "../middleware/verifyToken.js";

export const commonRouter = exp.Router()

const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
};

commonRouter.post("/login", async (req, res) => {
    //get user credentiwl bbj
    let userCred = req.body;
    //call auth function
    let { token, user } = await authenticate(userCred)
    //save token as http only
    res.cookie("token", token, cookieOptions);
    //send response
    res.status(200).json({ message: "login success", payload: user })

})

commonRouter.get("/logout", async (req, res) => {
    // Clear the cookie named 'token'
    res.clearCookie('token', cookieOptions);

    res.status(200).json({ message: 'Logged out successfully' });
})

commonRouter.put("/change-password", async (req, res) => {
    try {
        //get current password and new pass
        const { currentPassword, newPassword } = req.body;
        //check the current password is correct or not 
        //replace current pass with new pass
        //send res
        res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

//page refreh
commonRouter.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), (req, res) => {
    res.status(200).json({
        message: "authenticted",
        payload: req.user
    });
});