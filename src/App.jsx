import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout/Layout.jsx';
import {  Navigate, RouterProvider, createBrowserRouter, createHashRouter} from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Category from './Components/Category/Category.jsx';
import Login from './Components/Login/Login.jsx';
import Notfound from './Components/Notfound/Notfound.jsx';
import Register from './Components/Register/Register.jsx';

import Cart from './Components/Cart/Cart.jsx';
import Brands from './Components/Brands/Brands.jsx';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProductDetails from './Components/ProductDetails/ProductDetails';

import Collection from './Components/Category/Collection.jsx';
import Brand from './Components/Brands/Brand.jsx';
import {  CartContextProvider } from './Context/CartContext.js';
import toast, { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout.jsx';

import { Offline, Online } from "react-detect-offline";
function App() {
  let[user,setuser]=useState(null)
  useEffect(()=>{
    if(localStorage.getItem('token')!==null){
      getuser()
    }
  },[])





  let getuser=()=>{
    let encoded_data=localStorage.getItem('token')
    let decoded_data=jwtDecode(encoded_data)
    setuser(decoded_data)
  }
  function ProtectRoute(props){
    if(localStorage.getItem('token')==null){
      return <Navigate to={'/login'}/>
    }else{
      return props.children
    }
  } 

  let router=createHashRouter([
    {path:"",element:<Layout user={user} setuser={setuser}/>,children:[
      {path:"login",element:<Login getuser={getuser}/>},
      {index:true,element:<ProtectRoute> <Home/> </ProtectRoute> },
      {path:"register",element:<Register/>},
      {path:"brands",element:<ProtectRoute><Brands/></ProtectRoute>},
      {path:"cart",element:<ProtectRoute><Cart/></ProtectRoute>},
     
      {path:"checkout/:id",element:<ProtectRoute><Checkout/></ProtectRoute>},
      {path:"allorders",element:<ProtectRoute><Home/></ProtectRoute>},


      {path:"productDetails/:id",element:<ProtectRoute><ProductDetails/></ProtectRoute>},
      {path:"collection/:id",element:<ProtectRoute><Collection/></ProtectRoute>},
      {path:"brand/:id",element:<ProtectRoute><Brand/></ProtectRoute>},

      {path:"*",element:<Notfound/>},
      {path:"Category",element:<ProtectRoute><Category/></ProtectRoute>},
  
    ]}
  ])
  return (

     <CartContextProvider>   <Toaster    reverseOrder={false}/> 
     
     <Offline><div className='offline  rounded-3 text-center'>Ooops you are Offline</div></Offline>
    
     <RouterProvider router={router}></RouterProvider>
     </CartContextProvider>

   
 
  );
}

export default App;
