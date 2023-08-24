import React from 'react'
import './CommonStyle.scss'
import { FailIcon } from 'assets/icons'

const TweetCard = () => {
  return (
    <div className="tweetContainer">
      <div className="leftSideAvatar">
        <img src={require('../assets/images/fakeUserOtherAvatar.png')} alt="Avatar" />
      </div>
      <div className="rightSideBox">
        <div className="upper">
          <div className="userName">User Name</div>
          <div className="userInfo">
            <div className="userAccount">@user Account</div>
            <p>．</p>
            <div className="timer">3 小時</div>
          </div>
          <button className="deleteBtn"><FailIcon/></button>
        </div>
        <div className="tweetContext">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
      </div>
    </div>
  )
}

export default TweetCard