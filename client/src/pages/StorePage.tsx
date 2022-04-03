
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, decrement, increment } from '../Redux/toolkitSlice'
import { TempsStorePage } from '../components/TempsStorePage'
import { Pagination, Spinner } from 'react-bootstrap'
import { changeLoading } from '../Redux/prodSlice'

export const StorePage = (props:any) => {
    const dispatch = useDispatch()
    const zagl = [0,1,2,3,4]
   const prods = useSelector((state:any)=> state.prod.prods[0])
   const loading = useSelector((state:any)=> state.prod.loading)
  
   const [active, setActive] = useState(props.page)
   let items = [];
   for (let number = 1; number <= props.pageCount; number++) {
     items.push(
       <Pagination.Item className='PaginationItem' onClick={()=>{setActive(number)
       props.setPage(number)
       dispatch(changeLoading(true))
       }} key={number} active={number === active} >
         {number}
       </Pagination.Item>,
     );
   }
  
  //  Train

   
  return (
    <div className='main_div_StorePage_up'>
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
      <Pagination className='Pagination' size="sm">{items}</Pagination>
    </div>
  )
}
