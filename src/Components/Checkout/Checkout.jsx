import React, { useContext, useState } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik'
import { cartContext } from '../../Context/CartContext.js';
import { Link, useParams } from 'react-router-dom';

export default function Checkout() {
  let {id}=useParams()
  
  
  let {onlinePay}=useContext(cartContext)
 async function handleSubmit(values){
    let {data }=await onlinePay(id,values)
  //  console.log(data);
   if(data?.status=="success"){
    window.location.href=data.session.url
   }

  }
  let formik=useFormik({
    initialValues:{
      details:" ",
      city:" ",
      phone:" "
    },
    onSubmit:handleSubmit

  })
  return (
   <>
   <div className='my-5 py-5'>
   <div className='w-50 m-auto p-5 bg-white  rounded-2 shadow'>
    <form onSubmit={formik.handleSubmit} className='my-3'>
      <label htmlFor="details">Details : </label>
      <input type="text" placeholder='details' className='form-control mb-3' onChange={formik.handleChange} value={formik.values.details} name="details"  />
      <label htmlFor="city">city: </label>
      <input type="text" placeholder='city' className='form-control mb-3' onChange={formik.handleChange} value={formik.values.city} name="city" />
      <label htmlFor="phone">phone : </label>
      <input type="text" placeholder='phone' className='form-control mb-3' onChange={formik.handleChange} value={formik.values.phone} name="phone" />


 <button type='submit' className='btn btn-outline-success my-3'>pay</button>
 
    </form>
   </div>
   </div>
   
   
   
   </>
  )
}

