import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import Login from './pages/Login'

const App = () => {

  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();

  useEffect(()=>{
    checkAuth()
    
  },[checkAuth])

  if(isCheckingAuth && !authUser){
    return <div>Loading...</div>
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