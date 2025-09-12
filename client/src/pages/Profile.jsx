import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, Calendar, User } from "lucide-react";

const Profile = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState("");

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setSelectedImage(file);
    updateProfile(formData);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl max-w-md w-full overflow-hidden border border-white/20">
        
        {/* Header Section with Gradient */}
        <div className="h-24 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Profile Content */}
        <div className="px-8 pb-8 -mt-12 relative z-10">
          
          {/* Profile Picture Section */}
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white bg-gradient-to-br from-slate-100 to-slate-200">
               
                  <img
                    src={selectedImage ? URL.createObjectURL(selectedImage) : authUser.profilePic || "/user.webp"}
                    alt={authUser.name}
                    className="w-full h-full object-cover"
                  />
                
              </div>
              
              {/* Upload Overlay */}
              <label
                htmlFor="profilePicInput"
                className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center"
              >
                <div className="text-center text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <Camera className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs font-medium">Change</span>
                </div>
              </label>
              
              <input
                type="file"
                id="profilePicInput"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Update Status */}
          {isUpdatingProfile && (
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2 text-slate-600">
                <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Updating profile...</span>
              </div>
            </div>
          )}

          {/* User Information */}
          <div className="text-center space-y-4">
            
            {/* Name */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1 capitalize">
                {authUser.name}
              </h1>
              <div className="w-12 h-0.5 bg-gradient-to-r from-slate-600 to-slate-700 mx-auto rounded-full"></div>
            </div>

            {/* Details Grid */}
            <div className="space-y-4 pt-2">
              
              {/* Email */}
              <div className="flex items-center justify-center space-x-3 text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium truncate">{authUser.email}</span>
              </div>

              {/* Join Date */}
              <div className="flex items-center justify-center space-x-3 text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">
                  Joined: {new Date(authUser.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <button className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;