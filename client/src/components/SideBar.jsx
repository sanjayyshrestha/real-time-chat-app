import React, { useEffect, useState } from 'react'
import { Search, Users, MoreHorizontal, UserCircle2, MessageCircle } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'

const SideBar = () => {
  const { authUser } = useAuthStore()
  const { getUsers, users, setSelectedUser, selectedUser } = useChatStore()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Messages
          </h2>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 px-3">
            <Users className="h-3 w-3" />
            {filteredUsers.length} {filteredUsers.length === 1 ? 'Contact' : 'Contacts'}
          </div>
          
          <div className="space-y-1">
            {filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <UserCircle2 className="h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm font-medium">No contacts found</p>
                <p className="text-gray-400 text-xs">Try adjusting your search</p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                    selectedUser?._id === user._id
                      ? 'bg-blue-50 border border-blue-200 shadow-sm'
                      : 'hover:bg-gray-50 active:bg-gray-100'
                  }`}
                >
                  <div className="relative">
                    <img
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                      src={user.profilePic || '/user.webp'}
                      alt={user.name}
                      onError={(e) => {
                        e.target.src = '/user.webp'
                      }}
                    />
                    {/* Online status indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium truncate ${
                        selectedUser?._id === user._id ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {user.name}
                      </h3>
                      <span className="text-xs text-gray-400">2m</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-0.5">
                      {user.lastMessage || 'No messages yet'}
                    </p>
                  </div>
                  
                  {/* Unread badge */}
                  {user.unreadCount > 0 && (
                    <div className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center">
                      {user.unreadCount > 99 ? '99+' : user.unreadCount}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default SideBar