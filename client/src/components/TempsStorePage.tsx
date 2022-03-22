
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeCheck } from '../Redux/prodSlice';

export const TempsStorePage = (props:any) => {
  const dispatch = useDispatch()

  const checker = (props:any)=>{
    localStorage.setItem(props.elem.name, JSON.stringify(props.elem))
  }
  // console.log("this is just props + " + props.elem.id);
  const [checks, setChecks] = useState<any | null>(0)
  const [nullInfo, setNullInfo] = useState(true)
  useEffect(() => {
    setChecks(((localStorage.getItem(props.elem.name) != null ) ? JSON.parse(String(localStorage.getItem(props.elem.name))) : ""))
  }, [nullInfo])

 
 const changePrice = (price:number)=>{
   dispatch(changeCheck(price))
 }
   
   
  return (
    <div className='tempStorePage_div'>
      <div className='block_1_store_page'><div className='img_all_storePage' style={{backgroundImage: `url(${props.elem.url})`}} ></div></div>
      {Number(props.elem.id) != Number(checks.id) ?  <Button onClick={()=>{checker(props)
    setChecks(0)  
    setNullInfo(!nullInfo)
    changePrice(Number(props.elem.price))
    }
    } className='Button_StorePage'>+</Button> 
      : <Button className='Button_StorePage btn-success'>✓</Button>}
     
      <div className='div_for_price_storePage'>{props.elem.price} ₽</div>
    </div>
  )
}
