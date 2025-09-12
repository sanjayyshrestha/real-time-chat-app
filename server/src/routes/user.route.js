import express from 'express'
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/user.controller.js'
import { protectRoute } from '../middlewares/protect-route.js'
import upload from '../middlewares/multer.js'

const userRouter=express.Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.post('/logout',logout)
userRouter.put('/update-profile',protectRoute,upload.single('image'),updateProfile)
userRouter.get('/check-auth',protectRoute,checkAuth)

export default userRouter