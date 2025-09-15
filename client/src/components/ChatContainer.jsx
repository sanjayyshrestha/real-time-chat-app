import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { formatChatDate } from '../lib/formatDate';

const ChatContainer = () => {

  const {messages,getMessages,typing,isMessagesLoading,selectedUser,subscribeToMessages,unsubscribeToMessage}=  useChatStore();
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
  },[messages,typing]);

   if(isMessagesLoading) return <div>Loading...</div>
  
  return (
    <div className='flex-1 flex flex-col overflow-auto'>

      <ChatHeader />
      <div className='flex overflow-auto h-[400px] [&::-webkit-scrollbar]:hidden  p-4 space-y-4 flex-col'>
        {
          messages.map((message,index)=>(
            <div key={message._id+index} className={`chat ${message.senderId===authUser._id?"chat-end":"chat-start"}`} ref={messageEndRef}>

              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
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
{typing && (
  <div className="chat chat-start" ref={messageEndRef}>
    <div className="chat-image avatar">
      <div className="size-10 rounded-full border">
        <img src={selectedUser?.profilePic || "/user.webp"} alt="typing..." />
      </div>
    </div>

    {/* Animated typing dots */}
    <div className="chat-bubble bg-base-200 flex items-center gap-1 px-3 py-1 rounded-lg">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-dot" style={{ animationDelay: "0s" }}></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-dot" style={{ animationDelay: "0.3s" }}></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-dot" style={{ animationDelay: "0.6s" }}></span>
    </div>

    {/* Inline style for keyframes */}
    <style>{`
      @keyframes dotPulse {
        0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
        40% { transform: scale(1); opacity: 1; }
      }
      .animate-dot {
        animation: dotPulse 1.6s infinite ease-in-out;
      }
    `}</style>
  </div>
)}



      </div>
     
      <MessageInput />

    </div>
  )
}

export default ChatContainer