
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { changeCheck } from '../Redux/prodSlice'
import image from '../images/not_login.svg'
import { NavBar } from '../components/NavBar'

export const Navigation = (props:any) => {
  const [authNav, setAuthNav] = useState((localStorage.getItem("auth") != null ) ? JSON.parse(String(localStorage.getItem("auth"))) : "")
  
  
  const dispatch = useDispatch()
  const navAuth =  useNavigate()
  const price = useSelector((state:any)=> state.prod.check )
  let g = Object.keys(localStorage).filter((elem:any)=>  elem[0] == elem[0].toUpperCase() && elem[0]!= "_");
  let e:any[] = []


useEffect(() => {
  if (price == 0){
    g.map((elem:any)=> e.push(JSON.parse(String((localStorage.getItem(elem) )))))
    e.map((elem:any)=> dispatch(changeCheck(Number(elem.price))) )
  }
  
  
}, [])

  return (
    <div className='main_div_navigation'>
      <NavBar setPage={props.setPage} setName={props.setName}  setTypeGoods={props.setTypeGoods}/>
        <div className='link_price_block'>
        <div onClick={()=>navAuth('/contacts')} className='Location_main'>
          <div className='Location'></div>
          <div>адреса</div>
        </div>
        <div className='Auth_main_div'>
          <div style={ authNav.imageAuth ? {backgroundImage: `url(${authNav.imageAuth})`}:{backgroundImage: `url(${image})`}} onClick={()=>navAuth('/auth')} title={authNav.imageAuth ? 'Вы уже вошли в систему': 'Войти в систему'} className='SignIn_div'></div>
          <div className='div_block_logIn'>войти</div>
        </div>
        <div className='basket_page_main_1'>
          <div className='basket_page_main'>
            <Link title='Перейти в корзину' className='Link Link_basket' to="/Basket"></Link>
          </div>
          <div>корзина</div>
        </div>
           <div className='main_money_div'>
              <div className='money_image_nav'></div>
              <div title='Суммарная стоимость добавленных товаров'  className='price_navigation_block'>{price} ₽</div>
           </div>
        </div>
    </div>
  )
}
