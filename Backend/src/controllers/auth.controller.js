import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { tokenBlacklist } from "../models/blacklist.model.js"

const cookieOptions = {
    httpOnly: true,
    secure: true,      
    sameSite: "none",  
    maxAge: 24 * 60 * 60 * 1000
};

export const RegisterUser = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields" })
    }

    const userAlreadyExists = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (userAlreadyExists) {
        return res.status(400).json({ message: "Account already exist with email or username" })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        username,
        email,
        password: hashPassword
    })

    const token = jwt.sign({
        id: user._id, username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token, cookieOptions)

    res.status(201).json({
        message: "User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

export const loginUser = async(req,res) => {
    const { email , password} = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({message:"Invalid email or password"})
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid password"})
    }
   
    const token = jwt.sign({
        id: user._id, username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        message: "User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

export const logoutUser = async(req,res) => {
    const token = req.cookies.token

    if(token){
        await tokenBlacklist.create({token})
    }
    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
});

    res.status(200).json({message:"User logged out successfully"})
}

export const profileController = async(req,res) => {
    const user = await User.findById(req.user.id)
     res.status(200).json({
        message:"User profile fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}