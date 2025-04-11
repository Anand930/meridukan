import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// function to generate access and the refreshToken
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
    return res.status(500).json({message:"unable to generate Acess and the refreshtoken", error})
  }
};

const SignInUser = async (req, res) => {
  try {
    // Destructure data from the request body
    const { fullname, username, email, password } = req.body;

    const { profileImage } = req.file;


    //check for missing profileImage
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Please upload the profileImage" });
    }

    // Check for missing fields
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
  

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      fullname,
      username,
      email,
      password,
      profileImage: req.file?.path,
    });

    // Save the user to the database
    var user = await newUser.save();
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();


    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(201)
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
      .json({
        message: "User created successfully",
        user: createdUser,
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
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ message: "please enter email and password" });
    }

    // getting the user registered with email or username
    let user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }], // mongodb query to find user with given email or username
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // ✅ Important!
    }

if (user) {
      const result = await bcryptjs.compare(password, user.password); // comparing the password with its hash

      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
      );

      if (!result) {
        return res.status(400).json({ message: "Please enter valid password" });
      }
      return res
        .status(201)
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge:604800 })
        .json({ message: "user logged in successfully", user });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "some issue occur while try to login the user" });
  }
};

// const refreshAccessToken = async (req, res) => {
//   const incomingRefreshToken =
//     (await req.cookie.refreshToken) || (await req.body.refreshToken);
//   if (!incomingRefreshToken) {
//     return res.status(401).json({ message: "Unauthorized request" });
//   }

//   try {
//     const decodeToken = jwt.verify(
//       incomingRefreshToken,
//       process.env.REFRESH_TOKEN_SECRET
//     );

//     const user = await User.findById(decodeToken?._id);

//     if (!user) {
//       return res.status(401).json({ message: "Invalid refreshToken" });
//     }
//     if (incomingRefreshToken !== user?.refreshToken) {
//       return res.status(404).json({ message: "token is expired" });
//     }
//     const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
//       user._id
//     );
//     user.refreshToken = refreshToken;
//     await user.save();
//     return res
//       .status(200)
//       .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
//       .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
//       .json({ message: "token is refreshed", user });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Something went wrong while refreshing the accessToken",
//     });
//   }
// };

const logOutUser = (req, res) => {
  try {
    res.clearCookie("accessToken", { httpOnly: true, secure: true });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.status(200).json({ message: "LogOut successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const renewToken = async (req, res) => {
  try {
    const refreshToken = req?.cookies?.refreshToken;
    console.log("refreshToken ", refreshToken);
    

    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "refresh token not found in the cookie" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "refreshToken is invalid or expired" });
      }

      const userFromDatabase = await User.findOne({ name: user.name });
      console.log(userFromDatabase);
      
      if (userFromDatabase) {
        var newAccessToken = userFromDatabase.generateAccessToken();
        console.log("newAcessToken", newAccessToken);
      }

      return res.status(200).json({
        message: "new accessToken is created",
        accessToken: newAccessToken,
      });
    });
  } catch (error) {
    console.log("Something went wrong while renewing the token ", error);
  }
};

export { SignInUser, LoginUser, logOutUser, renewToken };
