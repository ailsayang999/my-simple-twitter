import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "components/Header";
import InputSet from "components/InputSet";
import NotiBoxSuccess from "components/NotiBoxSuccess"; //請自行輸入notiText - 註冊成功!
import NotiBoxFail from "components/NotiBoxFail"; //請自行輸入notiText - 註冊失敗! / 帳號不存在! / 重複註冊...
import { useAuth } from "context/AuthContext";
// import { useUserInfo } from "context/UserInfoContext";
import { getUserInfo } from "api/tweets";
import UserInfoContext from "context/UserInfoContext";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showNotiBoxSuccess, setShowNotiBoxSuccess] = useState(false);
  const [showNotiBoxFail, setShowNotiBoxFail] = useState(false);
  const { setUserInfo } = useContext(UserInfoContext);

  const navigate = useNavigate();
  const { login, isAuthenticated, currentMember } = useAuth();
  // const { setUserInfo } = useUserInfo();

  const handleClick = async () => {
    if (account.length === 0) {
      console.log("帳號為必填");
      return;
    }
    if (password.length === 0) {
      console.log("密碼為必填");
      return;
    }
    console.log("在loginPage呼叫login資訊，並傳入payload(account & password)");
    const { success, message } = await login({
      account,
      password,
    });
    if (success) {
      console.log(`註冊成功!${message}`);
      setShowNotiBoxSuccess(true);
      ////////處理userInfo//////
      const localStorageUserInfoString = localStorage.getItem("userInfo"); //拿下來會是一比string的資料
      //先把user的所有object值存到userInfo這個state
      const LocalStorageUserInfo = JSON.parse(localStorageUserInfoString); // 要把這個string變成object
      const userInfoId = LocalStorageUserInfo.id; //再從這個object拿到登入者的id
      console.log("userInfoId", userInfoId);
      const backendUserInfo = await getUserInfo(userInfoId);
      console.log("backendUserInfo", backendUserInfo);
      //在login的瞬間就更新userInfo state，之後在UserInfoContext都可以拿到userInfo的值
      setUserInfo(backendUserInfo);

      return;
    }
    console.log(`註冊失敗!${message}`);
    setShowNotiBoxFail(true);
  };

  //當showNotiBox值改變時，過1s後轉回false關閉shoNotiBox並導向loginPage，並使用clearTimeout清除定時器
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
    <div className="outerContainer">
      {showNotiBoxSuccess && <NotiBoxSuccess notiText={"登入成功!"} />}
      {showNotiBoxFail && <NotiBoxFail notiText={"登入失敗!"} />}
      <Header entryName={"登入 Alphitter"} />
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

// errorMsg func 尚未設定
