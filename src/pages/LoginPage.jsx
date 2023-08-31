import './LoginPage.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'components/Header'
import InputSet from 'components/InputSet'
import NotiBoxSuccess from 'components/NotiBoxSuccess' //請自行輸入notiText - 註冊成功! 
import NotiBoxFail from 'components/NotiBoxFail' //請自行輸入notiText - 註冊失敗! / 帳號不存在! / 重複註冊...
import { useAuth } from 'context/AuthContext';

const LoginPage = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showNotiBoxSuccess, setShowNotiBoxSuccess] = useState(false);
  const [showNotiBoxFail, setShowNotiBoxFail] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const { login, isAuthenticated, currentMember } = useAuth();


  const handleClick = async () => {
    if (account.length === 0) {
      console.log('帳號為必填')
      return;
    }
    if (password.length === 0) {
      console.log('密碼為必填')
      return;
    }

    const {data} = await login({
      account,
      password,
    });
    if (data.status === "success") {
      console.log(`註冊成功!`)
      setShowNotiBoxSuccess(true)
      return;
    } 
    console.log(`註冊失敗!message: ${data.message}`)
    setErrorMsg(data.message)
    setShowNotiBoxFail(true)
  };

  useEffect(() => {
    if (isAuthenticated && showNotiBoxSuccess) {
      const timeout = setTimeout(() => {
      setShowNotiBoxSuccess(false);
      navigate('/main')
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [navigate, isAuthenticated, showNotiBoxSuccess, currentMember]);

  useEffect(() => {
  if (showNotiBoxFail) {
    const timeout = setTimeout(() => {
      setShowNotiBoxFail(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }
  }, [showNotiBoxFail]);

  return (
    <div className="loginOuterContainer">
      {showNotiBoxSuccess && <NotiBoxSuccess notiText={"登入成功!"} />}
      {showNotiBoxFail && <NotiBoxFail notiText={errorMsg? errorMsg:"登入失敗"} />}
      <Header entryName={"登入 Alphitter"}/>
      <InputSet 
        label={"帳號"} 
        placeholder={"請輸入帳號"} 
        value={account}
        onChange={(accountInputValue) => setAccount(accountInputValue)}
        // errorMsg={errorMsg}
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
        <div className="linkText-end">
          <Link to="/register">
            <div className="linkText">註冊</div>
          </Link>
          <p>・</p>
          <Link to="/admin">
            <div className="linkText">後台登入</div>
          </Link>
        </div>
      </div>
      
    </div>
  )
}
export default LoginPage

// errorMsg func 尚未設定