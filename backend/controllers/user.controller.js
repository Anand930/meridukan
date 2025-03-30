import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    user.accessToken = accessToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};

const SignInUser = async (req, res) => {
  try {
    // Destructure data from the request body
    const { fullname, username, email, password } = req.body;


    // Check for missing fields
    if (!fullname || !username || !email || !password ) {
      return res.status(400).json({ message: "All fields are required" });
      
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      // profileImage // Save the uploaded image URL
    });

    // Save the user to the database
    var user = await newUser.save();
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    console.log("accessToken", accessToken);
    
    user.accessToken = accessToken
    user.refreshToken = refreshToken
    await user.save();
    console.log("new user registered");
    
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(201)
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
      .json({
        message: "User created successfully",
        user:createdUser
      });
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "please enter email and password" });
    }

    // getting the user registered with email
    const user = await User.findOne({ email });
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    if (user) {
      const result = await bcryptjs.compare(password, user.password);
      if (!result) {
        return res.status(400).json({ message: "Please enter valid password" });
      }
      console.log("logged in");
      return res
        .status(201)
        .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
        .json({ message: "user logged in successfully", user });
    }
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(500)
      .json({ message: "some issue occur while try to login the user" });
  }
};

const refreshAccessToken = async (req,res) => {
  const incomingRefreshToken =
    (await req.cookie.refreshToken) || (await req.body.refreshToken);
  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Unauthorized request" });
  }

  try {
    const decodeToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodeToken?._id);

    if (!user) {
      return res.status(401).json({ message: "Invalid refreshToken" });
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(404).json({ message: "token is expired" });
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    user.refreshToken = refreshToken
    await user.save();
    return res
      .status(200)
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
      .json({ message: "token is refreshed", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong while refreshing the accessToken",
    });
  }
};

const logOutUser = (req, res) => {
  try {
    res.clearCookie("accessToken", { httpOnly: true, secure: true });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.status(200).json({ message: "LogOut successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export { SignInUser, LoginUser, refreshAccessToken, logOutUser };
