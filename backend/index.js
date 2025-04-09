import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dbConnect from "./db/index.js";
import userRoute from "./routers/user.route.js";
import customerRoute from "./routers/customer.route.js";
import productRoute from "./routers/product.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// routing middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/customer", customerRoute);

dbConnect();

app.listen(process.env.PORT || 4000 , () => {
  console.log(`App is running at ${process.env.PORT}`);
});
