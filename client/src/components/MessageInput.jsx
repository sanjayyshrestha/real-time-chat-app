import React, { useEffect, useRef, useState } from "react";

import { Image, Send, X } from "lucide-react";

import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);


  const { sendMessage } = useChatStore();



  const removeImage = () => {
    setImage(null)

    if(fileInputRef.current) fileInputRef.current.value=""
  };

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if(!text.trim() && !image) return;
    
    try {
      const formData=new FormData();
      if(text) formData.append('text',text)
      if(image) formData.append('image',image)
      await sendMessage(formData)

      //clear the form
      setText("")
      setImage(null)
      if(fileInputRef.current) fileInputRef.current.value=""
    } catch (error) {
      console.log('Failed to send message ',error)
     
    }
  };
  return (
    <div className="p-4 w-full">
      {image && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="size-20 object-cover rounded-lg border border-zinc-700"
            />

            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 items-center">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Message"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={(e)=>setImage(e.target.files[0])}
          />

          <button
            type="button"
            className={`flex btn btn-circle ${
              image ? "text-emerald-500" : "text-zince-400"
            }`}
            onClick={()=>fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>

        <button type="submit" className="btn btn-sm btn-circle" disabled={!text.trim()&&!image}>
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
