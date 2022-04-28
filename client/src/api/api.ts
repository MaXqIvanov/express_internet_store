import axios from "axios";
import { changeRolePerson } from "../Redux/admin/rolePersonSlice";
import { changeErrors } from "../Redux/errorSlice";
import { addProd, changeLoading, changeRaiting } from "../Redux/prodSlice";

// Api LocalHost
export const apiGetGoods = (typeGoods:string, page:number, sortPrice:boolean, limit:number, setPageCount:any, dispatch:any, name:string):void=>{
    axios.get(`http://127.0.0.1:5000/api/goods/${typeGoods}`+`?page=${page}`+`&sort=${sortPrice}`+`&name=${name}`).then((response: any) => {
        dispatch(addProd(response.data.rows))
        if(response.data.message){
          dispatch(changeErrors(response.data.message))
        }else { dispatch(changeErrors(""))}    
        setPageCount(Math.ceil(response.data.count/limit))
        }).then(()=> dispatch(changeLoading(false))
        );
}
// ___________________________________________________________________________________________
export const apiSetRaiting = (item:any, elem:number ,auth:any, dispatch:any, arrayRaiting:any)=>{
    axios.post(`http://localhost:5000/api/goods/${item.id}`,{
        "raiting": elem,
        "auth": auth.authAuth,
        "email": String(auth.emailAuth),
        "nameProods": String(item.name)
      }).then((response:any)=>{

       response.data ? dispatch(changeRaiting({id: item.id, raiting:arrayRaiting.join(",")}))
        : alert("Вы уже проголосовали за этот товар")

      })
      axios.post(`http://localhost:5000/api/users/${item.id}`,{
        "email": String(auth.emailAuth),
        "nameProods": String(item.name)
      })
}
// ______________________________________________________________________________________________
export const AdminGetProods = (auth:any, setData:any, dispatch:any)=>{
    axios.post('http://localhost:5000/api/admin/1',{
        'email': auth.emailAuth
    }).then((response:any)=>{

      let obj = {"role":response.data.role, "email":response.data.email}
      dispatch(changeRolePerson(obj))
        setData(response.data)

      } )
}
//____________________________________________________________________________________________

export const AdminAddProods = (data:any, auth:any, password:any)=>{
    axios.post('http://127.0.0.1:5000/api/goods',{
           'name': data.nameProods,
           'description':data.descriptionType,
           'price': Number(data.priceProods),
           'url': data.linkOnImage,
           'type': data.typeProods,
           'email': auth.emailAuth,
           'password': password
       }).then((message:any)=>alert(JSON.stringify(message.data)))
}

//____________________________________________________________________________________________
export const AdminRemoveProods = (password:any, auth:any, data:any)=>{
    axios.post(`http://localhost:5000/api/goods/delete/${data.id}`,{
        'password': password,
        'email': auth.emailAuth
    }).then((message:any)=>message.data.message && alert(JSON.stringify(message.data.message)))
}
//____________________________________________________________________________________________
export const AdminGetAllProods = (type:any,setAllProods:any)=>{
    axios.get(`http://localhost:5000/api/goods/${type}?limit=100`).then((data:any)=>
    setAllProods(data.data.rows)
    )
}
//____________________________________________________________________________________________
export const AuthUsers = (emailAuth:any)=>{
    axios.post("http://localhost:5000/api/users",{
        "email": emailAuth, "password":new Date
     })
}
//_____________________________________________________________________________________________
export const AuthUsersForms = (data:any, props:any, nav:any)=>{
    axios.post('http://localhost:5000/api/users/auth',{
        'email':data.LoginEmail,
        'password': data.LoginPassword
      }).then((data:any)=>{
        if(String(data.data) == "false"){
          alert("введённый email или пароль не верный")
        }
        else {
          let g:any = {
            emailAuth:data.data.email,
            authAuth: true,
            nameAuth: data.data.email,
            imageAuth: 'https://store.web-liter.ru/public/static/media/yes_login.svg'
          }
          localStorage.setItem('auth', JSON.stringify(g))
          props.object.setName({nameAuth:"true"})
          nav("/")
        }

      }
      )
}
//_____________________________________________________________________________________________
export const RegisterUsersForms = (data:any, setIsRegistr:any, isRegistr:any, token:any)=>{
       axios.post('http://localhost:5000/api/users/regist',{
          'email':data.RegisterEmail,
          'password': data.RegisterPassword,
          'token': token
        }).then((data)=>{
          if(String(data.data) == "false"){
            alert("Такая почта уже существует")
          }
          else {
            alert("Письмо с подтверждением почты - отправлено вам на почтовоый ящик")
            setIsRegistr(!isRegistr)}
        })
}
//_____________________________________________________________________________________________
export const AuthInVK = (emailAuth:any)=>{
    axios.post("http://localhost:5000/api/users",{
        "email": emailAuth, "password":new Date
     })
}
// _____________________________________________________________________________________________
export const APIOrders=(rUp:any, price:any, reradeName:any, reradeNumber:any)=>{
    axios.post('http://localhost:5000/api/orders',
    {"name":`${rUp}`,"price":Number(price),"namePerson":reradeName,"telPerson":String(reradeNumber)});
}
//_____________________________________________________________________________________________
export const APIGetMessages = (item:any, setMessages:any,setCountMessages:any, active:any)=>{
  axios.get(`http://localhost:5000/api/messages/${item.id}?page=${active}&limit=10`).then((data:any)=>{
  setMessages(data.data.rows)
  setCountMessages(data.data.count)
})
}
//____________________________________________________________________________________________
export const APISendMessages = (item:any, data:any, newAuth:any, setRerander:any, rerander:any)=>{
  axios.post(`http://localhost:5000/api/messages/${item.id}`,{
    'idProods':item.id , 'messages':data.text_message,
    'imgPerson':newAuth.imageAuth, 'namePerson':newAuth.nameAuth, 'email': newAuth.emailAuth
  }).then((data:any)=> {
    setRerander(!rerander)})
}
// ____________________________________________________________________________________________
export const APIDeleteMessage = (data:any, email:any, pass:any, setRerander:any, rerander:any)=>{
  axios.post(`http://localhost:5000/api/messages/delete/${data}`,{
    "email": email,
    "password": pass
  }).then(()=> setRerander(!rerander))
}

