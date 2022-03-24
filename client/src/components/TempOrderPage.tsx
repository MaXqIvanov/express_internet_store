
import React, { useEffect } from 'react'
import { CloseButton } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { changeOrderPrice } from '../Redux/orderSlice'

export const TempOrderPage = (props:any) => {
    const dispatch = useDispatch()

    
    const filtr = ()=>{
       props.serR(props.r.filter((elem:any)=>
            elem != props.props.name
        ))
        
    }

    // const filterOrdered = (elems:any)=>{
    //   console.log(props.props.ordered)
    //   props.serR(props.r.filter((elem:any)=>
    //         elems == false
    //   ))
    // }
    // useEffect(() => {
    //   filterOrdered(props.props.ordered)
    // }, [])
    
   

  return (

    <div className='TempOrderPage_div'>
        <CloseButton onClick={()=>{
            dispatch(changeOrderPrice(-props.props.price))
            filtr()
        }} className='btn button_order_basket'  />
        <div className='data_name'>{props.props.name}</div>
        <div className='data_price'>{props.props.price} ₽</div>

    </div>
  )
}
