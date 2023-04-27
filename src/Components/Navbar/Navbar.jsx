import React, { useContext, useEffect } from 'react'
import style from './Navbar.module.css'
import logo from "../../assets/images/freshcart-logo.svg"
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext.js'
export default function Navbar({user,logout}) {
  let{num,numWishlist}=useContext(cartContext)
  useEffect(()=>{
    numWishlist=0
  },[])
  return (
   <>
   <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light ">
      <div className="container">
      <Link className="navbar-brand " to="/">
        <img src={logo} alt="" />
      </Link>
      <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        {user!==null?
          <ul className="navbar-nav m-auto mt-2 pt-2 mt-lg-0">
          <li className="nav-item">
            <Link className="nav-link  fs-6 mx-2 fw-bolder" to="/" aria-current="page">Home <span className="visually-hidden">(current)</span></Link>
          </li>
       
          <li className="nav-item">
            <Link className="nav-link fs-6 mx-2 fw-bolder" to="Category">Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fs-6 mx-2 fw-bolder" to="brands">Brands</Link>
          </li>
          <li className="nav-item position-relative">
            <Link className="nav-link fs-6 mx-2 fw-bolder" to="cart"><i class="fa-solid fa-cart-shopping fs-5 px-1"></i> <span className='badge text-white bg-main position-absolute top-0'>{num}</span></Link>
          </li>
          <li className="nav-item position-relative ">
            <Link className="nav-link fs-6 mx-2 fw-bolder" ><i class="fa-solid fa-heart fs-5 px-1"></i> <span className='badge text-white bg-main position-absolute top-0'>{numWishlist}</span></Link>
          </li>
        </ul>
        :null
        }
       

       <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
       <li className="nav-item d-flex align-items-center">
       
          <i className= ' fab mx-2 fa-facebook fs-4'></i>
          <i className= 'fab fs-4 mx-2 fa-twitter'></i>
          <i className= 'fab fs-4 mx-2 fa-instagram'></i>
          <i className= 'fab fs-4 mx-2 fa-tiktok'></i>
          <i className= 'fab fs-4 mx-2 fa-youtube'></i>
          <i className= 'fab fs-4 mx-2 fa-linkedin'></i>
         
         </li>
     {user===null?
    <>
     <li className="nav-item">
           <Link className="nav-link" to="login"><button className='btn btn-outline-success fw-bold'> signin </button></Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link" to="register"><button className='btn btn-outline-success fw-bold'>signup</button></Link>
         </li>
    
    </> 
    :

    <li className="nav-item">
       <Link className="nav-link" to="login" onClick={logout}><button className='btn btn-outline-success fw-bold ms-3'>logout</button></Link>
       </li>
    }
       
       
       
      
      
        
       
       
     
       
       </ul>
   
        
      
      </div>
     </div>
   </nav>
   
   
   
   
   </>
  )
}

