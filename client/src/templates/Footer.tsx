 
 import React from 'react'
import { useNavigate } from 'react-router-dom'
 import s from '../scss/footer.module.scss'
 export const Footer = () => {
    const history = useNavigate()


  return (
      <div className={s.main}>
          <div onClick={()=>{history('/confidentiality')

             }} className={s.confidence} title='Узнайте подробнее о конфиденциальности ваших данных'><p>•политика конфиденциальности</p></div>
          <div onClick={()=>{history('/contacts')}} className={s.contacts}>•контакты</div>
    </div>
)
}
 