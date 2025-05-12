import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

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
// app.use()
app.get("/", (req, res) => {
    res.send("This is a home page.")
})

export default app;
