import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'components/Header'
import InputSet from 'components/InputSet'
// import NotiBoxSuccess from 'components/NotiBoxSuccess' //請自行輸入notiText - 登入成功! 
// import NotiBoxFail from 'components/NotiBoxFail' //請自行輸入notiText - 登入失敗! / 帳號不存在!
import { useAuth } from 'context/AuthContext';

const LoginPage = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  // function handleClick() {
  //   console.log('登入')
  // }
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth(); // 取出需要的狀態與方法

  const handleClick = async () => {
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    const { success } = await login({
      account,
      password,
    });
    if (success) {
      // localStorage.setItem('authToken', authToken);
      console.log('登入成功!')
      // navigate('/todo');
      return;
    }
    console.log('登入失敗!')
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/main');
  //   }
  // }, [navigate, isAuthenticated]);

  return (
    <div className="outerContainer">
      <div className="notificationBox"></div>
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