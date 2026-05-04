import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";
import ApiError from "../utils/ApiError.js";

export const registerUser = async (data) => {
  const { name, email, password, address } = data;

  if (!name || !email || !password || !address) {
    throw new ApiError(400, "All fields are required");
  }

  const existing = await User.findOne({ email });

  if (existing) {
    throw new ApiError(409, "User already exists");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    address,
  });

  const token = generateToken(user);

  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return { user: userData, token };
};

export const loginUser = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Account is deactivated");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user);

  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return { user: userData, token };
};
