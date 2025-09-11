import express from 'express'
import { checkAuth, login, logout, signup } from '../controllers/user.controller.js'
import { protectRoute } from '../middlewares/protect-route.js'

const userRouter=express.Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.post('/logout',logout)
userRouter.put('/update-profile',protectRoute)
userRouter.get('/check-auth',protectRoute,checkAuth)

export default userRouter