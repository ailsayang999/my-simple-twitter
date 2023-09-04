import './loginPage.scss';
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from 'components/Header'
import InputSet from 'components/InputSet'
import NotiBoxSuccess from 'components/NotiBoxSuccess' 
import NotiBoxFail from 'components/NotiBoxFail'
import { useAuth } from 'context/AuthContext';

import { getUserInfo } from "api/tweets";
import UserInfoContext from "context/UserInfoContext";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showNotiBoxSuccess, setShowNotiBoxSuccess] = useState(false);
  const [showNotiBoxFail, setShowNotiBoxFail] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { setUserInfo } = useContext(UserInfoContext);

  const navigate = useNavigate();
  const { login, isAuthenticated, currentMember } = useAuth();

  const handleClick = async () => {
    if (account.length === 0) {
      setShowNotiBoxFail(true)
      setErrorMsg("帳號為必填")
      return;
    }
    if (password.length === 0) {
      setShowNotiBoxFail(true)
      setErrorMsg("密碼為必填")
      return;
    }
    try {
      const {data} = await login({
      account,
      password,
      });
      if (data.status === "success") {
        // console.log(`登入成功!`)
        setShowNotiBoxSuccess(true)
        return;
      } 
      setErrorMsg(data.message)
      setShowNotiBoxFail(true)
      

        ////////處理userInfo//////
        const localStorageUserInfoString = localStorage.getItem("userInfo"); //拿下來會是一比string的資料
        //先把user的所有object值存到userInfo這個state
        const LocalStorageUserInfo = JSON.parse(localStorageUserInfoString); // 要把這個string變成object
        const userInfoId = LocalStorageUserInfo.id; //再從這個object拿到登入者的id
        // console.log("userInfoId", userInfoId);
        const backendUserInfo = await getUserInfo(userInfoId);
        // console.log("backendUserInfo", backendUserInfo);
        //在login的瞬間就更新userInfo state，之後在UserInfoContext都可以拿到userInfo的值
        setUserInfo(backendUserInfo);

    } catch(errorMsg) {
      setShowNotiBoxFail(true)
      setErrorMsg(errorMsg)
      return
    }
    
  };

  useEffect(() => {
    if (isAuthenticated && showNotiBoxSuccess) {
      const timeout = setTimeout(() => {
        setShowNotiBoxSuccess(false);
        navigate("/main");
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
      {showNotiBoxFail && <NotiBoxFail notiText={errorMsg} />}
      <Header entryName={"登入 Alphitter"}/>
      <InputSet 
        item={"前台帳號"}
        label={"帳號"} 
        placeholder={"請輸入帳號"} 
        value={account}
        maxLength={20}
        onChange={(accountInputValue) => setAccount(accountInputValue)}
      />
      <InputSet
        type={"password"}
        label={"密碼"}
        placeholder={"請輸入密碼"}
        value={password}
        maxLength={20}
        onChange={(passwordInputValue) => setPassword(passwordInputValue)}
      />
      <div className="footer">
        <button className="mainButton" onClick={handleClick}>
          登入
        </button>
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
  );
};
export default LoginPage;