export const APITelegramMessage = (token:any, message:string, setStateButtons:any, stateButtons:boolean)=>{
      axios.post(`http://localhost:5000/api/messages/send/telegram`,{
        'token':token,
        'messageTeleg':message
    }).then((data:any)=>{
        console.log(data);

      setStateButtons(!stateButtons)    
      if(data.message){
          alert(data.message)
      }
      else{alert("Спасибо за вашу помощь")}
    })
}


//LARAVEL - PHP FUNC - LOCALHOST
// export const apiGetGoods = (typeGoods:any, page:any, sortPrice:any, limit:any, setPageCount:any, dispatch:any)=>{
//   axios.get(`http://127.0.0.1:5000/api/goods/${typeGoods}`+`?page=${page}`+`&sort=${sortPrice}`+`&name=${name}`).then((response: any) => {
//     dispatch(addProd(response.data.data))
//     if(response.data.message){
//     dispatch(changeErrors(response.data.message))
//     }else {dispatch(changeErrors(""))}
//     setPageCount(Math.ceil(response.data.total/limit))
//     }).then(()=> dispatch(changeLoading(false))
//     );
// }

// export const APIGetMessages = (item:any, setMessages:any,setCountMessages:any, active:any)=>{
//   axios.get(`http://localhost:5000/api/messages/${item.id}?page=${active}&limit=10`).then((data:any)=>{
//   setMessages(data.data.data)
//   setCountMessages(data.data.total)
// })
// }

// export const AdminGetProods = (auth:any, setData:any, dispatch:any)=>{
//   axios.post('http://localhost:5000/api/admin/1',{
//       'email': auth.emailAuth
//   }).then((response:any)=>{
//     let obj = {"role":response.data.role, "email":response.data.email}
//     dispatch(changeRolePerson(obj))
//       setData(response.data)
//     } )
// }
//
//
// ЗАМЕНИТЬ!!!!!!!! 
// export const APITelegramMessage = (token:any, message:string, setStateButtons:any, stateButtons:boolean)=>{
//   axios.post(`http://localhost:5000/api/messages/send/telegram`,{
//     'token':token,
//     'messageTeleg':message
// }).then((data:any)=>{
//     console.log(data);

//   setStateButtons(!stateButtons)    
//   if(data.message){
//       alert(data.message)
//   }
//   else{alert("Спасибо за вашу помощь")}
// })
// }

// Api web-liter.ru
// export const apiSetRaiting = (item: any, elem: any, auth: any, dispatch: any, arrayRaiting: any) => {
//   axios.post(`https://store.web-liter.ru/api/goods/${item.id}`, {
//     "raiting": String(elem),
//     "auth": auth.authAuth,
//     "email": String(auth.emailAuth),
//     "nameProods": String(item.name)
//   }).then((response: any) => {    
//     response.data ? dispatch(changeRaiting({ id: item.id, raiting: arrayRaiting.join(",") })) 
//       : alert("Вы уже проголосовали за этот товар")

//   }).then(()=>{
//     axios.post(`https://store.web-liter.ru/api/users/${item.id}`, {
//       "email": String(auth.emailAuth),
//       "nameProods": String(item.name)
//     })
//   })
  
// }

// export const AdminAddProods = (data: any, auth: any, password: any) => {
//   axios.post('https://store.web-liter.ru/api/goods', {
//     'name': data.nameProods,
//     'description': data.descriptionType,
//     'price': Number(data.priceProods),
//     'url': data.linkOnImage,
//     'type': data.typeProods,
//     'email': auth.emailAuth,
//     'password': password
//   }).then((message: any) => alert(JSON.stringify(message.data)))
// }


