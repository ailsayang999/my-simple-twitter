import React from 'react'
import './CommonStyle.scss'
import { AClogo } from '../assets/icons';

const Header = ({entryName}) => {
  return (
    <div className="formContainerHeader">
      <div>
        <AClogo />
      </div>
      <h3>{entryName}</h3>
    </div>
  )
}

export default Header