import express from 'express'
import { login, logout, signup } from '../controllers/user.controller'

const userRouter=express.Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.post('/logout',logout)
userRouter.put('/update-profile',)
userRouter.get('/check-auth',)

export default userRouter