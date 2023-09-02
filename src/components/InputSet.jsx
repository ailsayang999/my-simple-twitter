import React from 'react'
// import { useState } from 'react'
import './CommonStyle.scss'


const InputSet = ({ item, type, label, value, placeholder, maxLength, onChange }) => {
  let errorType = "";
  let errorMsg = "";
  // const [inputValue, setInputValue] = useState(value || '');
  // const [isValid, setIsValid] = useState(true);

  // 各種 error 判斷條件產出errorType 及對應的 errorMsg
  if(label === "帳號" && (value.length > 20)) {
    errorType = "error";
    errorMsg = "帳號不可超過20字";
  } else if(label === "名稱" && (value.length > 50)) {
    errorType = "error";
    errorMsg = "字數超出上限!";
  } else if (item === "前台帳號" && value === "root" ) {
    errorType = "error";
    errorMsg = "此帳號不存在!";
  } else if (label === "密碼" && value.length !== 0 && ((value.length < 5) || (value.length > 20))) {
    errorType = "error";
    errorMsg = "密碼長度至少5字，但不超過20字!";
  } 

  //根據不同 errorType 改變底線顏色
  const BottomLine = ({errorType}) => {
    if (errorType === "error") {
      return(<div className="inputBottomLineError"></div>)
    } else if (errorType === "disabled") {
      return(<div className="inputBottomLineDisabled"></div>)
    } else {
      return(<div className="inputBottomLine"></div>)
    }
  }

  // const HandleChange = (e) => {
  //   const newValue = e.target.value;
  //   setInputValue(newValue);

  //   const pattern = /^[0-9a-zA-Z]+$/;
  //   const isInputValid = pattern.test(newValue);
  //   setIsValid(isInputValid);

  //   if (isInputValid) {
  //     console.log("Valid Input!");
  //     if (onChange) {
  //       onChange(newValue); // 調用外部的 onChange 回調函數
  //     }
  //   } else {
  //     console.log("Invalid Input!");
  //   }
  // };

  return (
    <div className="inputContainer">
      <form className="inputContent">
        <label className="inputLabel">{label}</label>
        <input className="inputField"
          item={item || label}
          type={type || 'text'}
          value={value || ''}
          maxLength={maxLength || "50"}
          placeholder={placeholder || ''}
          onChange={(e) => onChange?.(e.target.value.trim())}
        ></input>
      </form>
      <BottomLine errorType={errorType||''}/>
      <div className="inputNote">
        <div className={errorMsg === undefined ? "hide" : "errorMsg"}>{errorMsg}</div>
        <div className={"inputCounter"}>{value? `${value.length}/50` : ''}</div>
      </div>
    </div>
  )
}

export default InputSet