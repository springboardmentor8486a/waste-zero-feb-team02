import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['volunteer', 'NGO'], required: true },
    skills: [String],
    location: String,
    bio: String,
    emailVerified: { type: Boolean, default: false },
    verificationToken: String,
    createdAt: { type: Date, default: Date.now },

    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
export default User;

