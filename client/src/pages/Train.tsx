
import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import s from '../scss/train/Train.module.scss'



export const Train = () => {
   const [inputA, setInputA] = useState<any>("")
   const [inputB, setInputB] = useState<any>("")


  let summ = Number(inputA) + Number(inputB)
  console.log(summ);
  let tt = true

  useEffect(() => {
    if(summ == 10 && tt){
      tt= false
        alert("упс")
       
  
    } 
  
    
  }, [summ])
  
 

   
  
  return (
    <div className={s.main}>
        <div className={s.crap}>
        <Form.Label htmlFor="inputPassword5">A</Form.Label>
          <Form.Control
            type="text"
            className={s.form_a_b}
            value={inputA}
            onChange={(event:any)=>{
              setInputA(event.target.value)
            }}
          />
          <Form.Label htmlFor="inputPassword5">B</Form.Label>
          <Form.Control
            type="text"
            className={s.form_a_b}
            value={inputB}
            onChange={(event:any)=>{
              setInputB(event.target.value)
            }}
          />
          {summ == 10 ? <div style={{background: "red", height:100}} className={s.form_a_b}></div>
          : <></>}
      
      </div>
    </div>
  )
}
