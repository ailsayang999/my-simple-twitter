import React from 'react'
import './commonStyle.scss'
import { WarningIcon } from 'assets/icons'

const NotiBoxWarning = ({notiText}) => {

  return (
    <div className="notiContainer">
      <div className="notiContent">{notiText}</div>
      <div className="notiImgWarning"><WarningIcon /></div>
    </div>
  )
}

export default NotiBoxWarning