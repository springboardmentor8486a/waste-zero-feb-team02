import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/email.js";




export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, skills, location, bio } = req.body;


        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Name, email, password, and role are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification token
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            skills,
            location,
            bio,
            verificationToken
        });
        await newUser.save();

        // In a real app, we would send an email here. 
        const verificationLink = `http://localhost:5173/verify-email?token=${verificationToken}`;

        try {
            await sendEmail({
                email: newUser.email,
                subject: 'Verify your WasteZero account',
                message: `Welcome to WasteZero! Please verify your email by clicking the link: ${verificationLink}`,
                html: `
                    <h1>Welcome to WasteZero</h1>
                    <p>Please click the button below to verify your email address:</p>
                    <a href="${verificationLink}" style="display:inline-block; background-color:#4f46e5; color:white; padding:12px 24px; text-decoration:none; border-radius:8px; font-weight:bold;">Verify Email</a>
                    <p>Or copy and paste this link: <br> ${verificationLink}</p>
                `
            });
            console.log(`Verification email sent to ${newUser.email}`);
        } catch (emailError) {
            console.error('Error sending verification email:', emailError);
            // We don't want to throw an error here, the user is already registered.
            // They can request resend later or we can notify them.
        }

        res.status(201).json({
            message: "User registered successfully. Please check your email for verification link.",
            verificationLink // Still return link in dev mode for testing
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ message: "Verification token is required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email, verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification token" });
        }

        user.emailVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token", error });
    }
};



// generate JWT token
export const generateAccessToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h"
    });
};

export const generateRefreshToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d"
    });
};





export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.status(200).json({ message: "Login successful", accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { name, skills, location, bio } = req.body;

        if (!name && !skills && !location && !bio) {
            return res.status(400).json({ message: "At least one field (name, skills, location, bio) is required to update" });
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (name) user.name = name;
        if (skills) user.skills = skills;
        if (location) user.location = location;
        if (bio) user.bio = bio;
        user.updatedAt = Date.now();
        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user: { id: user._id, name: user.name, email: user.email, role: user.role, skills: user.skills, location: user.location, bio: user.bio } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
