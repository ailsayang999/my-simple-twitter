import React from 'react'
import './CommonStyle.scss'


const InputSet = ({ type, label, value, placeholder, errorMsg, onChange }) => {
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
      <div className="inputNote">
        <div className={errorMsg === undefined ? "hide" : "errorMsg"}>{errorMsg}</div>
        <div className={"inputCounter"}>{value? `${value.length}/50` : ''}</div>
      </div>
    </div>
  )
}

export default InputSet