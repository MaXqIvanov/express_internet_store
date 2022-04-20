
import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AuthUsersForms, RegisterUsersForms } from '../../api/api'
import s from '../../scss/auth.module.scss'
import ReCAPTCHA from "react-google-recaptcha"

export const AuthSite = (props:any) => {
    const nav = useNavigate()
    const [isRegistr, setIsRegistr] = useState(false)
    const [registerSite, setRegisterSite] = useState(true)
    const [visiblePass, setVisiblePass] = useState<any>('password')
    const { 
        register, formState: { errors, isValid }, handleSubmit, reset,
      } = useForm({
        mode: "onChange"
      });

      // функция по регистрации
      const onAuth = (data:any)=>{
        AuthUsersForms(data, props,nav)
      }
      
      const recaptchaRef:any = React.useRef();
      const onRegistration = async(data:any)=>{
        const token = await recaptchaRef.current.executeAsync();              
        RegisterUsersForms(data, setIsRegistr, isRegistr, token)
      }

      // Затестировать capcha V3
      // useEffect(() => {
      //   load('<6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI>',{
      //     useRecaptchaNet: true,
      //     autoHideBadge: true
      //   }).then((recaptcha:any) => {
      //     recaptcha.execute('<action>').then((token:any) => {        
      //       })
      //   })
      // }, [])
      // Удалить capcha V3
      // capcha V2
      function onChange(value:any) {
        setIsRegistr(!register)
      }
      //remove capcha V2
     
      
   
   
  return (
      <>
      {registerSite? 
            <div className={s.authSite}>
                        <div title='назад' className={s.navHome} onClick={()=>props.object.setAuthSite(!props.object.authSite)}></div>
                        <div onClick={()=>setRegisterSite(!registerSite)}  title='зарегистрироваться на сайте' className={s.div_auth2}>нет аккаунта?</div>
                        <div className={s.img_hidden} onClick={()=>{
                          let g = visiblePass;
                          if (String(g)=='password'){
                            setVisiblePass('text')
                          } else if(String(g)=='text'){
                            setVisiblePass('password')
                          }
                        
                          }}></div>
                        <div>
                        <Form onSubmit={handleSubmit(onAuth)} className={s.formGroup}>
                            <Form.Label>
                             <Form.Control className={s.Form}{...register('LoginEmail',{
                               required: 'не заполнено',
                             })} type='email'></Form.Control>
                            <div>Почта : {errors?.LoginEmail && <span style={{color:"red"}}>{errors?.LoginEmail?.message}</span>}</div>
                             </Form.Label>
                             <Form.Label>
                             <Form.Control className={s.Form} {...register('LoginPassword' ,{
                               required: 'не заполнено',
                             })} type={visiblePass} ></Form.Control>
                                Пароль: {errors?.LoginPassword && <span className={s.errors} style={{color:"red"}}>{errors?.LoginPassword?.message}</span>}
                             </Form.Label>
                             <Button type='submit' className={s.button_login} variant="outline-light"><div>Войти</div></Button>
                           
                        </Form>
                  
                        </div>
            </div> 

            :
        
            <div className={s.authSite}>
                <div title='назад' className={s.navHome} onClick={()=>setRegisterSite(!registerSite)}></div>
                <div className={s.img_hidden} onClick={()=>{
                          let g = visiblePass;
                          if (String(g)=='password'){
                            setVisiblePass('text')
                          } else if(String(g)=='text'){
                            setVisiblePass('password')
                          }
                        
                          }}></div>
                    <Form onSubmit={
                      handleSubmit(onRegistration)} className={s.formGroup}>
                            <Form.Label>
                             <Form.Control className={s.Form}{...register('RegisterEmail',{
                               required: 'не заполнено',
                             })} type='email'></Form.Control>
                            <div>Почта : {errors?.RegisterEmail && <span style={{color:"red"}}>{errors?.RegisterEmail?.message}</span>}</div>
                             </Form.Label>
                             <Form.Label>
                             <Form.Control className={s.Form} {...register('RegisterPassword' ,{
                               required: 'не заполнено',
                               pattern:  {value: /[A-Za-z1-9а-яА-Я]{5}/ ,
                                          message: "слабая надёжность"
                              },
                             })} type={visiblePass} ></Form.Control>
                                Пароль: {errors?.RegisterPassword && <span className={s.errors} style={{color:"red"}}>{errors?.RegisterPassword?.message}</span>}
                             </Form.Label>
                             <Button disabled={isRegistr} type='submit' className={s.button_registr} variant="outline-light"><div>Зарегистрироваться</div></Button>
                       
                             <ReCAPTCHA className={s.recapcha}
            ref={recaptchaRef}
            sitekey="6LeGQ4IfAAAAAK9dGcts02qUCW4pbljK0rS_aLHH"
            onChange={onChange}
            theme="dark"
            size='invisible'
            
          />
      
                        </Form>
                        <small className={s.textCapcha}>This site is protected by reCAPTCHA and the Google 
    <a href="https://policies.google.com/privacy">Privacy Policy</a> and
    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
</small>
            </div>
           
        }
</>
  )
}
