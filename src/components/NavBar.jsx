import React from 'react'
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import {GrLogout} from 'react-icons/gr'
import {CgProfile} from 'react-icons/cg'

function NavBar() {
    let navigate = useNavigate();
    const {logout} = useAuth()

    const handleSubmit =  async() => {
        try{
          await logout()
          navigate('/login')    
          toast.success('Logout');
        }
        catch(e){
          toast.error(e.message)
        }
      }
      const handleProfile = () => {
        navigate('/profile')
      }
  return (
    <div>
        <div className='w-full h-12 bg-white flex items-center justify-around'>
            <h1 className='text-3xl'>LOGO</h1>
            <nav className='flex gap-3 items-center'>
               <CgProfile size={22} className="cursor-pointer" onClick={handleProfile}/>    
               <GrLogout size={20} className="cursor-pointer" onClick={handleSubmit}/>
            </nav>
        </div>
    </div>
  )
}

export default NavBar