import express from 'express'
import { SignInUser, LoginUser, refreshAccessToken, logOutUser } from "../controllers/user.controller.js";
import { upload } from '../utils/cloudinary.js';
const router = express.Router()


router.post('/signin',upload.single('profileImage'), SignInUser)
router.post('/login',LoginUser)
router.post('/refreshToken',refreshAccessToken)
router.post('/logout',logOutUser)

export default router
