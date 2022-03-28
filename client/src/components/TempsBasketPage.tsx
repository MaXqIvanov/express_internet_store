
import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeCheck } from '../Redux/prodSlice';

export const TempsBasketPage = (props:any) => {
  const dispatch = useDispatch()
  const changePrice = (price:number)=>{
    dispatch(changeCheck(-price))
  }
  const removeItemStorage = (name:string)=>{
    localStorage.removeItem(name)
  }
  return (
    <div className='temp_div_basketPage'>
        <div style={{backgroundImage: `url(${props.props.url})`}} className='temp_div_img_basketPage' ></div>
        <div className='name_div_basketPage'>{props.props.name}</div>
        <div className='price_div_basketPage'>{props.props.price} ₽</div>
        <div className='description_div_basketPage'>{props.props.description}</div>
        {props.props.ordered ? <div className='order_confirm'>Ваш заказ оформлен</div> : <div className='order_confirm'>ждёт оформления...</div>}
        
        <Button variant="outline-light" className='btn_delete_basket btn '
        onClick={()=>{
          changePrice(Number(props.props.price))
          removeItemStorage(props.props.name)
          props.serR(Object.keys(localStorage).filter((elem:any)=> elem!= "auth"))
        }}
        >✘</Button>
    </div>
  )
}
