import express from 'express'
import { SignInUser, LoginUser } from "../controllers/user.controller.js";

const router = express.Router()


router.post('/signin',SignInUser)
router.post('/login',LoginUser)

export default router
