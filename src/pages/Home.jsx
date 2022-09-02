import React from 'react'
import NavBar from '../components/NavBar';
import { useAuth } from '../context/authContext';

function Home() {
  const {auth} = useAuth()
  return (
    <div>
        <NavBar/>
        <h1>Home</h1>
        <h3>Hoşgeldin - {auth.currentUser.displayName}</h3>
    </div>
  )
}

export default Home