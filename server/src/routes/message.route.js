import express from 'express'
import { protectRoute } from '../middlewares/protect-route.js';
import { getMessages, getUsersForSideBar, sendMessage } from '../controllers/message.controller.js';
import upload from '../middlewares/multer.js';

const messageRouter=express.Router();

messageRouter.get('/users',protectRoute,getUsersForSideBar)
messageRouter.get('/:id',protectRoute,getMessages)
messageRouter.post('/send/:id',protectRoute,upload.single('image'),sendMessage)

export default messageRouter