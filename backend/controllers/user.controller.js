import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/email.js";

const EMAIL_VERIFICATION_CODE_TTL_MINUTES = Number(
  process.env.EMAIL_VERIFICATION_CODE_TTL_MINUTES || 10,
);
const EMAIL_VERIFICATION_CODE_REGEX = /^[0-9]{6}$/;

const generateEmailVerificationCode = () =>
  crypto.randomInt(0, 1000000).toString().padStart(6, "0");

const hashEmailVerificationCode = (code) =>
  crypto
    .createHash("sha256")
    .update(`${code}:${process.env.JWT_SECRET}`)
    .digest("hex");

const sendVerificationEmail = async (email, code) => {
  try {
    await sendEmail({
      email,
      subject: "Verify your WasteZero account",
      message: `Your WasteZero verification code is ${code}. It expires in ${EMAIL_VERIFICATION_CODE_TTL_MINUTES} minutes.`,
      html: `
        <h1>Verify your WasteZero account</h1>
        <p>Use this verification code to verify your email address:</p>
        <p style="font-size:24px; font-weight:bold; letter-spacing:4px;">${code}</p>
        <p>This code expires in ${EMAIL_VERIFICATION_CODE_TTL_MINUTES} minutes.</p>
      `,
    });
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, skills, location, bio } = req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Name, email, password, and role are required" });
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
      bio,
    });
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully. Verify your email after login.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "Verification code is required" });
    }

    if (!EMAIL_VERIFICATION_CODE_REGEX.test(String(code).trim())) {
      return res
        .status(400)
        .json({ message: "Verification code must be a 6-digit number" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.emailVerified) {
      return res.status(200).json({ message: "Email already verified." });
    }

    if (!user.emailVerificationCodeHash || !user.emailVerificationCodeExpiresAt) {
      return res.status(400).json({
        message: "No active verification code. Please request a new code.",
      });
    }

    if (new Date(user.emailVerificationCodeExpiresAt).getTime() < Date.now()) {
      user.emailVerificationCodeHash = undefined;
      user.emailVerificationCodeExpiresAt = undefined;
      user.updatedAt = Date.now();
      await user.save();
      return res
        .status(400)
        .json({ message: "Verification code expired. Please request a new code." });
    }

    const receivedCodeHash = hashEmailVerificationCode(String(code).trim());
    const storedCodeHash = String(user.emailVerificationCodeHash);

    if (storedCodeHash.length !== receivedCodeHash.length) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    const isCodeValid = crypto.timingSafeEqual(
      Buffer.from(receivedCodeHash),
      Buffer.from(storedCodeHash),
    );

    if (!isCodeValid) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    user.emailVerified = true;
    user.emailVerificationCodeHash = undefined;
    user.emailVerificationCodeExpiresAt = undefined;
    user.updatedAt = Date.now();
    await user.save();
    console.log(`Email verified for user: ${user.email}`);

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const requestEmailVerification = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: "Email already verified." });
    }

    const verificationCode = generateEmailVerificationCode();
    user.emailVerificationCodeHash = hashEmailVerificationCode(verificationCode);
    user.emailVerificationCodeExpiresAt = new Date(
      Date.now() + EMAIL_VERIFICATION_CODE_TTL_MINUTES * 60 * 1000,
    );
    user.updatedAt = Date.now();
    await user.save();

    await sendVerificationEmail(user.email, verificationCode);

    return res.status(200).json({
      message: "Verification code sent to your email.",
      expiresInMinutes: EMAIL_VERIFICATION_CODE_TTL_MINUTES,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// generate JWT token
export const generateAccessToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h",
  });
};

export const generateRefreshToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
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
    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, skills, location, bio } = req.body;

    if (!name && !skills && !location && !bio) {
      return res.status(400).json({
        message:
          "At least one field (name, skills, location, bio) is required to update",
      });
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
    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        skills: user.skills,
        location: user.location,
        bio: user.bio,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const changeUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters long",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.updatedAt = Date.now();
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
