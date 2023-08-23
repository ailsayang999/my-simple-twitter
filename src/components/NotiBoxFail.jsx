import React from 'react'
import './CommonStyle.scss'
import { FailIcon } from 'assets/icons'

const NotiBoxFail = ({notiText}) => {

  return (
    <div className="notiContainer">
      <div className="notiContent">{notiText}</div>
      <div className="notiImgFail"><FailIcon /></div>
    </div>
  )
}

export default NotiBoxFail