import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendResponse } from "../utils/response.js";

/**
 * Register a new user with validation and encrypted password.
 *
 * @param {object} req - Express request object. Expects body to contain:
 *   @param {string} req.body.name - The user's name (required, min 2 characters).
 *   @param {string} req.body.email - The user's email (required, must be valid and unique).
 *   @param {string} req.body.password - The user's password (required, min 6 characters).
 *   @param {string} [req.body.role] - The user's role (optional, one of "admin", , "customer"; defaults to "customer").
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 *
 * @returns {object} 201 with user info (excluding password) on success,
 *                   400/409 on validation errors,
 *                   500 on server error.
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Field validations
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return sendResponse(res, 400, { error: "Name is required and must be at least 2 characters." });
    }
    if (!email || typeof email !== "string" || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return sendResponse(res, 400, { error: "A valid email is required." });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return sendResponse(res, 400, { error: "Password is required and must be at least 6 characters." });
    }
    const allowedRoles = ["admin","customer"];
    if (role && !allowedRoles.includes(role)) {
      return sendResponse(res, 400, { error: "Invalid role specified." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 409, { error: "Email already registered." });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || "customer",
    });

    await user.save();

    // Respond with user info (excluding password)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    return sendResponse(res, 201, { message: "User registered successfully", user: userResponse });
  } catch (error) {
    return sendResponse(res, 500, { error: "Server error", details: error.message });
  }
};

export default register;