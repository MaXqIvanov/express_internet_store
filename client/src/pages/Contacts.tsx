import React, { useEffect, useState } from 'react'
import s from '../scss/contacts.module.scss'
import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps';
import { Spinner } from 'react-bootstrap';

export const Contacts = () => {
    const[mock, setMock]=useState([{
        title:"Web-lter - Магазин",
        geoData: [59.921990624727876,30.31004737384085],
        workTime: "Ежедневно с 9:00 до 21:00",
        tel: "89531234561"
    },{
        title:"Web-liter - Центральный офис",
        geoData: [59.881990624727876,30.31004737384085],
        workTime: "Ежедневно с 9:00 до 21:00",
        tel: "89531234561"
    },{
        title:"Web-liter - Магазин",
        geoData:[59.851990624727876,30.34509937384085],
        workTime: "Ежедневно с 10:00 до 22:00",
        tel: "89531234561"
    }])
    const[pointer, setPonter]= useState([59.911990624727876,30.31004737384085])


    
    
  return (
    <div id='open-chat' className={s.main}>
        <div className={s.wrapper_top}>
            <div className={s.wrapper_top_left}>
                <div className={s.wrapper_top_left_centr}>
                    <div className={s.wrapper_top_left_centr_info}>
                        <h5>• Контакты: </h5>
                        <div className={s.phone}><div className={s.image_phone}></div> <div>89531234561</div></div>
                        <div className={s.laptope}><div className={s.image_laptope}></div> <div>web-liter@email.ru</div></div>
                    </div>
                </div>
            </div>
            <div className={s.wrapper_top_right}>
                 <div className={s.wrapper_top_right_centr}>
                    <div className={s.wrapper_top_right_centr_info}>
                            <h5>• Соц сети: </h5>
                            <div className={s.vk}><div  title='перейти в VK' className={s.image_vk}></div> <div  title='перейти в telegram' className={s.image_telegram}></div> <div title='перейти в whatsapp' className={s.image_whatsapp}></div>
                            <div title='перейти в facebook' className={s.image_facebook}></div>
                            </div>
                    </div>
                 </div>
            </div>
        </div> 
        
        <YMaps query={{ apikey: process.env.REACT_APP_YANDEX_MAPS , load: "package.full"}}>
        <div className={s.wrapper_bottom}>
        <div className={s.orders_div_window}>
            <h5 className={s.orders_div_window_title}>Адреса:</h5>
            <div className={s.pick_up_points}>
                <div className={s.points_wrapper}>
                    {mock.map((elem:any, index:any)=> <div onClick={()=>setPonter(elem.geoData)} key={index} className={s.points}>
                        <div>{elem.title}</div>
                        <div>{elem.workTime}</div>
                        </div> )}
                </div>
            </div>
            <div></div>
        </div>
        <div className={s.Map_load}><Spinner className={s.SpinnerContacts} animation={'border'}></Spinner></div>
        <Map  className={s.Map}  style={{color: 'white'}} state={{center: [...pointer], zoom: 11, behaviors: ['default', 'scrollZoom']}} defaultState={{center: [...pointer], zoom: 11,  behaviors: ["default", "scrollZoom"]}} >
        
        <Clusterer
        options={{
          preset: 'islands#invertedVioletClusterIcons',
          groupByCoordinates: false,
          clusterDisableClickZoom: true,
          clusterHideIconOnBalloonOpen: false,
          geoObjectHideIconOnBalloonOpen: false,
        }}
      >
       
        {mock.map((elem:any, index:any)=> 
                <Placemark  style={{color:"red"}} key={index} properties={{
                    balloonContentBody: [
                        `
                          <div style='color: black' className={s.baloon_content}>
                              <div class="baloon_content__title">${elem.title}</div>
                              <div class="baloon-content__body">${elem.workTime}</div>
                              <div>tel: ${elem.tel} </div>
                          </div>
                          `,
                      ].join(""),
                    hintContent: `<div><div>${elem.title}</div><div>${elem.workTime}</div></div>`,
                    iconCaption : elem.title,
            }} geometry={
            elem.geoData}
            modules={[
                'geoObject.addon.balloon', 'geoObject.addon.hint'
        ]}
            />
        )} 
        </Clusterer>
        </Map>
        </div>
        </YMaps>
    </div>
  )
}
