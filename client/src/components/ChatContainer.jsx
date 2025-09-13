import React, { useEffect, useRef } from 'react'
import { Calendar, CheckCheck, Clock } from 'lucide-react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'

const ChatContainer = () => {
  const { selectedUser, messages, getMessages } = useChatStore()
  const { authUser } = useAuthStore()
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser?._id, getMessages])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (timestamp) => {
    const messageDate = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return messageDate.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }

  const shouldShowDateSeparator = (currentMessage, previousMessage) => {
    if (!previousMessage) return true
    
    const currentDate = new Date(currentMessage.createdAt).toDateString()
    const previousDate = new Date(previousMessage.createdAt).toDateString()
    
    return currentDate !== previousDate
  }

  const isFirstMessage = messages.length === 0

  return (
    <div className="flex flex-col h-full bg-white">
      <ChatHeader />
      
      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {/* Chat Start Indicator */}
        {isFirstMessage && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-2">
              <Calendar className="w-4 h-4" />
              Chat started
            </div>
            <p className="text-gray-500 text-sm">
              This is the beginning of your conversation with {selectedUser?.name}
            </p>
          </div>
        )}

        {/* Messages */}
        {messages.map((message, index) => {
          const isMyMessage = message.senderId === authUser?._id
          const previousMessage = messages[index - 1]
          const showDateSeparator = shouldShowDateSeparator(message, previousMessage)

          return (
            <div key={message._id}>
              {/* Date Separator */}
              {showDateSeparator && (
                <div className="flex items-center justify-center my-6">
                  <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">
                    <Calendar className="w-3 h-3" />
                    {formatDate(message.createdAt)}
                  </div>
                </div>
              )}

              {/* Message */}
              <div className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${isMyMessage ? 'order-2' : 'order-1'}`}>
                  {/* Message Bubble */}
                  <div className={`relative px-4 py-2 rounded-2xl ${
                    isMyMessage 
                      ? 'bg-blue-600 text-white rounded-br-md' 
                      : 'bg-gray-100 text-gray-900 rounded-bl-md'
                  }`}>
                    {/* Text */}
                    {message.text && (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                    )}
                    
                    {/* Image */}
                    {message.image && (
                      <div className={message.text ? 'mt-2' : ''}>
                        <img 
                          src={message.image} 
                          alt="Shared image"
                          className="max-w-full h-auto rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Message Info */}
                  <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${
                    isMyMessage ? 'justify-end' : 'justify-start'
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(message.createdAt)}</span>
                    {isMyMessage && (
                      <CheckCheck className="w-3 h-3 text-blue-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Auto scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer