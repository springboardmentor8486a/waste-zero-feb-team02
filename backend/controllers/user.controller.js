import User from "../models/User.js";
import bcrypt from "bcrypt";



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
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            skills,
            location,
            bio
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
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
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const generateRefreshToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
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