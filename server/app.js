import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as userRoutes } from "./routes/user.js";
import { router as productRoutes } from "./routes/product.js";
import { router as orderRoutes } from "./routes/order.js";
import { router as wishlistRoutes } from "./routes/wishlist.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/temp", express.static("public/temp"));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", productRoutes);
app.use("/api/v1/", orderRoutes);
app.use("/api/v1/", wishlistRoutes);

export default app;
