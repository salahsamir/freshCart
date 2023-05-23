import React, { useContext, useEffect, useState } from 'react'
import style from './FeatureProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { cartContext } from './src/Context/CartContext.js';
import { toast } from 'react-hot-toast';
import { BaseUrl } from './src/assets/Api/BaseUrl.jsx';
export default function FeatureProducts() {
  let [products,setProducts]=useState([])
  let [list,setlist]=useState(18)
  let {addCart,setnum,addWishlist ,setnumWishlist}=useContext(cartContext)
  async function AddCart(id){
    let {data}=await addCart(id)
    if(data?.status=='success'){
      setnum(data.numOfCartItems)
      toast.success(data.message,{duration:1000,style:{color:'#0aad0a',borderRadius: '10px',
      background: '#330'},icon: '👏'})
    }else{
      toast.error('error',{duration:1000})
    }
  
  }
  let getProducts=async()=>{
  let {data}=await axios.get(`${BaseUrl}/products?page=2`)
  // console.log(data)
  setProducts(data.data)
  // console.log(products);
  }
 async function wishlist(id){
  let{data}=await addWishlist(id)
  
  if(data){
    setnumWishlist(data.data.length)
    toast.success(data.message,{duration:1000,style:{color:'#0aad0a',borderRadius: '10px',
    background: '#330'},icon: '👏'})
  }
 }
  useEffect(()=>{
getProducts()
AOS.init();
  },[])
  products=products.slice(0,list)
  let click=()=>{
    setlist(list+20)
    products=products.slice(0,list)
  }

  return (
   <>
   {products.length?
   <div className="row g-2 my-2">
   {products.map((product)=> 
     <div key={product._id} className="col-md-2 product position-relative">
<button onClick={()=>wishlist(product._id)} className='btn weshlist position-absolute  '><i class="fa-solid fa-heart "></i></button>
  
  <Link to={`/productDetails/${product._id}`}>
  <div className=" cursor-pointer px-2 py-4 text-center ">
    <img className='w-100' src={product.imageCover} alt="" />
    <span className='text-main font-sm fw-bold'>{product.title}</span>
    <h6 className='fw-bolder'>{product.title.split(" ").slice(0,2).join(' ')}</h6>
    <div className="d-flex justify-content-between">
      <span className='text-muted'>{product.price} EGP</span>
      <div>
        <i className='fas fa-star rating-color'></i>
        <span>{product.ratingsAverage}</span>
      </div>

    </div>
   
    
   </div>
  </Link>
  <button onClick={()=>AddCart(product._id)} className='btn bg-main w-100 text-white'> + ADD </button>

   

  </div>)}
  {products.length===40?"":<div className='d-flex justify-content-center'>
<button onClick={click} className='border border-1  btn btn-success my-5  py-2 rounded-2'>load more</button>
  </div>}
  
   </div>
  :
  <div class="spinner">
  <div class="cube1"></div>
  <div class="cube2"></div>
  </div>

   }
   
   
   
   </>
  )
}

