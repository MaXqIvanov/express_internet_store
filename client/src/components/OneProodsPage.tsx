
import React, { useEffect, useState } from 'react'
import { Button, CloseButton, Form, FormControl, FormGroup, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { APIDeleteMessage, APIGetMessages, APISendMessages, apiSetRaiting } from '../api/api'
import s from '../scss/oneProd.module.scss'
import {useForm} from 'react-hook-form'
import image from '../images/send_message.svg'
import axios from 'axios'

export const OneProodsPage = (props:any) => {
      const {role} = useSelector((state:any)=> state.role)
      const { 
        register,
        formState: {
        errors,
        isValid
        },
        handleSubmit,
        reset,
        
      } = useForm({
        mode: "onChange"
      });
    const [rerander, setRerander] = useState<boolean>(false)
    const [messages, setMessages]= useState<any[]>([])
    const [countMessage, setCountMessages]=useState<any>(1)
    const [active, setActive]= useState(1)
    let newAuth:any = JSON.parse(String(localStorage.getItem("auth")))
    const reNav = useNavigate()
    const dispatch = useDispatch()
    let raits:any[] = [1,2,3,4,5]    
    const item:any = useSelector((state:any)=> state.oneProd.oneProds)
    let arrayRaiting:string[] = String(item.raiting).split(",")
    let averageRaiting:string = (arrayRaiting.reduce((total:any, elem:any)=> total+Number(elem),0)/arrayRaiting.length).toFixed(1)
    
    if(item.length == 0){
      reNav("/")
    }
    useEffect(() => {
      APIGetMessages(item, setMessages, setCountMessages,active)
    }, [rerander, active])
  
    
    
    const setRaiting = (elem:any) => {
      let auth:any = JSON.parse(String(localStorage.getItem("auth")))
      arrayRaiting.push(String(elem))
      
      if(auth){
          apiSetRaiting(item, elem, auth, dispatch, arrayRaiting)
      }  
      else  alert("Оставлять отзыв может только зарегистрированный пользователь")
    
    } 
    
    const sendMessages = (data:any) =>{
      if(newAuth){
        if(newAuth.nameAuth === newAuth.emailAuth){
          newAuth.nameAuth = prompt('Введите ваш псевдоним')
          if(newAuth.nameAuth == null || newAuth.nameAuth == "") {
            alert("для отправки сообщения введите ваш псевдоним")
            throw new Error 
          }
          if(newAuth.nameAuth.length <= 3){
            alert("псевдоним должен быть длиннее 3 символов")
            throw new Error
          }
          localStorage.setItem('auth', JSON.stringify(newAuth))
        }
      }else{
        newAuth = {
          imageAuth : "https://store.web-liter.ru/public/static/media/send_message.svg",
          nameAuth : "Гость",
          emailAuth : "nothing"
        }
      
      
      }
        APISendMessages(item, data, newAuth, setRerander, rerander) 
    }
    const DeleteMessage = (data:any)=>{
      let email:any = role.email
      let pass = prompt("введите ваш пароль")
     APIDeleteMessage(data, email, pass, setRerander, rerander)
    }

    
    
    let items:any[] = [];
    let pages:number = Math.ceil(countMessage/10)
    for (let number:number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item onClick={()=>setActive(number)} key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }
    
  return (
    <div>{item.length >= 0 ? <li></li> : <div className={s.main}><div className={s.main_div_oneProd}>
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
            <div className={s.review}>
              <div className={s.review_div}><h3>Отзывы:</h3></div>
              <div className={s.review_crap}>
                <div className={s.main_oneMessage_div}>
                  {messages.length > 0 ?
                messages.map((elem:any, index:any)=>
                <div key={index} className={s.oneMessage}>{
                  <>
                  <div style={{backgroundImage: elem?.imgPerson ? `url(${elem.imgPerson})`: `url(${image})`}} className={s.imgPersonMessage}></div>
                  <div className={s.inform}>
                    <div className={s.nickname}>{newAuth !== null ?  <h5>{elem.namePerson}</h5> : <>{elem.namePerson}</>}
                      </div>
                    <div className={s.textMessage}>{elem.messages}</div>
                  </div>

                  {role.role == "ADMIN" ?  <CloseButton onClick={()=> DeleteMessage(elem.id)} variant="white" className={s.AdminRemoveMessage} /> : <></>}
                 
                  </>
                }</div>
                  )


                :<div>У данного товара ещё нет отзывов</div>}
                  </div>
              </div>
              <div className={s.FormSendReview}>
                <Form onSubmit={handleSubmit(sendMessages)} className={s.FormSendReviewCrap}>
                <Form.Control {...register('text_message',{
                   required: "некорректные данные",
                   minLength: {
                    value:5 ,
                    message: 'минимальная длина 5 символа'
                  },
                  maxLength: {
                    value:120 ,
                    message: 'максимальная длина 120 символа'
                  },
                })} as="textarea" placeholder="Оставьте отзыв" />
                  <Button className={s.buttonSubmit} type='submit' variant='outline-light'>Отправить</Button>
                </Form>
                
              </div>
              <div className={s.messageError}><div className={s.erros}>
              {errors?.text_message?.message}
                </div></div>
                <div className={s.pagination} ><Pagination className={s.paginationArray} size="sm">{items}</Pagination></div>
            </div>
     </div>
    }</div>
  )
}
