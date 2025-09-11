import User from "../models/user.model";
import { generateToken } from "../utils/generateToken";
import { validateSignupInput } from "../utils/validateInput"
import bcrypt from 'bcrypt'

const signup=async (req,res)=>{
  const {name,email,password}=req.body

  const {valid,message}=validateSignupInput({name,email,password});
  if(!valid){
    return res.status(400).json({message})
  }
  try {

    const existingUser=await User.findOne({email})
    if(existingUser){
      return res.status(400).json({message:"Email already exists"})
    }

  const hashedPassword=await bcrypt.hash(password,10);

  const user=new User({
    name,
    email,
    password:hashedPassword
  })
    await user.save();
    generateToken(user._id,res)
    res.status(201).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      profilePic:user.profilePic
    })

  } catch (error) {
    console.log('Error in signup : ',error)
    res.status(500).json({message:"Internal server error"})
  }
}

const login=async (req,res)=>{
  const {email,password}=req.body;
  if(!email || !password){
    return res.status(403).json({message:"Both fields are required"})
  }
  try {
    const user=await User.findOne({email})
    if(!user) return res.status(400).json({message:"Invalid credential"})
    
    const isMatchPassword=await bcrypt.compare(password,user.password)
    if(!isMatchPassword) return res.status(400).json({message:"Invalid credential"})
    
    generateToken(user._id,res)
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      profilePic:user.profilePic
    })
  } catch (error) {
    console.log('Error in login : ',error)
    res.status(500).json({message:"Internal server error"})
  }
}

const logout=(req,res)=>{
  try {
    res.cookie('token','',{maxAge:0})
  } catch (error) {
     console.log('Error in logout : ',error)
    res.status(500).json({message:"Internal server error"})
  }
}


export {
  signup,
  login,
  logout
}