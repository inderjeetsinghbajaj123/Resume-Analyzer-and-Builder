import express, { Router } from "express"
import { RegisterUser, loginUser, logoutUser, profileController } from "../controllers/auth.controller.js"
import { authenticateToken } from "../middleware/auth.middleware.js"


const router = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
router.post("/register", RegisterUser )

/**
 * @route POST /api/auth/login
 * @description Login user and return JWT token
 * @access Public
 */

router.post("/login", loginUser)

/**
 * @route POST /api/auth/logout
 * @description Logout user by blacklisting the token
 * @access Public
 */
router.post("/logout", logoutUser)

/**
 * @route GET /api/auth/profile
 * @description Get user profile
 * @access Private
 */
router.get("/profile", authenticateToken , profileController  )

export default router