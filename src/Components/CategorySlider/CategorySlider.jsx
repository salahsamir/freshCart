import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import Slider from "react-slick";

export default function CategorySlider() {
  let[category,setCategory]=useState(null)
 
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3
  };
  let getdata=async()=>{
  let {data}=  await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
  setCategory(data.data)
 

  }
  useEffect(()=>{
    getdata()
  },[])
  return (
    <Slider {...settings}>
    {category?.map((img)=>
  <img src={img.image} className='w-100 img-thumbnail my-4 py-4 category' alt="" />
 )}


</Slider>
  )
}

