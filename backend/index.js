import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dbConnect from "./db/index.js";
import userRoute from "./routers/user.route.js";
import customerRoute from "./routers/customer.route.js";
import productRoute from "./routers/product.route.js";
import cookieParser from "cookie-parser";
import path from "path";


dotenv.config();

const app = express();


app.use(
  cors({
    origin: "https://meri-dukan2.netlify.app", // Replace with your frontend's URL
    credentials: true,
  })
);

app.options("*", cors({
  origin: "https://meri-dukan2.netlify.app", 
  credentials: true,
}));


// routing middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/customer", customerRoute);


dbConnect();

const PORT = process.env.PORT || 4000

app.listen( PORT, () => {
  console.log(`App is running at ${process.env.PORT}`);
});
