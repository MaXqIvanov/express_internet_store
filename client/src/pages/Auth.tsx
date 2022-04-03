import React, { useEffect, useState } from 'react'
import s from '../scss/auth.module.scss'
import { gapi } from 'gapi-script'
import { useNavigate } from 'react-router-dom'
import { AuthYandex } from './AuthYandex'
import axios from 'axios'
const VK = require("vk-openapi");

export const Auth = () => {
    const navHome = useNavigate()
    const [name, setName]= useState<any>((localStorage.getItem("auth") != null ) ? JSON.parse(String(localStorage.getItem("auth"))) : "")
    // Auth
    
    try {
        useEffect(() => {
            gapi.load('auth2', function(){
                gapi.auth2.init({
                  client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID+".apps.googleusercontent.com",
                }).then(()=> console.log(''), ()=> console.log("")
                )
            }) 
          }, [])
    } catch (error) {        }
    const signIn = ()=>{
        try {
            const GoogleAuth = gapi.auth2.getAuthInstance()
        GoogleAuth.signIn(
            {
                scope: 'profile email',
            }
            
        ).then((user:any)=> {
            
            let g = user.getBasicProfile()
            let imageAuth = user.getBasicProfile().getImageUrl()
            let nameAuth = user.getBasicProfile().getName()
            let emailAuth = user.getBasicProfile().getEmail()
            let authAuth = true;
            g = {...g, imageAuth, nameAuth, emailAuth, authAuth}
             localStorage.setItem("auth", JSON.stringify(g))
            setName((localStorage.getItem("auth") != null ) ? JSON.parse(String(localStorage.getItem("auth"))) : "")
            try {
                axios.post("http://localhost:5000/api/users",{
               "email": emailAuth, "password":new Date 
            })
            } catch (error) {       }
            navHome("/")
    },

        
        )
        } catch (error) {        }
    }

    const signOut= ()=>{
     
        try {
            VK.Auth.logout(function(response:any) {})
        } catch (error) { }
        try {
            const GoogleAuth = gapi.auth2.getAuthInstance()
            GoogleAuth.signOut().then(()=>{
                localStorage.removeItem("auth")
                setName("")
            })
           
           
        } catch (error) {
            localStorage.removeItem("auth")
            setName("")
        }
       
    }

           
            
   
    
  return (
    <div className={s.main}>
        <div className={s.registr}>
          
        
            <div title='Вернуться на главную' className={s.navHome} onClick={()=>navHome('/')}></div>
            <div className={s.div_title}>Войти с помощью:</div>
            <div className={s.main_buttons}>
                 <div onClick={()=> name.nameAuth ? alert("Вы уже вошли в систему") : signIn()} title={'Войти с помощью Goole'} className={s.img_google}></div>
                 <AuthYandex name={name} setName={setName}/>
            </div>
           
            {name.nameAuth !== undefined  ? <><div title='Выйти из системы' onClick={()=>signOut()}  className={s.signButton}>
              Выйти
            </div>
            </> 
            :
            <></>
            }
            
        </div>
    </div>
  )
}
