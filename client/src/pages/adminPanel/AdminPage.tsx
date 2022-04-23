
import React, { Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from '../../scss/admin.module.scss'
import {useForm} from 'react-hook-form'
import Form from 'react-bootstrap/esm/Form'
import { Button, Spinner } from 'react-bootstrap'
import { AdminAddProods, AdminGetProods } from '../../api/api'
import { useDispatch } from 'react-redux'
const AdminPaneldelete = React.lazy(()=> import('./AdminPaneldelete'))

export const AdminPage = () => {
    const dispatch = useDispatch()
    const [variant, setVariant] = useState<number>(0)
    const { 
        register,
        formState: {
        errors
        },
        handleSubmit,
    } = useForm({mode: "onBlur"});
    const nav = useNavigate()
    const [data, setData]  = useState<any>({message:"Вы не авторизованы на сайте"})
    useEffect(() => {
        let auth:any = ((localStorage.getItem('auth') != null ) ? JSON.parse(String(localStorage.getItem('auth'))) : "")
        AdminGetProods(auth, setData, dispatch)
    }, [])
  
    const onSubmit = (data:any)=>{
        let auth:any = ((localStorage.getItem('auth') != null ) ? JSON.parse(String(localStorage.getItem('auth'))) : "")
        let password = prompt("Введите ваш пароль", "")
        console.log(password);
        AdminAddProods(data, auth, password)    
    }
    const navCount = (elem:any)=>{
        if((variant < 5 || elem=="-1") && (variant >0 || elem=="1" )){
            setVariant(variant + elem)
        }  
    }
    
    
  return (
      <>
    {
       data.message? <div  className={s.main}><h3 title='Авторизоваться на сайте' onClick={()=>nav('/auth')}>{data.message}</h3></div>


       : <div className={s.main}>
           {variant==0 ? 
           <div className={s.crap}>
               <h4>Добавить новый товар</h4>
               <Form className={s.Form} onSubmit={handleSubmit(onSubmit)}>
               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Наименования товара: </Form.Label>
                    <Form.Control {...register('nameProods',{
                         required:"Укажите наименования товара"
                    })} type="text"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Описание товара: </Form.Label>
                    <Form.Control {...register('descriptionType',{
                         required:"Укажите описание товара"
                    })} type="text"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Цена товара: </Form.Label>
                    <Form.Control {...register('priceProods',{
                         required:"поле с ценой обязательно для заполнения"
                    })} type="text"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Ссылка на изображение: </Form.Label>
                    <Form.Control {...register('linkOnImage',{
                         required:"Укажите url изображения"
                    })} type="text"/>
                </Form.Group>
                <Form.Select  {...register('typeProods',{
                    required:"Укажите тип товара"
                })} aria-label="Выберите тип товара">
                    <option disabled={true}>Выберите тип товара</option>
                    <option value="phone">Телефон</option>
                    <option value="laptope">Ноутбук</option>
                </Form.Select>
                <div style={{color:"red"}}>{errors.priceProods ?  <span className={s.span}>{errors?.priceProods?.message && errors.priceProods.message}</span>
                 : errors.linkOnImage ? <span className={s.span}>{errors?.linkOnImage?.message && errors.linkOnImage.message}</span> 
                 : errors.nameProods ? <span className={s.span}>{errors?.nameProods?.message && errors.nameProods.message}</span>: ''} </div>
                <Button className='mt-1' type='submit'>Принять</Button>
               </Form>
                
            </div>
            : variant==1 ? <><Suspense fallback={<Spinner animation="grow" />}><div className={s.crap}><AdminPaneldelete /></div></Suspense></> : <>раздел в разработке</>}
        <div className={s.navButtons}>
        <Button className={s.navLeft}  variant="outline-light" onClick={()=>navCount(-1)}>{`${"<"}`}</Button>
            <Button className={s.navRight}  variant="outline-light" onClick={()=>navCount(1)}>{`${">"}`}</Button>
        </div>
        <div onClick={()=> nav('/')} className={s.NavHome}></div>
       </div>
    }

        </>
    )
}
export default AdminPage
