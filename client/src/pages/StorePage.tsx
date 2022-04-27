
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TempsStorePage } from '../components/TempsStorePage'
import { Button, Form, Pagination, Spinner } from 'react-bootstrap'
import { changeLoading } from '../Redux/prodSlice'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'

export const StorePage = (props:any) => {
    const dispatch = useDispatch()   
    const nav = useNavigate() 
    const zagl:number[] = [0,1,2,3,4]
   const prods:any = useSelector((state:any)=> state.prod.prods[0])
   const loading:boolean = useSelector((state:any)=> state.prod.loading)
   const currentPage:number = useSelector((state:any)=>state.anyAtributes.currentPage)
   const newErrors:string = useSelector((state:any)=>state.errors.errors )
  
   const [active, setActive] = useState<number>(props.page)
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
  
   const isParams = ()=>{
     props.setName("")
    props.setSort.setSortPrice(!props.setSort.sortPrice)
   }


   useEffect(() => {
      nav({
        pathname: `${currentPage}`,
        search: `?sort=${props.sortPrice}&page=${props.page}&type=${props.typeGoods}`
      })
  }, [props.page, props.typeGoods, props.sortPrice])
  //  Train

  const { 
    register,
    formState: {
    errors
    },
    handleSubmit,
  } = useForm({
mode: "onSubmit"
});
   const searchProds = (data:any)=>{
    props.setName(data.search)
   }



  return (
    <div className='main_div_StorePage_up'>
      <Form onSubmit={handleSubmit(searchProds)} className='main_div_setName' >
      <Form.Control autoComplete='off' className='input_search' {...register('search',{
        minLength: {
          value:2 ,
          message: 'минимальная длина 2 символа'
                     },
        maxLength: {
          value: 22,
          message: 'длина превышает допустимую'
        }
      })} size="sm" type="text" placeholder="поиск..." />
      <Button type='submit' variant="outline-dark" className="ButtonSearch"></Button>
      {errors?.search ? <div className='errorsMessage'>{errors.search.message}</div> : <></>}
     </Form>
    
      <div className='main_div_sort'>Сортировка по: <div className='sort_on_price'> <Form>
            <Form.Check 
              type="switch"
              id="custom-switch"
              label="цене"
              checked={props.setSort.sortPrice}
              onChange={()=>isParams()}
            />
          </Form></div></div>
      <div className='main_div_StorePage'>
          {loading ? zagl.map((elem:any, index:any) => <div className='any_div' key={index}><Spinner className='Spinner' animation="grow" /></div>)
          : 
          prods? prods.map((elem:any)=>
          <div className='any_div' key={elem.id}>
              <TempsStorePage elem={elem}/>
          </div>
          ): <div className='main_divErrors'>
            <div className='newErrorsStorePage'></div>
            <div className={'newErrorsMessage'}>{newErrors}</div>
          </div>
          }
          
      </div>
      <Pagination className='Pagination' size="sm">{items}</Pagination>
    </div>
  )
}
