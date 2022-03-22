
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeCheck } from '../Redux/prodSlice'

export const Navigation = () => {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(changeCheck(111)) 
  // }, [])
  const price = useSelector((state:any)=> state.prod.check )
  let g = Object.keys(localStorage);
  let e:any[] = []


useEffect(() => {
  

  g.map((elem:any)=> e.push(JSON.parse(String((localStorage.getItem(elem) )))))
  e.map((elem:any)=> dispatch(changeCheck(Number(elem.price))) )

}, [])

  

  
  return (
    <div className='main_div_navigation'>
        <div className='main_logo_div'>Logo</div>
        <div className='link_price_block'>
           <Link className='Link' to="/">Главная</Link>
           <Link className='Link Link_basket' to="/Basket"></Link>
           <div className='price_navigation_block'>{price} ₽</div>
        </div>
    </div>
  )
}
