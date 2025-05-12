import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as userRoutes } from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/v1/", userRoutes);

export default app;
