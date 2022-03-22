
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, decrement, increment } from '../Redux/toolkitSlice'
import { TempsStorePage } from '../components/TempsStorePage'
import { Spinner } from 'react-bootstrap'

export const StorePage = () => {
    const zagl = [0,1,2,3,4]
   const prods = useSelector((state:any)=> state.prod.prods[0])
   const loading = useSelector((state:any)=> state.prod.loading)
 
    
  return (
    <div className='main_div_StorePage'>
        {loading ? zagl.map((elem:any, index:any) => <div className='any_div' key={index}><Spinner className='Spinner' animation="grow" /></div>)
         : 
        prods? prods.map((elem:any)=>
        <div className='any_div' key={elem.id}>
            <TempsStorePage elem={elem}/>
        </div>
        ): <div></div>
        }
    
    </div>
  )
}
