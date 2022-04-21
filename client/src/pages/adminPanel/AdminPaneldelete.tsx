

import React, { useEffect, useState } from 'react'
import CloseButton from 'react-bootstrap/esm/CloseButton'
import Form from 'react-bootstrap/esm/Form'
import { AdminGetAllProods, AdminRemoveProods } from '../../api/api'
import s from '../../scss/admin.module.scss'

export const AdminPaneldelete = () => {
    const zagl:number[] = [1,2,3,4,5]
    const [allprods, setAllProods] = useState<any[]>([])
    const [type, setType] = useState<string>('phone')
    useEffect(() => {
        AdminGetAllProods(type, setAllProods)
    }, [type])

    const removeITem = (data:any)=>{
        let auth:string = ((localStorage.getItem('auth') != null ) ? JSON.parse(String(localStorage.getItem('auth'))) : "")
        let password:any = prompt("Введите пароль")
        AdminRemoveProods(password, auth, data)
        let newallprods:any = allprods.filter((elem:any)=> elem.id !== data.id)
        setAllProods(newallprods)
    }
    
  return (
    <div>
        <h4>Удалить товар:</h4>
        <div className={s.allArray}>
        {allprods.length > 0 ? allprods.map((elem:any, index:any)=><div key={index} className={s.deleteArray}>
            <div className={s.nameProodPage2}>{elem.name}</div>
            <CloseButton onClick={()=>removeITem(elem)} className={s.closeButton} variant="white"/>
        </div>)
        : zagl.map((elem:any,index:any)=><div key={index} className={s.deleteArray}>{elem}</div>)
    }
        </div>
        <Form.Select className={s.formPage2} onChange={(event:any)=>setType(event.target.value)} aria-label="Default select example">
                <option value="phone">Телефон</option>
                <option value="laptope">Ноутбук</option>
        </Form.Select>
    </div>
  )
}
export default AdminPaneldelete