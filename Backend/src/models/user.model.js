import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already exist"],
        required:true,
    },
    email:{
        type:String,
        unique:[true,"Account already exist with this email"],
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

export const User = mongoose.model("User",userSchema)