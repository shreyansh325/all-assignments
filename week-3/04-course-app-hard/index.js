const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const adminKey = "AdminSecretKey@1";
const userKey = "UserSecretKey@2";

mongoose.connect(
  "mongodb+srv://shreyansh325:B5gRCXnLbyNCe0nm@cluster0.cqiajmm.mongodb.net/course"
);

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

const Admin = new mongoose.model("Admin", adminSchema);
const User = new mongoose.model("User", userSchema);
const Course = new mongoose.model("Course", courseSchema);

async function authenticate(req, res, next, users, key) {
  const sendAuthFailed = (arg) => {
    console.log(arg);
    res.status(403).json({ message: "Authentication failed" });
  };
  let authHeader = req.headers.authorization;
  if (!authHeader) return sendAuthFailed(authHeader);
  authHeader = authHeader.split(" ");
  const token = authHeader[1];
  if (!token) return sendAuthFailed(token);
  jwt.verify(token, key, async (err, payload) => {
    if (err || !payload || !payload.username) return sendAuthFailed();
    const user = await users.findOne({ username: payload.username });
    if (!user) sendAuthFailed();
    req.user = user;
    next();
  });
}

async function authenticateAdmin(req, res, next) {
  return authenticate(req, res, next, Admin, adminKey);
}

async function authenticateUser(req, res, next) {
  return authenticate(req, res, next, User, userKey);
}

// Admin routes
app.post("/admin/signup", async (req, res) => {
  let tmpUser = new Admin(req.headers);
  const user = await Admin.findOne({ username: tmpUser.username });
  if (!user) {
    await tmpUser.save();
    const payload = { username: tmpUser.username };
    const token = jwt.sign(payload, adminKey, { expiresIn: "1h" });
    return res.json({ message: "Admin created successfully", token });
  }
  return res.status(403).json({ message: "Admin already exists" });
});

app.post("/admin/login", async (req, res) => {
  const tmpUser = new User(req.headers);
  const validUser = await Admin.findOne({
    username: tmpUser.username,
    password: tmpUser.password,
  });
  if (!validUser) return res.status(403).json({ message: "Login failure" });
  const payload = { username: validUser.username };
  const token = jwt.sign(payload, adminKey, { expiresIn: "1h" });
  res.json({ message: "Logged in successfully", token });
});

app.get("/admin/me", authenticateAdmin, (req, res) => {
  res.json({ username: req.user.username });
});

app.post("/admin/courses", authenticateAdmin, async (req, res) => {
  let tmpCourse = new Course(req.body);
  const sameCourse = await Course.findOne({ title: tmpCourse.title });
  if (!sameCourse) {
    await tmpCourse.save();
    return res.json({
      message: "Course created successfully",
      id: tmpCourse.id,
    });
  }
  return res.status(403).json({ message: "Course already exists!" });
});

app.put("/admin/courses/:courseId", authenticateAdmin, async (req, res) => {
  const id = req.params["courseId"];
  const existingCourse = await Course.findById(id);
  if (existingCourse) {
    existingCourse.overwrite(req.body);
    await existingCourse.save();
    return res.json({ message: "Course updated successfully" });
  }
  return res.status(403).json({ message: "Course updation failed" });
});

app.get("/admin/courses", authenticateAdmin, async (req, res) => {
  return res.json({ courses: await Course.find({}) });
});

app.get("/admin/courses/:courseId", authenticateAdmin, async (req, res) => {
  const id = req.params["courseId"];
  const courseFound = await Course.findById(id);
  return res.json(courseFound);
});

// User routes
app.post("/user/signup", async (req, res) => {
  let tmpUser = new User(req.headers);
  const user = await User.findOne({ username: tmpUser.username });
  if (!user) {
    await tmpUser.save();
    const payload = { username: tmpUser.username };
    const token = jwt.sign(payload, userKey, { expiresIn: "1h" });
    return res.json({ message: "User created successfully", token });
  }
  return res.status(403).json({ message: "User already exists" });
});

app.post("/user/login", async (req, res) => {
  const tmpUser = new User(req.headers);
  const validUser = await User.findOne({
    username: tmpUser.username,
    password: tmpUser.password,
  });
  if (!validUser) return res.status(403).json({ message: "Login failure" });
  const payload = { username: validUser.username };
  const token = jwt.sign(payload, userKey, { expiresIn: "1h" });
  res.json({ message: "Logged in successfully", token });
});

app.get("/user/me", authenticateUser, (req, res) => {
  res.json({ username: req.user.username });
});

app.get("/user/courses", authenticateUser, async (req, res) => {
  res.json({ courses: await Course.find({ published: true }) });
});

app.post("/user/courses/:courseId", authenticateUser, async (req, res) => {
  try {
    const id = req.params.courseId;
    const course = Course.findOne({ _id: id });
    if (!course)
      return res.status(404).json({ message: "Error/Course not found" });
    const alreadyBought = req.user.purchasedCourses.some((c) => c._id == id);
    if (!alreadyBought) {
      req.user.purchasedCourses.push(id);
      await req.user.save();
      return res.json({ message: "Course purchased successfully" });
    }
  } catch (error) {
    console.log(error);
  }
  return res.status(404).json({ message: "Failed to purchase course" });
});

app.get("/user/purchasedCourses", authenticateUser, async (req, res) => {
  return res.json({
    purchasedCourses: (await req.user.populate("purchasedCourses"))
      .purchasedCourses,
  });
});

app.get("/user/courses/:courseId", authenticateUser, async (req, res) => {
  const id = req.params["courseId"];
  const courseFound = await Course.findById(id);
  return res.json(courseFound);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
