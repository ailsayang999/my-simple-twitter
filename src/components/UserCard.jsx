import React from 'react'
import './CommonStyle.scss'
import { TweetIcon, LikeIcon } from '../assets/icons/index' 

const UserCard = ( ) => {
  return (
    <div className="userCardContainer">
      <div className="userCard">
        <div className="bgImg">
          <img className="bgCover" src={require("../assets/images/fakeUserCover.png")} alt="BGCover"></img>
        </div>
        <div className="userImg">
          <img className="userAvatar" src={require("../assets/images/fakeUserAvatar.png")} alt="UserAvatar"></img>
        </div>
        <div className="userInfo">
          <div className="userName">John Doe</div>
          <div className="userAccount">@heyJohn</div>
        </div>
        <div className="tweetInfo">
          <div className="post"><TweetIcon className="icon"/> 1.5k</div>
          <div className="like"><LikeIcon className="icon"/> 20k</div>
        </div>
        <div className="followInfo">
          <div className="following"><p>34 個</p>跟隨中</div>
          <div className="follower"><p>59 位</p>跟隨者</div>
        </div>
      </div>
    </div>
  )
}

export default UserCard