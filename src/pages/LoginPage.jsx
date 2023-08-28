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

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleClick = async () => {
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    console.log('在loginPage呼叫login資訊，並傳入payload(account & password)')
    const { success } = await login({
      account,
      password,
    });
    if (success) {
      setShowNotiBoxSuccess(true)
      return;
    }
    setShowNotiBoxFail(true)
  };

  //當showNotiBox值改變時，過1s後轉回false關閉shoNotiBox並導向loginPage，並使用clearTimeout清除定時器
  useEffect(() => {
    if (isAuthenticated && showNotiBoxSuccess) {
      const timeout = setTimeout(() => {
      setShowNotiBoxSuccess(false);
      navigate('/main')
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
      {showNotiBoxSuccess && <NotiBoxSuccess notiText={"登入成功!"} />}
      {showNotiBoxFail && <NotiBoxFail notiText={"登入失敗!"} />}
      <Header entryName={"登入 Alphitter"}/>
      <InputSet 
        label={"帳號"} 
        placeholder={"請輸入帳號"} 
        value={account}
        onChange={(accountInputValue) => setAccount(accountInputValue)}
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