import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../assets/Api.js/BaseUrl.jsx";

export let cartContext=createContext()

export function CartContextProvider(props){
    let [num,setnum]= useState(0)
    let [numWishlist,setnumWishlist]= useState(0)
    async function getdata(){
        let {data}=await getCart()
        if(data?.status=='sucess'){
            setnum(data.numOfCartItems)
            
        }
       
    }
    async function getWish(){
        let {data}=await getWish()
        if(data?.status=='sucess'){
            setnumWishlist(data.data.length)
            
        }
       
    }
    useEffect(()=>{
        getdata()
        getWish()
    },[])
    let headers={token:localStorage.getItem('token')}
    let addCart=(productId)=>{
     return axios.post(`${BaseUrl}/cart`,{
            productId
        },{
            headers:headers
        }).then((res)=>res).catch((err)=>err)
    }

    let getCart=()=>{
        return axios.get(`${BaseUrl}/cart`,{
               headers:headers
           }).then((res)=>res).catch((err)=>err)
       }
       let remove=(productId)=>{
        return axios.delete(`${BaseUrl}/cart/${productId}`,{
               headers:headers
           }).then((res)=>res).catch((err)=>err)
       }
       let updateCount=(productId,count)=>{
        return axios.put(`${BaseUrl}/cart/${productId}`,{count},{
               headers:headers
           }).then((res)=>res).catch((err)=>err)
       }
       let onlinePay=(cartId,shippingAddress)=>{
        return axios.post(`${BaseUrl}/orders/checkout-session/${cartId}/?url=http://localhost:3000`,{shippingAddress},{
               headers:headers
           }).then((res)=>res).catch((err)=>err)
       }
       let addWishlist=(productId)=>{
        return axios.post(`${BaseUrl}/wishlist`,{
               productId
           },{
               headers:headers
           }).then((res)=>res).catch((err)=>err)
       }
       let getWishlist=()=>{
        return axios.get(`${BaseUrl}/wishlist`,{
               headers:headers
           }).then((res)=>res).catch((err)=>err)
       }
    return <cartContext.Provider value={{addCart,getCart,remove,updateCount,onlinePay,num,setnum,addWishlist,numWishlist,setnumWishlist}}>
        {props.children}
    </cartContext.Provider>
}