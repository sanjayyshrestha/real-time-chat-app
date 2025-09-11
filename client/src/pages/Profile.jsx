import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const Profile = () => {
  const {authUser}=useAuthStore()
  return (
    <div>
      {console.log(authUser)}
      {authUser?.name}
      {authUser?.email}
    </div>
  )
}

export default Profile