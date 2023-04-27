import React from 'react'
import style from './Home.module.css'
import FeatureProducts from '../FeatureProducts/FeatureProducts.jsx'
import CategorySlider from '../CategorySlider/CategorySlider.jsx'
import MainSlider from '../MainSlider/MainSlider.jsx'
import {Helmet} from "react-helmet";
export default function Home() {
  return (
    <>
    <Helmet>
                <title>Home</title>
            </Helmet>
    <MainSlider/>
    <CategorySlider/>
    <FeatureProducts/>
    
    
    </>
  )
}

