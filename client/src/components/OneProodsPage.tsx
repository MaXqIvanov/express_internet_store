
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import s from '../scss/oneProd.module.scss'

export const OneProodsPage = (props:any) => {
    let raits = [1,2,3,4,5]
    const [tipStars, setTipStart] = useState(5)
    const items:any[] = useSelector((state:any)=> state.prod.prods[0])
    let item:any[] = [1];
    try {
        
        item = items.filter((elem:any)=>    elem.id == props.index         )                            
    } catch (error) {      }    

    
  return (
    <div>{item[0].length >= 0 ? <li></li> : <div className={s.main_div_oneProd}>
        <div className={s.main_div_wrapper}>
           <div className={s.image_div} style={{backgroundImage: `url(${item[0].url})`}}> </div>
            <div className={s.price}>{item[0].price} ₽ </div>
            <div className={s.description}><p>{item[0].description}</p> </div>
            <div className={s.name}>{item[0].name} </div>
            <div className={s.raiting}><div className={s.star}>Рейтинг товара: ★</div>{item[0].raiting} </div>
            <div className={s.setRaiting}>{raits.map((elem:any , index:any)=><div className={s.stars} onClick={()=>{
                setTipStart(elem)
                alert("Оставлять отзыв может только зарегистрированный пользователь")
            }}>★<div className={s.setOneRaiting}>{elem}</div></div>)}</div>
       </div>
    </div>
    }</div>
  )
}
