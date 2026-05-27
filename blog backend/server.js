import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { userRoute } from "./APIs/UserApi.js";
import cookieParser from "cookie-parser";
import { adminRoute } from "./APIs/AdminApi.js";
import { authorRoute } from "./APIs/AuthorApi.js";
import { commonRouter } from "./APIs/CommonApi.js";

config(); //process.env

// Support multiple allowed origins (comma-separated in env)
const ALLOWED_ORIGINS = (process.env.FRONTEND_URL || "https://blog-application-liart-chi.vercel.app")
  .split(",")
  .map((o) => o.trim());

const PORT = process.env.PORT || 4000;

//Create express application
const app = exp();

//add CORS middleware for frontend communication
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).send();
  next();
});

//add body parser middleware
app.use(exp.json());
//add cookie parser middleware
app.use(cookieParser());

//connect APIs
app.use("/user-api", userRoute);
app.use("/author-api", authorRoute);
app.use("/admin-api", adminRoute);
app.use("/common-api", commonRouter);

//dealing with invalid path
app.use((req, res, next) => {
  res.status(404).json({ message: req.url + " is an invalid path" });
});

//error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

//connect to db and start server
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("DB connection success");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error("Error in DB connection:", err);
    process.exit(1);
  }
};

connectDB();
