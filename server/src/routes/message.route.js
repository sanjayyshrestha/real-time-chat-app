import express from 'express'
import { protectRoute } from '../middlewares/protect-route';

const messageRouter=express.Router();

messageRouter.get('/users',protectRoute,getUsersForSideBar)
messageRouter.get('/:id',protectRoute,getMessages)
messageRouter.post('/send/:id',protectRoute,sendMessage)

export default messageRouter