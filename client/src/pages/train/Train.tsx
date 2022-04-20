
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Provider } from 'react-redux'
import store from '../../Redux/Saga/saga'

import s from '../scss/train/Train.module.scss'
import { New } from './pages/New'





export const Train = () => {
 

   
  
  return (
    <div className={s.main}>
        <div className={s.crap}>
          <Provider store={store}>
            <New />
          </Provider>
      
      </div>
    </div>
    
  )
}
export default Train

