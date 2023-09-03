import React from 'react'
import './commonStyle.scss'
import { SuccessIcon } from 'assets/icons'

const NotiBoxSuccess = ({notiText}) => {

  return (
    <div className="notiContainer">
      <div className="notiContent">{notiText}</div>
      <div className="notiImgSuccess"><SuccessIcon /></div>
    </div>
  )
}

export default NotiBoxSuccess