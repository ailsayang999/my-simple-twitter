import React from 'react'
import './adminPage.scss'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'components/Header'
import InputSet from 'components/InputSet'
import { useAdminAuth } from 'context/AdminAuthContext';
import NotiBoxSuccess  from '../components/NotiBoxSuccess';
import NotiBoxFail from '../components/NotiBoxFail';

const AdminPage = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showNotiBoxSuccess, setShowNotiBoxSuccess] = useState(false);
  const [showNotiBoxFail, setShowNotiBoxFail] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const { adminLogin, isAuthenticated} = useAdminAuth();

  const handleClick = async() => {
    if (account.length === 0) {
      setShowNotiBoxFail(true)
      setErrorMsg('帳號為必填!')
      return;
    }
    if (password.length === 0) {
      setShowNotiBoxFail(true)
      setErrorMsg('密碼為必填!')
      return;
    }
    try {
      const {data} = await adminLogin({
        account,
        password
      });
      if (data) {
        setShowNotiBoxSuccess(true)
        return; 
      } else {
        setShowNotiBoxFail(true)
        return
      }
    } catch(data) {
      const errorMsg = data.response.data.message
      setShowNotiBoxFail(true)
      setErrorMsg(errorMsg)
    }
    
  }

  useEffect(() => {
  if (isAuthenticated && showNotiBoxSuccess) {
    const timeout = setTimeout(() => {
    setShowNotiBoxSuccess(false);
    navigate('/admin_main')
    }, 1000);

    return () => clearTimeout(timeout);
  }
  }, [navigate, isAuthenticated, showNotiBoxSuccess]);

  useEffect(() => {
  if (showNotiBoxFail) {
    const timeout = setTimeout(() => {
      setShowNotiBoxFail(false);
      setErrorMsg('');
    }, 1000);
    navigate('/admin')
    return () => clearTimeout(timeout);
  }
  }, [navigate, errorMsg, showNotiBoxFail]);
  
  return (
    <div className="adminOuterContainer">
      {showNotiBoxSuccess && <NotiBoxSuccess notiText={"後台登入成功!"} />}
      {showNotiBoxFail && <NotiBoxFail notiText={errorMsg} />}
      <Header entryName={"後台登入"}/>
      <InputSet 
        item={"後台帳號"}
        label={"帳號"} 
        placeholder={"請輸入帳號"} 
        value={account}
        onChange={(nameInputValue) => setAccount(nameInputValue)}
        maxLength={"20"}
        />  
      <InputSet 
        type={"password"}
        label={"密碼"} 
        placeholder={"請輸入密碼"} 
        value={password}
        onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        // errorMsg={errorMsg}
        maxLength={"20"}
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

