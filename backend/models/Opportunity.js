import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    required_skills: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "required_skills must contain at least one skill",
      },
    },
    duration: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["open", "closed", "in-progress"],
      default: "open",
    },
    ngo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

opportunitySchema.index({ location: 1 });
opportunitySchema.index({ status: 1 });

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

export default Opportunity;
