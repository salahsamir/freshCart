import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'

import { Outlet, useNavigate } from 'react-router-dom';

export default function Layout({user,setuser}) {
  let nav=useNavigate()
  let logout=()=>{
    localStorage.removeItem('token')
    setuser(null)
    nav('/login')

    
    
  }
  return (
   <>
   <Navbar user={user} logout={logout}/>
   <div className="layer my-5">
   <div className="container my-5">
   <Outlet/>
   </div>
   </div>
 
   
   </>
  )
}

