
import React, { useEffect, useState } from 'react'
import { TempsBasketPage } from '../components/TempsBasketPage';

export const BasketPage = () => {
  const [r, serR] = useState(Object.keys(localStorage))
  
 
  return (
    <div className='main_div_basketPage'>
        {r.map((elem:any, index:any)=> 
        <div key={index}>
          <TempsBasketPage serR={serR} props={JSON.parse(String((localStorage.getItem(elem))))} />
          
        </div>)}
    </div>
  )
}
