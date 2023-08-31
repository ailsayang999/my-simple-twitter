import React from 'react';
import './RegisterPage.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'components/Header'
import InputSet from 'components/InputSet'
import NotiBoxSuccess from 'components/NotiBoxSuccess' //請自行輸入notiText - 註冊成功! 
import NotiBoxFail from 'components/NotiBoxFail' //請自行輸入notiText - 註冊失敗! / 帳號不存在! / 重複註冊...
import { useAuth } from 'context/AuthContext';

const RegisterPage = () => {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [showNotiBoxSuccess, setShowNotiBoxSuccess] = useState(false);
  const [showNotiBoxFail, setShowNotiBoxFail] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const { register } = useAuth();

  

  const handleClick = async () => {
    if (account.length === 0) {
      console.log('帳號為必填')
      return;
    }
    if (account.length > 20) {
      console.log('帳號長度應小於20字')
      return;
    }
    if (account.value === "root") {
      console.log('此帳號不存在!')
      return;
    }
    if (name.length > 50) {
      console.log('名稱長度應小於50字')
      return;
    }
    if (email.length === 0) {
      console.log('Email為必填')
      return;
    }
    if (password.length === 0) {
      console.log('密碼為必填')
      return;
    }
    if (password.length < 5 || password.length > 20) {
      console.log('請設定5~20字英數字密碼!')
      return;
    }
    if (password !== checkPassword) {
      console.log('密碼不相符，請重新確認!') //需要再製作errorMsg在InputSet中
      return;
    }
    if (name.length === 0) {
      setName(account) ;
     console.log('未設定名稱，預設使用 name = account!預設使用 name = account!')
    }
    const { data } = await register({
      name,
      account,
      email,
      password,
      checkPassword
    });
    if (data.status === "success") {
      console.log(`註冊成功!`)
      setShowNotiBoxSuccess(true)
      return;
    } 
    console.log(`註冊失敗!${data.message}`)
    setErrorMsg(data.message)
    setShowNotiBoxFail(true)
  };
      
  //當showNotiBox值改變時，過1s後轉回false關閉shoNotiBox並導向loginPage，並使用clearTimeout清除定時器
  useEffect(() => {
    if (showNotiBoxSuccess) {
      const timeout = setTimeout(() => {
        setShowNotiBoxSuccess(false);
        navigate('/login')
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [showNotiBoxSuccess, navigate]);

  useEffect(() => {
  if (showNotiBoxFail) {
    const timeout = setTimeout(() => {
      setShowNotiBoxFail(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }
  }, [showNotiBoxFail]);

  return (
    <div className="registerOuterContainer">
      {showNotiBoxSuccess && <NotiBoxSuccess notiText={"註冊成功!"} />}
      {showNotiBoxFail && <NotiBoxFail notiText={errorMsg? errorMsg:"註冊失敗!"} />}
      <Header entryName={"建立你的帳號"}/>
       
      <InputSet 
        item={"前台帳號"}
        label={"帳號"} 
        placeholder={"請輸入20字以內帳號"} 
        value={account}
        onChange={(accountInputValue) => setAccount(accountInputValue)}
        // errorMsg={errorMsg}
        maxLength ="20"
        required
        /> 
      <InputSet 
        label={"名稱"} 
        placeholder={"請輸入使用者名稱(50字以內)"} 
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
        required
        />
      <InputSet 
        type={"password"}
        label={"密碼"} 
        placeholder={"請設定5~20字密碼"} 
        value={password}
        pattern={"[0-9a-zA-Z]+"}
        onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        // errorMsg={errorMsg}
        maxLength ="20"
        required
        />  
      <InputSet 
        type={"password"}
        label={"密碼確認"} 
        placeholder={"請再次輸入密碼"} 
        value={checkPassword}
        onChange={(checkPasswordInputValue) => setCheckPassword(checkPasswordInputValue)}
        // errorMsg={errorMsg}
        maxLength ="20"
        required
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