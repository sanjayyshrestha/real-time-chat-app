import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { formatChatDate } from '../lib/formatDate';

const ChatContainer = () => {

  const {messages,getMessages,isMessagesLoading,selectedUser,subscribeToMessages,unsubscribeToMessage}=  useChatStore();
  const {authUser}=useAuthStore()

  const messageEndRef=useRef(null);
  
  useEffect(() => {
    
    getMessages(selectedUser._id);

    subscribeToMessages();

    return ()=> unsubscribeToMessage();
   
  }, [getMessages,selectedUser._id,subscribeToMessages,unsubscribeToMessage]);

  useEffect(()=>{
    if(messageEndRef.current && messages)
    {
      messageEndRef.current.scrollIntoView({behavior:'smooth'});
    }
  },[messages]);

   if(isMessagesLoading) return <div>Loading...</div>
  
  return (
    <div className='flex-1 flex flex-col overflow-auto'>

      <ChatHeader />
      <div className='flex overflow-auto h-[400px] [&::-webkit-scrollbar]:hidden  p-4 space-y-4 flex-col'>
        {
          messages.map((message)=>(
            <div key={message._id} className={`chat ${message.senderId===authUser._id?"chat-end":"chat-start"}`} ref={messageEndRef}>

              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  {
                    console.log('i am auth',authUser,selectedUser)
                  }
                  <img src={message.senderId===authUser._id? authUser?.profilePic || '/user.webp' : selectedUser?.profilePic || '/user.webp'} alt="Profile Pic" />
                </div>
              </div>

              <div className="chat-header mb-1">
                <time className='text-xs opacity-50 ml-1'>
                  {formatChatDate(message.createdAt)}
                 
                </time>
              </div>

              <div className="chat-bubble flex flex-col">
                {
                  message.image &&  (
                    <img src={message.image} alt="attachment" className='sm:max-w-[200px] rounded-md mb-2' />
                  )
                } {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))
        }

      </div>
     
      <MessageInput />

    </div>
  )
}

export default ChatContainer