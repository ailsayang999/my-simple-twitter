import React from 'react';
import './registerPage.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'components/Header'
import InputSet from 'components/InputSet'
import NotiBoxSuccess from 'components/NotiBoxSuccess' 
import NotiBoxFail from 'components/NotiBoxFail'
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
      setShowNotiBoxFail(true)
      setErrorMsg('帳號為必填')
      return;
    }
    if (account.length > 20) {
      setShowNotiBoxFail(true)
      setErrorMsg('帳號長度應小於20字')
      return;
    }
    if (account.value === "root") {
      setShowNotiBoxFail(true)
      setErrorMsg('此帳號不存在!')
      return;
    }
    if (name.length > 50) {
      setShowNotiBoxFail(true)
      setErrorMsg('名稱長度應小於50字')
      return;
    }
    if (email.length === 0) {
      setShowNotiBoxFail(true)
      setErrorMsg('Email為必填')
      return;
    }
    if (password.length === 0) {
      setShowNotiBoxFail(true)
      setErrorMsg('密碼為必填')
      return;
    }
    if (password.length < 5 || password.length > 20) {
      setShowNotiBoxFail(true)
      setErrorMsg('請設定5~20字英數字密碼!')
      return;
    }
    if (password !== checkPassword) {
      setShowNotiBoxFail(true)
      setErrorMsg('密碼不相符，請重新確認!') 
      return;
    }
    if (name.length === 0) {
      setName(account) ;
    }
    try {
      const {data} = await register({
      name,
      account,
      email,
      password,
      checkPassword
      });
      if (data.status === "success") {
        // console.log(`註冊成功!`)
        setShowNotiBoxSuccess(true)
        return;
      } 
    } catch(errorMsg) {
      setShowNotiBoxFail(true)
      setErrorMsg(errorMsg) 
      return;
    }
    
  };
 
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
      {showNotiBoxFail && <NotiBoxFail notiText={errorMsg} />}
      <Header entryName={"建立你的帳號"}/>
       
      <InputSet 
        item={"前台帳號"}
        label={"帳號"} 
        placeholder={"請輸入20字以內帳號"} 
        value={account}
        maxLength={20}
        onChange={(accountInputValue) => setAccount(accountInputValue)}
        /> 
      <InputSet 
        label={"名稱"} 
        placeholder={"請輸入使用者名稱(50字以內)"} 
        value={name}
        maxLength={50}
        onChange={(nameInputValue) => setName(nameInputValue)}
        />
      <InputSet 
        label={"Email"} 
        placeholder={"請輸入Email"} 
        type="email"
        value={email}
        onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      <InputSet 
        type={"password"}
        label={"密碼"} 
        placeholder={"請設定5~20字密碼"} 
        value={password}
        maxLength={20}
        onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />  
      <InputSet 
        type={"password"}
        label={"密碼確認"} 
        placeholder={"請再次輸入密碼"} 
        value={checkPassword}
        maxLength={20}
        onChange={(checkPasswordInputValue) => setCheckPassword(checkPasswordInputValue)}
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