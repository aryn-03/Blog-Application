import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserTypeModel } from "../models/UserModel.js";
import { config } from 'dotenv'
config()


//register function
export const register = async (userObj) => {
    //create documnet
    const userDoc = new UserTypeModel(userObj);
    //validate for empty passswords
    await userDoc.validate();
    //hash and replace plain password
    userDoc.password = await bcrypt.hash(userDoc.password, 10);
    //save
    const created = await userDoc.save();
    //covert doc to object to remove password
    const newUserObj = created.toObject();
    //remove password
    delete newUserObj.password;
    //return user obj without password
    return newUserObj;
};

//authenticate function
export const authenticate = async ({ email, password }) => {
    //check user with email &  role
    const user = await UserTypeModel.findOne({ email });
    if (!user) {
        const err = new Error("Invalid email");
        err.status = 401;
        throw err;
    }

    //check is Active status
    if (user.isActive === false) {
        const err = new Error("Your account blocked")
        err.status = 403
        throw err;
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const err = new Error("Invalid password");
        err.status = 401;
        throw err;
    }

    //generate token
    const token = jwt.sign({
        userId: user._id,
        role: user.role, email: user.email
    },
        process.env.SECRET_KEY, {
        expiresIn: "1h",
    });

    const userObj = user.toObject();
    delete userObj.password;

    return { token, user: userObj };

}

