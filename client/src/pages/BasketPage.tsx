
import React, { useEffect, useState } from 'react'
import { TempsBasketPage } from '../components/TempsBasketPage';
import { OrderPage } from './OrderPage';

export const BasketPage = () => {
  const [r, serR] = useState(Object.keys(localStorage).filter((elem:any)=> elem!= "auth"))
  const [orderlabel, setOrderLabel] = useState(false)
 
  
  return (
    <div className='main_div_basketPage'>
        {r.map((elem:any, index:any)=> 
        <div key={index}>
          <TempsBasketPage serR={serR} props={JSON.parse(String((localStorage.getItem(elem))))} />
          
        </div>)}
        <div onClick={()=>setOrderLabel(!orderlabel)} className='Order_btn'>Оформить заказ</div>
        {orderlabel && <OrderPage orderlabel={orderlabel} setOrderLabel={setOrderLabel}/>}
       
    </div>
  )
}
