import React from 'react'
import {Navigate} from 'react-router-dom'
import { useAuth } from '../context/authContext'


function ProtectedRoute({children}) {
    const {auth} = useAuth()

    if(!auth.currentUser){
        return <Navigate  to='/login'/>    
    }

  return children
}

export default ProtectedRoute