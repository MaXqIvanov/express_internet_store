
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeRaiting } from '../Redux/prodSlice'
import s from '../scss/oneProd.module.scss'

export const OneProodsPage = (props:any) => {
    let newAuth:any = JSON.parse(String(localStorage.getItem("auth")))
    const reNav = useNavigate()
    const dispatch = useDispatch()
    let raits = [1,2,3,4,5]
    
    
    const item = useSelector((state:any)=> state.oneProd.oneProds)
    let arrayRaiting = String(item.raiting).split(",")
    let averageRaiting:any = (arrayRaiting.reduce((total:any, elem:any)=> total+Number(elem),0)/arrayRaiting.length).toFixed(1)
    // const [tipStars, setTipStart] = useState(averageRaiting)
    
    if(item.length == 0){
      reNav("/")
    }
  

    
   
    
    
    
    const setRaiting = (elem:any) => {
      let auth:any = JSON.parse(String(localStorage.getItem("auth")))
      arrayRaiting.push(String(elem))
      
      if(auth){
          axios.post(`http://localhost:5000/api/goods/${item.id}`,{
            "raiting": elem,
            "auth": auth.authAuth,
            "email": String(auth.emailAuth),
            "nameProods": String(item.name)
          }).then((response:any)=>{
            
           response.data ? dispatch(changeRaiting({id: item.id, raiting:arrayRaiting.join(",")}))
            : alert("Вы уже проголосовали за этот товар")
             
          })
          axios.post(`http://localhost:5000/api/users/${item.id}`,{
            "email": String(auth.emailAuth),
            "nameProods": String(item.name)
          })
      }  
      else  alert("Оставлять отзыв может только зарегистрированный пользователь")
    
    } 
    
  return (
    <div>{item.length >= 0 ? <li></li> : <div className={s.main_div_oneProd}>
        <div className={s.main_div_wrapper}>
           <div className={s.image_div} style={{backgroundImage: `url(${item.url})`}}> </div>
            <div className={s.price}>{item.price} ₽ </div>
            <div className={s.description}><p>{item.description}</p> </div>
            <div className={s.name}>{item.name} </div>
            <div className={s.raiting}><div className={s.star}>Рейтинг товара: ★</div>{averageRaiting} </div>
            <div className={s.setRaiting}>{raits.map((elem:any , index:any)=><div key={index} className={s.stars} onClick={()=>
              
              newAuth !== null ? setRaiting(elem) : alert("Ставить оценки могут только зарегистрированные пользователи")
            }>★<div className={s.setOneRaiting}>{elem}</div></div>)}</div>
       </div>
    </div>
    }</div>
  )
}
