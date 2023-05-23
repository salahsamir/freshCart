import React, { useEffect, useState } from 'react'
import style from './Category.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet';
import { BaseUrl } from '../../assets/Api.js/BaseUrl.jsx';
export default function Category() {
  let[category,setCategory]=useState(null)

  let getdata=async()=>{
  let {data}=  await axios.get(`${BaseUrl}/categories`)
  setCategory(data.data)
  }
  useEffect(()=>{
    getdata()
    AOS.init();
  },[])
  return (
  <>
    <Helmet>
                <title>Category</title>
            </Helmet>
    {category?
    <div className="layer">
<div className="row my-5 p-5 g-2">
 
  {category.map((ele)=> 
 
 
  <div className="col-md-2">
   <Link to={`/collection/${ele._id}`}>
   <div className="product position-relative" data-aos='zoom-in-up' data-aos-duration="1500">
    <img src={ele.image} className='w-100 heightCat img-thumbnail' alt="" />
    <div className='position-absolute nameCat   w-100 h-100 '>
      <div className="">
      <h3 className='text-black fw-bold'>{ele.name}</h3>
      </div>
    </div>
    </div> 
   </Link>
 </div>
 )}

</div>

    </div>
    
    
    :
    <div class="spinner">
    <div class="cube1"></div>
    <div class="cube2"></div>
    </div>
  }
  </>)
}

