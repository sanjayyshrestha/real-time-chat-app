import { create } from "zustand";
import { api } from "../lib/api";
import { useAuthStore } from "./useAuthStore";

export const useChatStore=create((set,get)=>({
  users:[],
  selectedUser:null,
  messages:[],
  getUsers:async()=>{
    try {
      const res=await api.get('/messages/users')
      set({users:res.data})
      console.log(res.data)
    } catch (error) {
      console.log("Error in getting users : ", error);
    }
  },

  setSelectedUser:(user)=>{
    try {
      set({selectedUser:user})
    } catch (error) {
      console.log("Error in selecting users : ", error);
    }
  },

  getMessages:async (userId)=>{
    try {
      const res=await api.get(`/messages/${userId}`);
      set({messages:res.data})
    } catch (error) {
      console.log('Error in getting messages : ',error)
    }
  },
  sendMessage:async (data)=>{
    try {
      const res=await api.post(`/messages/send/${get().selectedUser._id}`,data)
      set({messages:[...get().messages,res.data]})
    } catch (error) {
      console.log('Error in getting messages : ',error)
    }
  },

  subscribeToMessages : ()=>{
    const {selectedUser}=get()
    if(!selectedUser) return
    const socket=useAuthStore.getState().socket;
    try {
      socket.on('newMessage',(newMessage)=>{
        set((state)=>({
          messages:[...state.messages,newMessage]
        }))
      })
    } catch (error) {
      console.log('Error is subscribing message : ',error)
    }
  },
  unsubscribeToMessage : ()=>{
    const socket=useAuthStore.getState().socket;
    socket.off('newMessage')
  }
}))

