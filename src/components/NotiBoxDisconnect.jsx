import React from 'react'
import './CommonStyle.scss'
import { DisconnectedIcon } from 'assets/icons'

const NotiBoxDisconnect = ({notiText}) => {

  return (
    <div className="notiContainer">
      <div className="notiContent">{notiText}</div>
      <div className="notiImgDisconnect"><DisconnectedIcon /></div>
    </div>
  )
}

export default NotiBoxDisconnect