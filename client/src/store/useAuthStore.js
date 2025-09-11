import {create} from 'zustand'
import { api } from '../lib/api'

export const useAuthStore=create((set)=>({
  authUser:null,
  isSigningUp:false,
  isCheckingAuth:false,
  isLoggingIn:false,
  checkAuth : async ()=>{
    set({isCheckingAuth:true})
    try {

      const res=await api.get('/auth/check-auth');
      set({authUser:res.data})
       set({isCheckingAuth:false})
    } catch (error) {
      console.log('Error in signup page : ',error)
    }finally{
       set({isCheckingAuth:false})
    }
  },
  signup:async (data)=>{
    set({isSigningUp:true})
    try {
      const res=await api.post('/auth/signup',data);
  set({authUser:res.data})
  set({isSigningUp:false})
  } catch (error) {
    console.log('Error in signup page : ',error)
  }finally{
    set({isSigningUp:false})
  }
  },

  login:async (data)=>{
    set({isLoggingIn:true})
 try {
   const res=await api.post('/auth/login',data)
   set({authUser:res.data})
   set({isLoggingIn:false})
 } catch (error) {
   console.log('Error in login page : ',error)
 }finally{
   set({isLoggingIn:false})
 }
  },

  logout:async ()=>{
    try {
      await api.post('/auth/logout')
      set({authUser:null})
    } catch (error) {
       console.log('Error in logout  : ',error)
    }
  }

}))