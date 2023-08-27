import React from 'react';
import './RegisterPage.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'components/Header'
import InputSet from 'components/InputSet'
// import NotiBoxSuccess from 'components/NotiBoxSuccess' //請自行輸入notiText - 登入成功! 
// import NotiBoxFail from 'components/NotiBoxFail' //請自行輸入notiText - 登入失敗! / 帳號不存在!
// import { register } from '../api/auth'
import { useAuth } from 'context/AuthContext';

const RegisterPage = () => {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  

  const handleClick = async () => {
    if (name.length === 0) {
      return;
    }
    if (account.length === 0) {
      return;
    }
    if (email.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    const { status } = await register({
      name,
      account,
      email,
      password,
      checkPassword
    });
    if (status === "success") {
      // localStorage.setItem('authToken', authToken);
      console.log('登入成功!')
      navigate('/login')
      return;
    }
    console.log('登入失敗!')
  };


  return (
    <div className="outerContainer">
      <div className="notificationBox"></div>
      <Header entryName={"建立你的帳號"}/>
       
      <InputSet 
        label={"帳號"} 
        placeholder={"請輸入帳號"} 
        value={account}
        onChange={(accountInputValue) => setAccount(accountInputValue)}
        // errorMsg={errorMsg}
        /> 
      <InputSet 
        label={"名稱"} 
        placeholder={"請輸入使用者名稱"} 
        value={name}
        onChange={(nameInputValue) => setName(nameInputValue)}
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
        value={checkPassword}
        onChange={(checkPasswordInputValue) => setCheckPassword(checkPasswordInputValue)}
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