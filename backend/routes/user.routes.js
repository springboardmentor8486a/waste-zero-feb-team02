import {
    changeUserPassword,
    generateAccessToken,
    getUserProfile,
    loginUser,
    requestEmailVerification,
    registerUser,
    updateUserProfile,
    verifyEmail,
} from "../controllers/user.controller.js";

import { authenticateToken } from "../middleware/user.middleware.js";
import jwt from "jsonwebtoken";

import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify-email", verifyEmail);
router.post("/login", loginUser);

router.get("/me", authenticateToken, getUserProfile);
router.put("/me", authenticateToken, updateUserProfile);
router.put("/me/password", authenticateToken, changeUserPassword);
router.post("/me/verify-email", authenticateToken, requestEmailVerification);




router.post("/refresh-token", (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = {
            _id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role
        };
        const newAccessToken = generateAccessToken(user);
        res.status(200).json({ accessToken: newAccessToken });
    }
    catch (error) {
        res.status(401).json({ message: "Invalid refresh token", error });
    }
});

export default router;