// export const AdminRemoveProods = (password: any, auth: any, data: any) => {
//   axios.post(`https://store.web-liter.ru/api/goods/delete/${data.id}`, {
//     'password': password,
//     'email': auth.emailAuth
//   }).then((message: any) => message.data.message && alert(JSON.stringify(message.data.message)))
// }

// export const AdminGetAllProods = (type: any, setAllProods: any) => {
//   let sortPrice = false
//   axios.get(`https://store.web-liter.ru/api/goods/${type}?limit=100` + `&sort=${sortPrice}`).then((data: any) =>
//     setAllProods(data.data.data)
//   )
// }

// export const AuthUsers = (emailAuth: any) => {
//   axios.post("https://store.web-liter.ru/api/users", {
//     "email": emailAuth, "password": new Date
//   })
// }

// export const AuthUsersForms = (data: any, props: any, nav: any) => {
//   axios.post('https://store.web-liter.ru/api/users/auth', {
//     'email': data.LoginEmail,
//     'password': data.LoginPassword
//   }).then((data: any) => {
//     if (String(data.data) == "false") {
//       alert("введённый email или пароль не верный")
//     }
//     else {
//       let g: any = {
//         emailAuth: data.data.email,
//         authAuth: true,
//         nameAuth: data.data.email,
//         imageAuth: 'https://store.web-liter.ru/public/static/media/yes_login.svg'
//       }
//       localStorage.setItem('auth', JSON.stringify(g))
//       props.object.setName({ nameAuth: "true" })
//       nav("/")
//     }

//   }
//   )
// }

// export const RegisterUsersForms = (data: any, setIsRegistr: any, isRegistr: any, token: any) => {
//   axios.post('https://store.web-liter.ru/api/users/regist', {
//     'email': data.RegisterEmail,
//     'password': data.RegisterPassword,
//     'token': token
//   }).then((data) => {   
//     if (String(data.data) == "false") {
//       alert("Такая почта уже существует")
//     }
//     else {
//       alert("Письмо с подтверждением почты - отправлено вам на почтовоый ящик")
//       setIsRegistr(!isRegistr)
//     }
//   })
// }


// export const AuthInVK = (emailAuth: any) => {
//   axios.post("https://store.web-liter.ru/api/users", {
//     "email": emailAuth, "password": new Date
//   })
// }

// export const APIOrders = (rUp: any, price: any, reradeName: any, reradeNumber: any) => {
//   axios.post('https://store.web-liter.ru/api/orders',
//     { "name": `${rUp}`, "price": Number(price), "namePerson": reradeName, "telPerson": String(reradeNumber) });
// }

// export const APISendMessages = (item: any, data: any, newAuth: any, setRerander: any, rerander: any) => {
//   axios.post(`https://store.web-liter.ru/api/messages/${item.id}`, {
//     'idProods': item.id, 'messages': data.text_message,
//     'imgPerson': newAuth.imageAuth, 'namePerson': newAuth.nameAuth, 'email': newAuth.emailAuth
//   }).then((data: any) => {
//     setRerander(!rerander)
//   })
// }

// export const APIDeleteMessage = (data: any, email: any, pass: any, setRerander: any, rerander: any) => {
//   axios.post(`https://store.web-liter.ru/api/messages/delete/${data}`, {
//     "email": email,
//     "password": pass
//   }).then(() => setRerander(!rerander))
// }

// export const apiGetGoods = (typeGoods: any, page: any, sortPrice: any, limit: any, setPageCount: any, dispatch: any, name: string) => {
//   axios.get(`https://store.web-liter.ru/api/goods/${typeGoods}` + `?page=${page}` + `&sort=${sortPrice}` + `&limit=${limit}` + `&name=${name}`).then((response: any) => {
     
//   dispatch(addProd(response.data.data))
//     if (response.data.message) {
//       dispatch(changeErrors(response.data.message))
//     } else { dispatch(changeErrors("")) }
//     setPageCount(Math.ceil(response.data.total / limit))
//   }).then(() => dispatch(changeLoading(false))
//   );
// }

// export const APIGetMessages = (item: any, setMessages: any, setCountMessages: any, active: any) => {
//   axios.get(`https://store.web-liter.ru/api/messages/${item.id}?page=${active}&limit=10`).then((data: any) => {
//     setMessages(data.data.data)
//     setCountMessages(data.data.total)
//   })
// }

// export const AdminGetProods = (auth: any, setData: any, dispatch: any) => {
//   axios.post('https://store.web-liter.ru/api/admin/1', {
//     'email': auth.emailAuth
//   }).then((response: any) => {
//     let obj = { "role": response.data.role, "email": response.data.email }
//     dispatch(changeRolePerson(obj))
//     setData(response.data)
//   })
// }

// // Заменить на домен
// export const APITelegramMessage = (token: any, message: string, setStateButtons: any, stateButtons: boolean) => {
//   axios.post(`https://store.web-liter.ru/api/messages/send/telegram`, {
//     'token': token,
//     'messageTeleg': message
//   }).then((data: any) => {
//     setStateButtons(!stateButtons)
//     if (data.message) {
//       alert(data.message)
//     }
//     else { alert("Спасибо за вашу помощь") }
//   })
// }
