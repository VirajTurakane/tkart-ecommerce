import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT;


connectDB(process.env.MONGODB_URL);

app.listen(PORT, () => console.log("Server runningg on port :", PORT));
