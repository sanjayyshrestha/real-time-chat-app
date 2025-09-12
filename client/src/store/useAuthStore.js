import { create } from "zustand";
import { api } from "../lib/api";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingIn: false,
  isUpdatingProfile:false,
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await api.get("/auth/check-auth");
      set({ authUser: res.data });
      console.log(res.data);
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
}));
