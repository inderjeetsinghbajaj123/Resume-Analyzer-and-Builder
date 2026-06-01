import jwt from "jsonwebtoken";
import { tokenBlacklist } from "../models/blacklist.model.js";

export const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const blacklisted = await tokenBlacklist.findOne({ token });

        if (blacklisted) {
            return res.status(401).json({ message: "Session expired" });
        }

        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};