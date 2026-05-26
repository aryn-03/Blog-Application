import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { userRoute } from "./APIs/UserApi.js";
import cookieParser from "cookie-parser";
import { adminRoute } from "./APIs/AdminApi.js";
import { authorRoute } from "./APIs/AuthorApi.js";
import { commonRouter } from "./APIs/CommonApi.js";

config(); //process.env

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const PORT = process.env.PORT || 4000;

//Create express application
const app = exp();
//add CORS middleware for frontend communication
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && origin === FRONTEND_URL) {
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
app.use(cookieParser())
//connect APIs
app.use("/user-api", userRoute);
app.use("/author-api", authorRoute);
app.use("/admin-api", adminRoute);
app.use("/common-api", commonRouter)

//connect to db
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("DB connection success");

    //start http server
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (err) {
    console.log("Err in DB connection", err);
  }
};

connectDB();

//dealing with invalid path
app.use((req, res, next) => {
  res.json({ message:req.url + " is Invalid path" })
})

//error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
})