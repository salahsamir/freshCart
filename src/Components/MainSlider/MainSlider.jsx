import React, { useEffect, useState } from 'react'
import style from './MainSlider.module.css'
import axios from 'axios'
import Slider from "react-slick";
import sliders1 from "../../assets/images/slider-image-1.jpeg"
import sliders2 from "../../assets/images/slider-image-3.jpeg"
import sliders3 from "../../assets/images/slider-image-2.jpeg"
import banner from "../../assets/images/blog-img-1.jpeg"
import banner1 from "../../assets/images/blog-img-2.jpeg"
import banner2 from "../../assets/images/slider-2.jpeg"






export default function MainSlider() {
  // let[category,setCategory]=useState(null)
 
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
 
  return (
   <>
   <div className="row my-3 py-1">
    <div className="col-md-8">
    <Slider {...settings}>
      <div>
        <img className='w-100' src={sliders1} alt="" />
        
      </div>
      <div>
        <img className='w-100' src={sliders3} alt="" />
        
      </div>
      <div>
        <img className='w-100' src={sliders2} alt="" />
        
      </div>
     
   
</Slider>
    </div>
    <div className="col-md-4">
      <div className="">
        <img src={banner} className='w-100' alt="" />
        <img src={banner1} className='w-100' alt="" />
        <img src={banner2} className='w-100' alt="" />

      </div>
    </div>
   </div>
   
   
   </>
  )
}

