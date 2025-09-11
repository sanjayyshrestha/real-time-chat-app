import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const protectRoute=async(req,res,next)=>{
  try {
    const token=req.cookies.token;
    if(!token) return res.status(404).json({message:"No token found"})

      const decoded=jwt.verify(token,process.env.JWT_SECRET)
      const userId=decoded.userId;
      const user=await User.findById(userId).select('-password');
      if(!user) return res.status(404).json({message:"User not found"});
      req.user=user;
    next()
  } catch (error) {
     console.log('Error in protect route : ',error)
    res.status(500).json({message:"Internal server error"})
  }
}