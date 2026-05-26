import { Schema, model } from "mongoose"

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First required"]
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique:true
    },
    profileImageUrl: {
        type: String,

    },
    password: {
        type: String,
        required: [true, "password required"]
    },
    role: {
        type: String,
        enum: ["AUTHOR", "USER", "ADMIN"],
        required: [true, "{Value} is an Invalid role"],
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        strict: "throw",
        versionKey: false
    })

    
//
export const UserTypeModel = model("user", userSchema)