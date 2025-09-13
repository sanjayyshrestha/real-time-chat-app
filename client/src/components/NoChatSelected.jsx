import React from 'react'
import { MessageCircle } from 'lucide-react'

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-white h-full">
      <div className="text-center">
        <MessageCircle  className="h-16 w-16 text-gray-300 mx-auto mb-4 animate-bounce" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No chat selected</h3>
        <p className="text-sm text-gray-500">Choose a conversation to start messaging</p>
      </div>
    </div>
  )
}

export default NoChatSelected