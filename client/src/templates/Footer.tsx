 
 import React from 'react'
import { useNavigate } from 'react-router-dom'
 
 export const Footer = () => {
    const history = useNavigate()
   return (
     <div onClick={()=>{history('/confidentiality')

     }} className='Footer_div'><p>политика конфиденциальности</p></div>
   )
 }
 