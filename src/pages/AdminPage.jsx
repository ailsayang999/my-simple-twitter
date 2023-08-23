import React from 'react'
import './AdminPage.scss'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'components/Header'
import InputSet from 'components/InputSet'

const AdminPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleClick() {
    console.log('後台登入')
  }


  return (
    <div className="outerContainer">
      <div className="notificationBox"></div>
      <Header entryName={"後台登入"}/>
      <InputSet 
        label={"帳號"} 
        placeholder={"請輸入帳號"} 
        value={username}
        onChange={(nameInputValue) => setUsername(nameInputValue)}
        // errorMsg={errorMsg}
        />  
      <InputSet 
        label={"密碼"} 
        placeholder={"請輸入密碼"} 
        value={password}
        onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        // errorMsg={errorMsg}
        />  
      <div className="footer">
        <button className="mainButton" onClick={handleClick}>登入</button>
        <div className="linkText">
          <Link to="/login">
            <div className="linkText">前台登入</div>
          </Link>
        </div>
      </div>
      
    </div>
  )
}

export default AdminPage