
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeStateProods } from '../Redux/oneProdSlice';
import { changeCheck, changeRaiting } from '../Redux/prodSlice';

export const TempsStorePage = (props:any) => {
  const history = useNavigate ()
  const dispatch = useDispatch()
  
  const checker = (props:any)=>{
    let g = props.elem
    g = {...props.elem, ordered: false}
    localStorage.setItem(props.elem.name, JSON.stringify(g))
  }
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
      <div title='Узнать подробнее' className='block_1_store_page'><div onClick={()=> {
        
        dispatch(changeStateProods({id: props.elem.id, elem : props.elem}))
        dispatch(changeRaiting({id:props.elem.id, raiting: props.elem.raiting}))
        history('/'+props.elem.id)
        }} className='img_all_storePage' style={{backgroundImage: `url(${props.elem.url})`}} >
        </div></div>
      {Number(props.elem.id) != Number(checks.id) ?  <Button title='Добавить товар в корзину' onClick={()=>{checker(props)
    setChecks(0)  
    setNullInfo(!nullInfo)
    changePrice(Number(props.elem.price))
    }
    } className='Button_StorePage'>+</Button> 
      : <Button title='Ваш товар в корзине' className='Button_StorePage btn-success'>✓</Button>}
     
      <div className='div_for_price_storePage'>{props.elem.price} ₽</div>
      <div className='div_for_name_storePage'>{props.elem.name}</div>
      <div title="Узнать подробнее о товаре" className='div_storePage_explain'onClick={()=> {
        
        dispatch(changeStateProods({id: props.elem.id, elem : props.elem}))
        dispatch(changeRaiting({id:props.elem.id, raiting: props.elem.raiting}))
        history('/'+props.elem.id)
        }} >...</div>
    </div>
  )
}
