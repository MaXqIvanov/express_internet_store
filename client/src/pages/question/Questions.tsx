import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/esm/Form'
import { useForm } from 'react-hook-form'
import { APITelegramMessage } from '../../api/api'
import s from '../../scss/questions/questions.module.scss'
export const Questions = (props:any) => {
    const [stateButtons, setStateButtons] = useState(false);
    const { 
        register,
        formState: {
        errors
        },
        handleSubmit,
      } = useForm({
      mode: "onChange"
  });
  const onsubmitMessageError=async (data:any)=>{
      let message = "name: "+String(data.name_message) + ", " + "massage: "+String(data.errors_message)
      const token = await props.recaptchaRef.current.executeAsync();
      APITelegramMessage(token, message, setStateButtons, stateButtons)
  }

  
  return (
    <div className={s.main}>
        <div className={s.wrapper}>
        <h5>Опишите возникшую проблему</h5>
        <Form onSubmit={handleSubmit(onsubmitMessageError)} className={s.Form}>
          <Form.Control {...register("errors_message", {
required: "Поле обязательно для заполнения",
  minLength: {
     value:3 ,
     message: 'минимальная длина 3 символа',
                },
                maxLength:{
                    value: 140,
                    message: 'Слишком большое сообщение'
                },
})} as="textarea" placeholder="Описание проблемы" />
          <div className={s.nickName_Button}><Form.Control  {...register("name_message",{
            required: "Поле обязательно для заполнения",
            minLength: {
                value:3 ,
                message: 'минимальная длина 3 символа'
                           },
            maxLength:{
                value: 40,
                message: 'Слишком большое сообщение'
            },
        })} placeholder="Ваш NickName" className={s.name_message} autoComplete="off"/>
          <Button disabled={stateButtons} type='submit' className={s.ButtonSub}>отправить</Button>
          </div>
          <div className={s.erros_Div}>{errors?.errors_message ? <p style={{color:'red'}}>{
              errors?.errors_message?.message
              }</p>
            : errors?.name_message ? <p style={{color:'red'}}>{errors?.name_message?.message}</p>
            :<></>
            }</div>
        </Form>
        <small className={s.textCapcha}>This site is protected by reCAPTCHA and the Google 
    <a href="https://policies.google.com/privacy">Privacy Policy</a> and
    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
</small>
        </div>
        
      
    </div>
    
  )
}

export default Questions