import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { cartContext } from '../../Context/CartContext.js'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Cart() {
  let{getCart,remove,updateCount,setnum}=useContext(cartContext)
  let [cart,setcart]=useState([])
  let [number,setnumber]=useState(0)
  let [price,setprice]=useState(0)
  let[id,setid]=useState()

  async function getdata(){
    let {data}=await getCart()
    // console.log(data);
    if(data){
      setnumber(data.numOfCartItems)
      setcart(data.data.products)
      setprice(data.data.totalCartPrice)
      // console.log(data.data._id);
      setid(data.data._id)

    }else{
      toast.success("cart is empty",{duration:1000,style:{color:'#0aad0a',borderRadius: '10px',
      background: '#330'}})
    }
  }
  async function deleteItem(id){
    let {data}=await remove(id)
    toast.success("process done successfully",{duration:1000,style:{color:'#0aad0a',borderRadius: '10px',
      background: '#330'}})
    if(data){
      setnum(data.numOfCartItems)
      setnumber(data.numOfCartItems)
      setcart(data.data.products)
      setprice(data.data.totalCartPrice)
    }
   
  }
  async function updateItem(id,count){
    let {data}=await updateCount(id,count)
    toast.success("process done successfully",{duration:1000,style:{color:'#0aad0a',borderRadius: '10px',
      background: '#330'}})
    if(data){
      setnumber(data.numOfCartItems)
      setcart(data.data.products)
      setprice(data.data.totalCartPrice)
    }
   
  }
  useEffect(()=>{getdata()},[])
  return (
 <>
   <Helmet>
                <title>Cart</title>
            </Helmet>
{cart? <div className="p-5 bg-main-light">
 <div className='d-flex justify-content-around mb-3'>
 <h1 className='fw-bold'>Shop Cart </h1>
 
 <h1 className='' >Cart Items: <span className='fw-bolder fs-1 text-danger mx-2'>{number}</span></h1>
 <h1>total price: <span className='fw-bolder fs-1 text-danger mx-2'>{price}</span></h1>
 </div>

  {cart.map((ele)=>
   <div className="row g-2 my-2 border border-bottom ">
    <div className="col-md-1">
      <img src={ele.product.imageCover} className='w-100' alt="" />
    </div>
    <div className="col-md-11">
     <div className='d-flex justify-content-between m-2 p-1'>
     <div>
        <h4 className='text-main fs-3'>{ele.product.title}</h4>
        <h5 className=''>Brand: {ele.product.brand.name}</h5>
        <h6 className='text-danger fs-5 '>price:{ele.price}</h6>
        <button className='btn ' onClick={()=>deleteItem(ele.product._id)}><p className='fs-6 '><i class="fa-solid fa-trash text-main"></i> Remove</p></button>
      </div>
      <div className='text-center'>
        <button onClick={()=>updateItem(ele.product._id,ele.count+1)} className='btn btn-success'>+</button>
        <h2 className='my-3'> {ele.count}</h2>
        <button onClick={()=>updateItem(ele.product._id,ele.count-1)} className='btn btn-success'>-</button>

      </div>
     </div>

    </div>
   </div>
  )}
  <button className='btn bg-main '>
    <Link to={`/checkout/${id}`}>
    <span className='text-white'>Checkout</span>
    </Link>
  </button>
 


 </div>: 
 
 
  <div class="spinner">
  <div class="cube1"></div>
  <div class="cube2"></div>
  
 </div>
 }
 
 
 </>
  )
}

