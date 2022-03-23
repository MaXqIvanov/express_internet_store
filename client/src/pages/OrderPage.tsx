
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { TempOrderPage } from '../components/TempOrderPage'
import { changeOrderPrice, rerenderOrderPrice } from '../Redux/orderSlice'

export const OrderPage = (props:any) => {
    const dispatch = useDispatch()
    const [r, serR] = useState(Object.keys(localStorage))
    const price = useSelector((state:any)=> state.order.price)
    


    useEffect(() => {
        dispatch(rerenderOrderPrice())
        r.map((elem:any)=>{
            let g = JSON.parse(String((localStorage.getItem(elem))))
           dispatch(changeOrderPrice(g.price))
        })
    }, [])
    
  
  return (
    <div className='Order_label'>
        <Button onClick={()=>props.setOrderLabel(!props.orderlabel)} className='Order_btn_inside'>X</Button>
        <div className='Order_page_basket'>  {r.map((elem:any, index:any)=>  <TempOrderPage key={index} r={r} serR={serR} props={JSON.parse(String((localStorage.getItem(elem))))}/> )} </div>
        <Form >
            <Form.Group className='form_order_basket_tel'controlId="exampleForm.ControlInput1">
                <Form.Label>Телефон:</Form.Label>
                <Form.Control type="tel" placeholder="Ваш телефон" />
            </Form.Group>
            <Form.Group className='form_order_basket_name' controlId="exampleForm.ControlInput1">
                <Form.Label>Имя:</Form.Label>
                <Form.Control type="text" placeholder="Ваше имя" />
            </Form.Group>
        </Form>
        <Button variant="outline-dark" className='Button_oder_basket'>Заказать</Button>
        <div className='price_order_basket'>Сумма заказа: {price}</div>
    </div>
  )
}
