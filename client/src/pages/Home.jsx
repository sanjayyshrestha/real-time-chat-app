import React from 'react'
import SideBar from '../components/SideBar'
import { useChatStore } from '../store/useChatStore'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'

const Home = () => {
  const { selectedUser } = useChatStore()

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar - 30% width, scrollable */}
      <div className="w-[30%] min-w-[250px] max-w-[350px] h-full overflow-y-auto border-r border-gray-200">
        <SideBar />
      </div>

      {/* Main content - 70% width */}
      <div className="flex-1 h-full">
        {selectedUser ? (
          <ChatContainer />
        ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
  )
}

export default Home
