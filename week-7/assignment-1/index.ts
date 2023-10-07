import secretDbConnStr from "./secret";
import express from "express";
import mongoose from "mongoose";
const port = 3000;
import cors from "cors";

import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect(secretDbConnStr);
