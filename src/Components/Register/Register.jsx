import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { toast } from 'react-hot-toast'
import { BaseUrl } from '../../assets/Api.js/BaseUrl.jsx'

export default function Register() {
  let[isLoading,setisLoding]=useState(false)
  let [ApiError,setApiError]=useState('')
  let nav=useNavigate()

  async function sendValues(values){
    setisLoding(true)
    let {data}=await axios.post(`${BaseUrl}/auth/signup`,values).catch(errors=>{
      setisLoding(false)
      setApiError(errors.response.data.message)
    })
    if(data.message=='success'){
      toast.success(data.message,{duration:1000,style:{color:'#0aad0a',borderRadius: '10px',
      background: '#330'},icon: '👏'})
      setisLoding(false)
      nav('/login')
    }
      
  }
  let validate=yup.object({
    name:yup.string().required("name is required").min(3,'min length =3').max(20,"max length=20"),
    email:yup.string().required("email is required").email("email not valid"),
    password:yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{0,}$/,"password not valid"),
    rePassword:yup.string().required("Repassword is required").oneOf([yup.ref('password')],'password And rePassword not match'),
    phone:yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/,"invalid phone ")
  })
  let formik=useFormik({
    initialValues:{
     name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    validationSchema:validate,
    onSubmit:sendValues

  })
  return (
    <>
      <Helmet>
                <title>Register</title>
            </Helmet>
   <div className=" p-5 ">
   <div className="w-75 m-auto p-5 shadow rounded-3 ">
    {ApiError?<div className='alert alert-info'><h5>{ApiError}</h5></div>:''}
      
      <h3>Register Now :</h3>
      <form action=""  onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name :</label>
        <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" value={formik.values.name} id='name' name='name' />
        {formik.errors.name && formik.touched.name?<div className='alert alert-info'>{formik.errors.name}</div>:null}
        
        
        <label htmlFor="Email">Email :</label>
        <input className='form-control' onChange={formik.handleChange} type="email" value={formik.values.email} id='email' name='email' />
        {formik.errors.email && formik.touched.email?<div className='alert alert-info'>{formik.errors.email}</div>:null}
       
        <label htmlFor="password">Password :</label>
        <input className='form-control' onChange={formik.handleChange} type="password" value={formik.values.password} id='password' name='password' />
        {formik.errors.password && formik.touched.password?<div className='alert alert-info'>{formik.errors.password}</div>:null}
        
        <label htmlFor="rePassword">rePassword :</label>
        <input className='form-control' onChange={formik.handleChange} type="password" value={formik.values.rePassword} id='rePassword' name='rePassword' />
        {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-info'>{formik.errors.rePassword}</div>:null}
        
        <label htmlFor="phone">Phone :</label>
        <input className='form-control' onChange={formik.handleChange} type="tel" value={formik.values.phone} id='phone' name='phone' />
        {formik.errors.phone && formik.touched.phone?<div className='alert alert-info'>{formik.errors.phone}</div>:null}
          {isLoading?        <button  type='button' className='btn bg-main text-white my-4'><i className='fas fa-spinner fa-spin'></i></button>
:
<button  type='submit' className='btn bg-main text-white my-4'>Register</button>


}

      </form>





    </div>
    
   </div>
    
    
    
    
    </>
  )
}

