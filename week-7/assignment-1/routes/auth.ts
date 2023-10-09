import express from "express";
import jwt from "jsonwebtoken";

import { authenticateJwt, SECRET } from "../middleware/";
import { User } from "../db";
import mongoose from "mongoose";
import { z } from "zod";

interface UserInterface {
  username: string;
  password: string;
  _id?: mongoose.Types.ObjectId; // automatically created when user is inserted in db
}

const UserValidator = z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(3).max(20),
}).required();

const router = express.Router();

router.post("/signup", async (req, res) => {
  const parsedData = UserValidator.safeParse(req.body);
  if(!parsedData.success)
    return res.status(411).json({message: "Invalid input data!"});
  const { username, password } = parsedData.data;

  const user = (await User.findOne({ username })) as UserInterface;
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1h" });
    res.json({ message: "User created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const parsedData = UserValidator.safeParse(req.body);
  if(!parsedData.success)
    return res.status(411).json({message: "Invalid input data!"});

  const { username, password } = parsedData.data;
  const user = (await User.findOne({ username, password })) as UserInterface;
  if (user) {
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.get("/me", authenticateJwt, async (req, res) => {
  const userId = req.headers["userId"];
  const user = (await User.findOne({ _id: userId })) as UserInterface;
  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(403).json({ message: "User not logged in" });
  }
});

export default router;
