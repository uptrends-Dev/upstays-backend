import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function registerUser(req, res) {
  const {
    username,
    email,
    password,
    role,
    isActive,
    profilePicture,
    bio,
    phoneNumber,
    address,
    lastLogin,
  } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      isActive,
      profilePicture,
      bio,
      phoneNumber,
      address,
      lastLogin,
    });
    if (await User.exists({ email })) throw new Error("Email already exists");
    // const token = jwt.sign({ id: newUser._id , role: newUser.role } , process.env.JWT_SECRET);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User registration failed", error: error.message });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const loginUser = await User.findOne({ email });
    if (!loginUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, loginUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: loginUser._id, role: loginUser.role },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: ".vercel.app",
    });
    res
      .status(200)
      .json({ message: "User logged in successfully", user: loginUser, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User login failed", error: error.message });
  }
}
async function logoutUser(req, res) {
  try {
    res.clearCookie("token", {
      secure: true,
      sameSite: "lax",
      domain: ".vercel.app",
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
}

export { registerUser, loginUser, logoutUser };
