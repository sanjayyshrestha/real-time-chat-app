import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'

const ChatContainer = () => {
  const {selectedUser,messages,getMessages}=useChatStore()

  useEffect(()=>{
    getMessages(selectedUser._id)
  },[selectedUser._id,getMessages,messages])
  return (
    <div className='z-50'> 
      <ChatHeader/>
      {
        messages.map((message)=>(
          <div>{message.text}
          {message.image && <img src={message.image} className='size-16'></img>}
          </div>
        ))
      }

      <MessageInput />
    </div>
  )
}

export default ChatContainer