import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import Login from './pages/Login'
import { Loader2 } from 'lucide-react'

const App = () => {

  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();

  useEffect(()=>{
    checkAuth()
    
  },[checkAuth])

  if(isCheckingAuth && !authUser){
    return (
       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Loader2 className="h-8 w-8 text-slate-600 animate-spin" />
            <div className="absolute inset-0 h-8 w-8 border-2 border-slate-200 border-t-slate-400 rounded-full animate-spin" 
                 style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
          </div>
          <div className="text-slate-600 text-sm font-medium">
            Authenticating...
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className=''>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser?<Home/>:<Navigate to={'/login'} />} />
        <Route path='/signup' element={!authUser?<Signup/>:<Navigate to={'/'} />} />
        <Route path='/login' element={!authUser?<Login/>:<Navigate to={'/'}/>} />
        <Route path='/profile' element={authUser?<Profile/>:<Navigate to={'/'} />} />
      </Routes>
    </div>
  )
}

export default App