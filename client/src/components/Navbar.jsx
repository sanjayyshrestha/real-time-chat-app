import React, { useState } from "react";
import { MessageSquare, Menu, X, User, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center space-x-3 cursor-pointer select-none"
            >
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-lg shadow-sm transition-transform duration-300 hover:scale-105">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight">
                  ChatFlow
                </span>
                <span className="text-xs text-slate-400 font-medium -mt-0.5">
                  Real-time messaging
                </span>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-4">
              {authUser ? (
                <div className="relative">
                  {/* Profile Button */}
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/50 transition-all duration-200 border border-slate-700/40"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                      {authUser.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="text-slate-200 font-medium capitalize">
                      {authUser.name || "User"}
                    </span>
                    <svg
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isProfileDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-lg py-2">
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          navigate("/profile");
                        }}
                        className="flex items-center space-x-3 px-4 py-2 text-slate-200 hover:text-white hover:bg-slate-700/50 w-full text-left transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>
                      <hr className="my-1 border-slate-700/50" />
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="flex items-center space-x-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors duration-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow transition-all duration-200 transform hover:scale-105"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800/50 bg-slate-900/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-2">
              {authUser ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-lg transition-all w-full text-left"
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-lg transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="block w-full text-left px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg transition-all"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
