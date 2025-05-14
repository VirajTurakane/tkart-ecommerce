import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import configureCloudinary from "./config/cloudinary.js";

dotenv.config();

const PORT = process.env.PORT;

connectDB(process.env.MONGODB_URL);
configureCloudinary(
  process.env.CLOUDINARY_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);

app.listen(PORT, () => console.log("Server runningg on port :", PORT));
