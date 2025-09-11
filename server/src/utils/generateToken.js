
import jwt from 'jsonwebtoken'

export const generateToken=async (userId,res)=>{
 const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'1d'})
 res.cookie('token',token,{
  maxAge:1000*60*60*24,
  httpOnly:true,
  sameSite:"strict",
  secure:process.env.NODE_ENV!='development'
 })
}