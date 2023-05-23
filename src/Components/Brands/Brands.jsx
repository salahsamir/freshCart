
import style from './Brands.module.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BaseUrl } from '../../assets/Api.js/BaseUrl.jsx';
export default function Brands() {
  let[brand,setbrand]=useState([])
  let [num,setnum]=useState(16)

  let getdata=async()=>{
  let {data}=  await axios.get(`${BaseUrl}/brands`)
  setbrand(data.data)
  }
  useEffect(()=>{
    getdata()
    AOS.init();
  },[])
  brand=brand.slice(0,num)
  let click=()=>{
    setnum(num+20)
    brand=brand.slice(0,num)
  }
  return (
  <>
    {brand.length?
    <div className="layer">
<div className="row my-5 p-5 g-2">
 
  {brand.map((ele)=> 
 
 
  <div className="col-md-2">
    <Link to={`/brand/${ele._id}`}>
    <div className="product position-relative" data-aos='zoom-in-up' data-aos-duration="1500">
    <img src={ele.image} className='w-100 heightCat img-thumbnail' alt="" />
    
    </div> 

    </Link>
  
 </div>
 )}

</div>
{brand.length===40?"":<div className='d-flex justify-content-center'>
<button onClick={click} className='border border-1  btn btn-success my-5  py-2 rounded-2'>lead more</button>
  </div>}

    </div>
    
    
    :
    <div class="spinner">
    <div class="cube1"></div>
    <div class="cube2"></div>
    </div>
  }
  </>)
}

