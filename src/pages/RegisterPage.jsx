import React from 'react';
import './RegisterPage.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from 'components/Header'
import InputSet from 'components/InputSet'
import NotiBoxSuccess from 'components/NotiBoxSuccess' //請自行輸入notiText - 登入成功! 
import NotiBoxFail from 'components/NotiBoxFail' //請自行輸入notiText - 登入失敗! / 帳號不存在!

const RegisterPage = () => {
  const [useraccount, setUseraccount] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  function handleClick() {
    console.log('登入')
  }


  // input 條件 輸入資料驗證：密碼長度5-20字的英數，account 長度1-20字的英數，name 為長度不超過50字的英數（頭尾空白去除）

  return (
    <div className="outerContainer">
      <div className="notificationBox"></div>
      <Header entryName={"建立你的帳號"}/>
       
      <InputSet 
        label={"帳號"} 
        placeholder={"請輸入帳號"} 
        value={useraccount}
        onChange={(accountInputValue) => setUseraccount(accountInputValue)}
        // errorMsg={errorMsg}
        /> 
      <InputSet 
        label={"名稱"} 
        placeholder={"請輸入使用者名稱"} 
        value={username}
        onChange={(nameInputValue) => setUsername(nameInputValue)}
        // errorMsg={errorMsg}
        />
      <InputSet 
        label={"Email"} 
        placeholder={"請輸入Email"} 
        type="email"
        value={email}
        onChange={(emailInputValue) => setEmail(emailInputValue)}
        // errorMsg={errorMsg}
        />
      <InputSet 
        label={"密碼"} 
        placeholder={"請設定密碼"} 
        value={password}
        onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        // errorMsg={errorMsg}
        />  
      <InputSet 
        label={"密碼確認"} 
        placeholder={"請再次輸入密碼"} 
        value={passwordCheck}
        onChange={(passwordCheckInputValue) => setPasswordCheck(passwordCheckInputValue)}
        // errorMsg={errorMsg}
        />   
      <div className="footer">
        <button className="mainButton" onClick={handleClick}>註冊</button>
        <Link to="/login">
          <div className="linkText">取消</div>
        </Link>
      </div>
      
    </div>
  )
}

export default RegisterPage