import React from 'react'
import './CommonStyle.scss'
import { TweetIcon, LikeIcon } from '../assets/icons/index' 

const UserCard = ({id, cover, avatar, name, account, tweetCount, likeCount, following, follower} ) => {

  // 以無條件捨去法，換算數量單位為k (千進位)
  tweetCount = Math.floor(tweetCount/1000);
  likeCount = Math.floor(likeCount/1000);

  return (
    <div className="userCardContainer">
      <div className="userCard" id={id}>
        <div className="bgImg">
          <img className="bgCover" src={cover} alt="BGCover"></img>
        </div>
        <div className="userImg">
          <img className="userAvatar" src={avatar} alt="UserAvatar"></img>
        </div>
        <div className="userInfo">
          <div className="userName">{name}</div>
          <div className="userAccount">@{account}</div>
        </div>
        <div className="tweetInfo">
          <div className="post"><TweetIcon className="icon"/> {tweetCount}k</div>
          <div className="like"><LikeIcon className="icon"/> {likeCount}k</div>
        </div>
        <div className="followInfo">
          <div className="following"><p>{following} 個</p>跟隨中</div>
          <div className="follower"><p>{follower} 位</p>跟隨者</div>
        </div>
      </div>
    </div>
  )
}

export default UserCard