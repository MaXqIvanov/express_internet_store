
import React from 'react'
import { Navigation } from './Navigation'

export const Header = (props:any) => {
  return (
    <div className='Header'>
        <Navigation setTypeGoods={props.setTypeGoods}/>
    </div>
  )
}
