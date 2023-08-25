import React from 'react';
import './CommonStyle.scss';
import { AClogo, HomeIcon, UserIcon, LogOutIcon} from '../assets/icons'



const LeftNavAdmin = () => {
  return (
    <div className="leftSideContainer">
      <div className="upperContainer">
        <div className="logoContainer">
          <AClogo className="logo"/>
        </div>
        <div className="navContainer">
          <div className="navItem">
            <HomeIcon className="navIcon" />
            <div className="navText">推文清單</div>
          </div>
          <div className="navItem">
            <UserIcon className="navIcon" />
            <div className="navText">使用者列表</div>
          </div>
        </div>
        
      </div>
      <div className="logout">
        <LogOutIcon className="logoutIcon"/>
        <div className="logoutText">登出</div>
      </div>
    </div>
  )
}

export default LeftNavAdmin