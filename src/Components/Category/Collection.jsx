

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BaseUrl } from '../../assets/Api.js/BaseUrl.jsx';

export default function Collection() {
  let[details,setDetails]=useState(null)
  let {id}=useParams()
 console.log(id);
  let getdata=async(id)=>{
  let {data}=  await axios.get(`${BaseUrl}/products/?category=${id}`)
  setDetails(data.data)

  }
  useEffect(()=>{
    getdata(id)
    AOS.init();
  },[])
 
  return (
   <>
    
  {details?
   <div className="row p-4">
   {details.map((product)=>   <div key={product._id} className="col-md-2" data-aos='flip-up' data-aos-duration="1500">
  <Link to={`/productDetails/${product._id}`}>
  <div className="product cursor-pointer px-2 py-4 text-center">
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
   
   <button className='btn bg-main w-100 text-white'> + ADD </button>
   </div>
  
  
  </Link>
  </div>)}
  
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

