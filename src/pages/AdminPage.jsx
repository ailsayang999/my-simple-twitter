import React from 'react'
import './AdminPage.scss'
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

  const navigate = useNavigate();

  const { adminLogin, isAuthenticated} = useAdminAuth();

  const handleClick = async() => {
    console.log("點擊後台登入")
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    console.log(`傳入account:${account}, password:${password}資料至adminLogin拿資料`)
    const {success} = await adminLogin({
      account,
      password
    });
    if (success) {
      setShowNotiBoxSuccess(true)
      console.log('登入成功!')
      return; 
    } else {
      console.log('登入失敗!')
      setShowNotiBoxFail(true)
    }
  }

  useEffect(() => {
  if (isAuthenticated && showNotiBoxSuccess) {
    const timeout = setTimeout(() => {
    setShowNotiBoxSuccess(false);
    // navigate('/admin_main')
    }, 1500);

    return () => clearTimeout(timeout);
  }
  }, [navigate, isAuthenticated, showNotiBoxSuccess]);

  useEffect(() => {
  if (showNotiBoxFail) {
    const timeout = setTimeout(() => {
      setShowNotiBoxFail(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }
  }, [showNotiBoxFail]);
  
  return (
    <div className="outerContainer">
      {showNotiBoxSuccess && <NotiBoxSuccess notiText={"後台登入成功!"} />}
      {showNotiBoxFail && <NotiBoxFail notiText={"後台登入失敗!"} />}
      <Header entryName={"後台登入"}/>
      <InputSet 
        label={"帳號"} 
        placeholder={"請輸入帳號"} 
        value={account}
        onChange={(nameInputValue) => setAccount(nameInputValue)}
        />  
      <InputSet 
        type={"password"}
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


// 管理者可從專門的後台登入頁面進入網站後台

// 管理者帳號不可登入前台，詳見【角色權限】單元說明
// 若使用管理帳號登入前台，或使用一般使用者帳號登入後台，等同於「帳號不存在」