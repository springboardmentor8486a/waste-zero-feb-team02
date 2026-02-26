import mongoose from "mongoose";
import Opportunity from "../models/Opportunity.js";
import AppError from "../utils/AppError.js";

const VALID_STATUSES = ["open", "closed", "in-progress"];
const UPDATE_FIELDS = [
  "title",
  "description",
  "required_skills",
  "duration",
  "location",
  "status",
];

const normalizeSkills = (skills) => {
  if (Array.isArray(skills)) {
    return skills
      .map((skill) => (typeof skill === "string" ? skill.trim() : ""))
      .filter(Boolean);
  }

  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return null;
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createOpportunity = async (req, res, next) => {
  try {
    const { title, description, required_skills, duration, location, status } =
      req.body;

    if (!title || !description || !required_skills || !duration || !location) {
      return next(
        new AppError(
          "title, description, required_skills, duration, and location are required",
          400,
        ),
      );
    }

    const normalizedSkills = normalizeSkills(required_skills);
    if (!normalizedSkills || normalizedSkills.length === 0) {
      return next(
        new AppError("required_skills must be a non-empty array", 400),
      );
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return next(
        new AppError("status must be one of open, closed, or in-progress", 400),
      );
    }

    const opportunity = await Opportunity.create({
      title,
      description,
      required_skills: normalizedSkills,
      duration,
      location,
      status,
      ngo_id: req.user.id,
    });

    const createdOpportunity = await Opportunity.findById(opportunity._id).populate(
      "ngo_id",
      "name location",
    );

    return res.status(201).json(createdOpportunity);
  } catch (error) {
    return next(error);
  }
};

export const getAllOpportunities = async (req, res, next) => {
  try {
    const { location, skills, status } = req.query;
    const query = {};

    if (location) {
      query.location = { $regex: new RegExp(location, "i") };
    }

    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return next(
          new AppError("status must be one of open, closed, or in-progress", 400),
        );
      }
      query.status = status;
    }

    if (skills) {
      const normalizedSkills = normalizeSkills(skills);
      if (!normalizedSkills || normalizedSkills.length === 0) {
        return next(
          new AppError("skills filter must contain at least one skill", 400),
        );
      }
      query.required_skills = { $in: normalizedSkills };
    }

    const opportunities = await Opportunity.find(query)
      .populate("ngo_id", "name location")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: opportunities.length,
      opportunities,
    });
  } catch (error) {
    return next(error);
  }
};

export const getOpportunityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return next(new AppError("Invalid ID", 400));
    }

    const opportunity = await Opportunity.findById(id).populate(
      "ngo_id",
      "name location",
    );
    if (!opportunity) {
      return next(new AppError("Opportunity not found", 404));
    }

    return res.status(200).json(opportunity);
  } catch (error) {
    return next(error);
  }
};

export const updateOpportunity = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return next(new AppError("Invalid ID", 400));
    }

    if ("ngo_id" in req.body) {
      return next(new AppError("ngo_id cannot be modified", 400));
    }

    const updateKeys = Object.keys(req.body);
    if (updateKeys.length === 0) {
      return next(new AppError("At least one field is required to update", 400));
    }

    const invalidFields = updateKeys.filter((field) => !UPDATE_FIELDS.includes(field));
    if (invalidFields.length > 0) {
      return next(
        new AppError(`Invalid update fields: ${invalidFields.join(", ")}`, 400),
      );
    }

    if (req.body.status && !VALID_STATUSES.includes(req.body.status)) {
      return next(
        new AppError("status must be one of open, closed, or in-progress", 400),
      );
    }

    if ("required_skills" in req.body) {
      const normalizedSkills = normalizeSkills(req.body.required_skills);
      if (!normalizedSkills || normalizedSkills.length === 0) {
        return next(
          new AppError("required_skills must be a non-empty array", 400),
        );
      }
      req.body.required_skills = normalizedSkills;
    }

    const opportunity = await Opportunity.findById(id);
    if (!opportunity) {
      return next(new AppError("Opportunity not found", 404));
    }

    if (opportunity.ngo_id.toString() !== req.user.id) {
      return next(new AppError("Forbidden: You can only modify your own opportunities", 403));
    }

    updateKeys.forEach((key) => {
      opportunity[key] = req.body[key];
    });

    await opportunity.save();
    await opportunity.populate("ngo_id", "name location");

    return res.status(200).json(opportunity);
  } catch (error) {
    return next(error);
  }
};

export const deleteOpportunity = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return next(new AppError("Invalid ID", 400));
    }

    const opportunity = await Opportunity.findById(id);
    if (!opportunity) {
      return next(new AppError("Opportunity not found", 404));
    }

    if (opportunity.ngo_id.toString() !== req.user.id) {
      return next(new AppError("Forbidden: You can only delete your own opportunities", 403));
    }

    await opportunity.deleteOne();

    return res.status(200).json({ message: "Opportunity deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
