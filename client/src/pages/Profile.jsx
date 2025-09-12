import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "lucide-react";

const Profile = () => {
  const { authUser,updateProfile } = useAuthStore();
  const [selectedImage,setSelectedImage]=useState("")
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const formData=new FormData();
    formData.append('image',file)
    setSelectedImage(file)
    updateProfile(formData)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-8 flex flex-col items-center">

        {/* Profile Picture */}
        <div className="relative w-32 h-32">
          <img
            src={selectedImage?URL.createObjectURL(selectedImage) : authUser.profilePic || "user.webp"}
            alt={authUser.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow-sm"
          />

          {/* Camera icon always visible */}
          <label
            htmlFor="profilePicInput"
            className="absolute bottom-0 right-0 bg-blue-600 w-9 h-9 rounded-full flex items-center justify-center border-2 border-white cursor-pointer shadow-md"
          >
            <Camera className="w-5 h-5 text-white" />
          </label>

          <input
            type="file"
            id="profilePicInput"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="hidden"
          />
        </div>

        {/* Name */}
        <h2 className="mt-6 text-2xl font-bold text-gray-800">{authUser.name}</h2>

        {/* Email */}
        <p className="mt-1 text-gray-600">{authUser.email}</p>

        {/* Account creation date */}
        <p className="mt-2 text-gray-400 text-sm">
          Joined: {new Date(authUser.createdAt).toLocaleDateString()}
        </p>

      </div>
    </div>
  );
};

export default Profile;
