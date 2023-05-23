import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { cartContext } from '../../Context/CartContext.js';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { BaseUrl } from '../../assets/Api.js/BaseUrl.jsx';

export default function ProductDetails() {
  let[details,setDetails]=useState(null)
  let {id}=useParams()
  let {addCart,setnum}=useContext(cartContext)
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
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  let getdata=async(id)=>{
  let {data}=  await axios.get(`${BaseUrl}/products/${id}`)
  setDetails(data.data)
  }
  useEffect(()=>{
    getdata(id)
    AOS.init();
  },[])
 
  return (
   <>
      <Helmet>
                <title>Details</title>
            </Helmet>
  {details?
   <div className="row p-5">
   <div className="col-md-4 " >
   <Slider {...settings}>
        {details.images.map((img)=>
      <img src={img} className='w-100 img-thumbnail' data-aos='fade-up-right' data-aos-duration="1500"  alt="" />
     )}
    
   
    </Slider>
    
   </div>
   <div className="col-md-6 bg-white" >
  <div className='py-5 my-5 d-flex justify-content-center align-items-center w-75 m-auto' data-aos='fade-up-left' data-aos-duration="1500" >
  <div>
  <h3>{details.title}</h3>
    <p className='text-muted py-3'>{details.description}</p>
    <div className="d-flex justify-content-between my-4 ">
      <span className='text-muted'>{details.price} EGP</span>
      <div>
        <i className='fas fa-star rating-color'></i>
        <span>{details.ratingsAverage}</span>
      </div>
      

  </div>
  <button onClick={()=>AddCart(details._id)}  className='btn bg-main  text-white p-2'> + ADD </button>
  </div>

    </div>
   
  
  
   </div>
   </div>
:

<div class="spinner my-5 py-5">
<div class="cube1"></div>
<div class="cube2"></div>
</div>
  }
   
   
   
   
   </>
  )
}

