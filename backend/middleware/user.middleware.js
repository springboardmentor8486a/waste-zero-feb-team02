import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new AppError("Access token is missing", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch {
    return next(new AppError("Invalid access token", 401));
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError(
          "Forbidden: You don't have permission to access this resource",
          403,
        ),
      );
    }

    return next();
  };
};
