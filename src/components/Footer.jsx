import React from 'react'
import './CommonStyle.scss'

const Footer = ({btnName, centerText, rightText1, rightText2}) => {
  return (
    <div className="footer">
      <button className="mainButton">{btnName}</button>
      <div className="outerLink">
        <div className="linkText-center">{centerText || ''}</div>
        <div className="linkText-end">
          <div className="linkText">{rightText1 || ''}</div>
          <p className={(rightText1 === undefined)? "hide" : ""} >・</p>
          <div className="linkText">{rightText2 || ''}</div>
        </div>
      </div>
    </div> 
  )
}

export default Footer