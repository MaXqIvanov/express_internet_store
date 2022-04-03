
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { TempOrderPage } from '../components/TempOrderPage'
import { changeOrderPrice, rerenderOrderPrice } from '../Redux/orderSlice'

export const OrderPage = (props:any) => {
    const dispatch = useDispatch()
    const [r, serR] = useState(Object.keys(localStorage).filter((elem:any)=> elem!= "auth"))
    const price = useSelector((state:any)=> state.order.price)
     
    
    
    const filterOrdered = ()=>{
        serR(r.filter((elem:any)=>
        JSON.parse(String((localStorage.getItem(elem)))).ordered === false 
        ))
      }
      useEffect(() => {
        filterOrdered()
      }, [])
    

    useEffect(() => {
        dispatch(rerenderOrderPrice())
        r.map((elem:any)=>{
            let g = JSON.parse(String((localStorage.getItem(elem))))
            g.ordered ? dispatch(changeOrderPrice(0))
           : dispatch(changeOrderPrice(g.price))
        })
    }, [])
    
  const [reradeName, setReradeName] = useState<string>("")                //инпут для имени
  const [reradeNumber, setReradeNumber] = useState<any>("")              //инпут для номера

  
    // Train
 
 
    let args = [1,2,3,4] 
    const ger = args.reduce((acc, i) => acc += i, 0)/args.length
   
    
    
    
    

    // const orderSend = ()=> {
    //     const rUp = r.map((elem:any, index:any)=>{
    //         index++;
    //         let g = JSON.parse(String((localStorage.getItem(elem))))
    //         let newElem = g
    //         newElem.ordered = true
    //         localStorage.setItem(elem, JSON.stringify(newElem))
    //         elem = index+ '-' + elem
    //         return elem
    //     })
    //     alert("Заказ оформлен")
    //     axios.post('https://store.web-liter.ru/api/orders', 
    //     {"name":`${rUp}`,"price":Number(price),"namePerson":reradeName,"telPerson":String(reradeNumber)}
    //   );
    //   props.setOrderLabel(!props.orderlabel)

    // }
    const orderSend = ()=> {
      const rUp = r.map((elem:any, index:any)=>{
          index++;
          let g = JSON.parse(String((localStorage.getItem(elem))))
          let newElem = g
          newElem.ordered = true
          localStorage.setItem(elem, JSON.stringify(newElem))
          elem = index+ '-' + elem
          return elem
      })
      alert("Заказ оформлен")
      axios.post('http://localhost:5000/api/orders', 
      {"name":`${rUp}`,"price":Number(price),"namePerson":reradeName,"telPerson":String(reradeNumber)}
    );
    props.setOrderLabel(!props.orderlabel)
  }

  // train
  
  return (
    <div className='Order_label'>
        <Button onClick={()=>props.setOrderLabel(!props.orderlabel)} variant="outline-info" className='Order_btn_inside'>✘</Button>
        <div className='Order_page_basket'>  {r.map((elem:any, index:any)=>  <TempOrderPage key={index} r={r} serR={serR} props={JSON.parse(String((localStorage.getItem(elem))))}/> )} </div>
        <Form >
            <Form.Group className='form_order_basket_tel'controlId="exampleForm.ControlInput1">
                <Form.Label>Телефон:</Form.Label>
                <Form.Control onChange={(event:any)=>{
                     event.target.value.length < 13 ?
                     setReradeNumber(event.target.value) : alert("номер не должен быть больше 12 символов")
                }} type="tel" placeholder="Ваш телефон" value={reradeNumber} />
            </Form.Group>
            <Form.Group className='form_order_basket_name' controlId="exampleForm.ControlInput1">
                <Form.Label>Имя:</Form.Label>
                <Form.Control onChange={(event:any)=>{
                    event.target.value.length < 15 ?
                    setReradeName(event.target.value) : alert("Имя не должно быть больше 15 символов")
                    
                    }} type="text" placeholder="Ваше имя" value={reradeName}/>
            </Form.Group>
        </Form>
        <Button variant="outline-light" className='Button_oder_basket' onClick={()=>{
            reradeNumber.length <= 10 ? alert("Телефон должен состоять из 11 цифр") : reradeNumber.length >= 13 ? alert("Телефон должен состоять из 11 цифр") : (reradeName.length <= 2) ? alert("Имя должно быть больше 2 букв") : 
               price <= 0 ? alert("Вы не выбрали ни одного заказа")  : Boolean(Number(reradeNumber)) ? orderSend() : alert("Введите правильный телефон")
               
        }}>Заказать</Button>
        <div className='price_order_basket'>Сумма заказа:  {Number(price)} ₽</div>
    </div>
  )
}
