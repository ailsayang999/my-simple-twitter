import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./leftNavBar.scss";
import acLogo from "assets/icons/acLogo.svg";
import { ReactComponent as HomeIcon } from "assets/icons/homeIcon.svg";
import { ReactComponent as UserIcon } from "assets/icons/userIcon.svg";
import { ReactComponent as SettingIcon } from "assets/icons/settingIcon.svg";
import { ReactComponent as LogOutIcon } from "assets/icons/logOutIcon.svg";
import ModalContext from "context/ModalContext";

const LeftNavBar = () => {
  // 從Context中拿取togglePostModal的function
  const { togglePostModal } = useContext(ModalContext);

  const location = useLocation();
  const [url, setUrl] = useState(null);

  const navigate = useNavigate();

  //登入的話是localStorage會儲存token，那登出的話是localStorage裡的token要做移除
  const handleLogoutBtnClick = () => {
    localStorage.removeItem("authToken");
    //登出之後頁面跳轉到login頁面
    navigate("/login");
  };

  // 幫助我們偵測現在在哪的page，讓左側欄的字變橘色
  useEffect(() => {
    setUrl(location.pathname);
  }, [location, url]);

  return (
    <div className="left-nav-bar-container">
      <div className="left-nav-items">
        <div className="left-nav-item">
          <Link to="/main">
            <img src={acLogo} alt="acLogo" className="ac-logo" />
          </Link>
        </div>

        <div className="left-nav-item">
          <Link
            to="/main"
            className={
              "home-button nav-button" + (url === "/main" ? " active" : "")
            }
          >
            <HomeIcon className="icon" />
            <span className="home-text text">首頁</span>
          </Link>
        </div>

        <div className="left-nav-item">
          <Link
            to="/user/self"
            className={
              "personal-info-button nav-button" +
              (url === "/user/self" ? " active" : "")
            }
          >
            <UserIcon className="icon" />
            <span className="personal-text text">個人資料</span>
          </Link>
        </div>

        <div className="left-nav-item">
          <Link
            to="/setting"
            className={
              "setting-button nav-button" +
              (url === "/setting" ? " active" : "")
            }
          >
            <SettingIcon className="icon" />
            <span className="setting-text text">設定</span>
          </Link>
        </div>
        <button className="tweet-button" onClick={togglePostModal}>
          推文
        </button>
      </div>

      <div className="log-out-item">
        <Link to="/login">
          <div className="log-out-button" onClick={handleLogoutBtnClick}>
            <LogOutIcon className="icon" />
            <span className="log-out-text text">登出</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LeftNavBar;
