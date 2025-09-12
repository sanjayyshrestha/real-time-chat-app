import React, { useState } from 'react'
import { Cross, CrossIcon, Image, Send, X } from 'lucide-react'
import { useChatStore } from '../store/useChatStore'
const MessageInput = () => {
  const {selectedUser,sendMessage}=useChatStore();
  const [text,setText]=useState("")
  const [image,setImage]=useState(null)
  async function handleSendMessage(e){
    e.preventDefault();
    if(!text.trim() && !image) return
    const formData=new FormData();
    if(text.trim())formData.append('text',text.trim());
    if(image) formData.append('image',image)
      setText("")
    setImage(null)
    await sendMessage(formData)
  }

  return (
    <div>
      <form onSubmit={handleSendMessage}>
        <div className='flex gap-2'>

          <div>
            {
              image && (
                <div className='relative'>
                <img src={URL.createObjectURL(image)} alt=""  className='size-16'/>
                <X onClick={()=>setImage(null)} className='size-5 absolute -right-2 -top-2' />
                </div>
              )
            }
          </div>
          <input type="text" placeholder='Enter a message' value={text} onChange={(e)=>setText(e.target.value)} />
          <label htmlFor="imageInput">
            <Image  className='size-5' />
            </label>
          <input type="file" id='imageInput' onChange={(e)=>setImage(e.target.files[0])} hidden/>
          <button type='submit'>
          <Send className='size-5' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageInput