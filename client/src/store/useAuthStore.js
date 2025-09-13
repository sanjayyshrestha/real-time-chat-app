import { create } from "zustand";
import { api } from "../lib/api";
import {io} from 'socket.io-client'
export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingIn: false,
  isUpdatingProfile:false,
  socket:null,
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await api.get("/auth/check-auth");
      set({ authUser: res.data });
      get().connectSocket()
    } catch (error) {
      console.log("Error in signup page : ", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await api.post("/auth/signup", data);
      set({ authUser: res.data });
       get().connectSocket()
    } catch (error) {
      console.log("Error in signup page : ", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await api.post("/auth/login", data);
      set({ authUser: res.data });
      get().connectSocket()
    } catch (error) {
      console.log("Error in login page : ", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  updateProfile: async (data) => {
    set({isUpdatingProfile:true})
    try {
      const res = await api.put("/auth/update-profile", data);
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in updating profile : ", error);
    }finally{
      set({isUpdatingProfile:false})
    }
  },
  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.log("Error in logout  : ", error);
    }
  },
  connectSocket: ()=>{
    const {authUser}=get()
    const socket=io('http://localhost:5000',{
      query:{
        userId:authUser._id
      }
    })
    socket.connect()
    set({socket:socket})
  },

  disconnectSocket: ()=>{
    if(get().socket?.connected) get().socket.disconnect()
  },

}));
