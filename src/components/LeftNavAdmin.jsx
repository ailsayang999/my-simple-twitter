import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CommonStyle.scss';
import { AClogo, HomeIcon, HomeIconActive, UserIcon, UserIconActive, LogOutIcon} from '../assets/icons'




const LeftNavAdmin = () => {
  const [homeActive, setHomeActive] = useState(true)
  const [userListActive, setUserListActive] = useState(false)
  const location = useLocation()


  const handleHomeClick = () => {
    // 若在'/admin_main'，即使點擊後也不切換Active狀態(不改變顏色)
    if (location.pathname !== '/admin_main') {
      return setHomeActive(!homeActive)
    }
  }

  const handleUserClick = () => {
    // 若在'/admin_users'，即使點擊後也不切換Active狀態(不改變顏色)
    if (location.pathname !== '/admin_users') {
      return setUserListActive(!userListActive)
    }
 
  }


  return (
    <div className="leftSideContainer">
      <div className="upperContainer">
        <div className="logoContainer">
           <AClogo className="logo"/>
        </div>
        <div className="navContainer">
          {/* 路徑是admin_main不跳轉 */}
          <Link to={(location.pathname === '/admin_main' )? '':'/admin_main'}> 
            <div className="navItem" onClick={handleHomeClick}>
              <div className="navIcon">{(homeActive)? <HomeIconActive/> : <HomeIcon/> }</div>
              <div className={(homeActive)? "navTextActive" : "navText"}>推文清單</div>
            </div>
          </Link>
          {/* 路徑是admin_users不跳轉 */}
          <Link to={(location.pathname === '/admin_users' )? '':'/admin_users'}>
            <div className="navItem" onClick={handleUserClick}>
              <div className="navIcon">{(userListActive)? <UserIconActive/> : <UserIcon/> }</div>
              <div className={(userListActive)? "navTextActive" : "navText"}>使用者列表</div>
            </div>
          </Link>
        </div>
        
      </div>
      <div>
        <Link to="/admin" className="logout">
          <LogOutIcon className="logoutIcon"/>
          <div className="logoutText">登出</div>
        </Link>
      </div>
    </div>
  )
}

export default LeftNavAdmin