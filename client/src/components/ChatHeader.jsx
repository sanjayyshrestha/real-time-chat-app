import React from 'react'
import { ArrowLeft, X } from 'lucide-react'
import { useChatStore } from '../store/useChatStore'

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore()

  if (!selectedUser) {
    return (
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
          <span className="text-sm font-medium">Select a conversation to start messaging</span>
        </div>
      </div>
    )
  }

  return (
    <div className="h-16  bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Left Section - User Info */}
      <div className="flex items-center gap-4">
        {/* Back button for mobile */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
              src={selectedUser.profilePic || '/user.webp'}
              alt={selectedUser.name}
              onError={(e) => {
                e.target.src = '/user.webp'
              }}
            />
          </div>
          
          <div className="min-w-0 flex flex-col">
            <h2 className="font-semibold text-gray-900 truncate">
              {selectedUser.name}
            </h2>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Active now
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Close Button */}
      <button 
        onClick={() => setSelectedUser(null)}
        className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <X className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  )
}

export default ChatHeader