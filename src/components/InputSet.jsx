import React from 'react'
import './CommonStyle.scss'


const InputSet = ({ type, label, value, placeholder, onChange }) => {
  let errorType = "";
  let errorMsg = "";


  // 各種 error 判斷條件產出errorType 及對應的 errorMsg
  if(label === "帳號" && (value.length > 20)) {
    errorType = "error";
    errorMsg = "帳號不可超過20字";
  } else if(label === "名稱" && (value.length > 50)) {
    errorType = "error";
    errorMsg = "字數超出上限!";
  // } else if (label === "帳號"   ) {
  //   errorType = "error";
  //   errorMsg = "此帳號不存在!";
  // } else if (label === "Email"  ) {
  //   errorType = "error";
  //   errorMsg = "此Email不存在!";
  // } else if (label === "密碼"  ) {
  //   errorType = "error";
  //   errorMsg = "密碼錯誤!";
  // } else if (label === "密碼" && label === "密碼確認") {
  //   errorType = "error";
  //   errorMsg = "密碼不相同!";
  }


  const BottomLine = ({errorType}) => {
    if (errorType === "error") {
      return(<div className="inputBottomLineError"></div>)
    } else if (errorType === "disabled") {
      return(<div className="inputBottomLineDisabled"></div>)
    } else {
      return(<div className="inputBottomLine"></div>)
    }
  }


  return (
    <div className="inputContainer">
      <div className="inputContent">
        <label className="inputLabel">{label}</label>
        <input className="inputField"
          type={type || 'text'}
          value={value || ''}
          placeholder={placeholder || ''}
          onChange={(e) => onChange?.(e.target.value) }
        ></input>
      </div>
      <BottomLine errorType={errorType||''}/>
      <div className="inputNote">
        <div className={errorMsg === undefined ? "hide" : "errorMsg"}>{errorMsg}</div>
        <div className={"inputCounter"}>{value? `${value.length}/50` : ''}</div>
      </div>
    </div>
  )
}

export default InputSet