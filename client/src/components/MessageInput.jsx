import React, { useState } from 'react'
import { Image, Send, X } from 'lucide-react'
import { useChatStore } from '../store/useChatStore'

const MessageInput = () => {
  const { selectedUser, sendMessage } = useChatStore()
  const [text, setText] = useState("")
  const [image, setImage] = useState(null)

  async function handleSendMessage(e) {
    e.preventDefault()
    if (!text.trim() && !image) return
    
    const formData = new FormData()
    if (text.trim()) formData.append('text', text.trim())
    if (image) formData.append('image', image)
    
    setText("")
    setImage(null)
    await sendMessage(formData)
  }

  const isDisabled = !text.trim() && !image

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      {/* Image Preview */}
      {image && (
        <div className="mb-3">
          <div className="inline-block relative">
            <img 
              src={URL.createObjectURL(image)} 
              alt="Preview" 
              className="w-20 h-20 rounded-lg object-cover border border-gray-200"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-end gap-3">
        {/* Text Input */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              rows="1"
              className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
              style={{ minHeight: '48px', maxHeight: '120px' }}
              onInput={(e) => {
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Image Upload */}
          <label
            htmlFor="imageInput"
            className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center cursor-pointer transition-colors group"
          >
            <Image className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
          </label>
          <input
            type="file"
            id="imageInput"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            hidden
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all font-medium ${
              isDisabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageInput