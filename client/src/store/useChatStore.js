import { create } from "zustand";
import { api } from "../lib/api";
import { useAuthStore } from "./useAuthStore";

export const useChatStore=create((set,get)=>({
  users:[],
  selectedUser:null,
  messages:[],
  typing:false,
  getUsers:async()=>{
    try {
      const res=await api.get('/messages/users')
      set({users:res.data})
      console.log(res.data)
    } catch (error) {
      console.log("Error in getting users : ", error);
    }
  },

setSelectedUser: (user) => {
  get().unsubscribeToMessage(); // remove old socket listeners
  set({ selectedUser: user, typing: false }); // set new chat + reset typing
  get().subscribeToMessages(); // add listeners for new chat
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

  subscribeToMessages: () => {
  const { selectedUser } = get();
  if (!selectedUser) return;

  const socket = useAuthStore.getState().socket;

  try {
    // New messages
    socket.on('newMessage', (newMessage) => {
      console.log(newMessage)
      const messageFromOtherUser = selectedUser._id !== newMessage.senderId;
      if (messageFromOtherUser) return;
      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });

    // Typing events
    socket.on('typing', ({ senderId }) => {
      if (selectedUser._id === senderId) {
        set({ typing: true });
      }else{
        set({typing:false})
      }
    });

    socket.on('stopTyping', ({ senderId }) => {
      if (selectedUser._id === senderId) {
        set({ typing: false });
      }
    });
  } catch (error) {
    console.log('Error subscribing to events: ', error);
  }
},

unsubscribeToMessage: () => {
  const socket = useAuthStore.getState().socket;
  socket.off('newMessage');
  socket.off('typing');
  socket.off('stopTyping');
},


}))

