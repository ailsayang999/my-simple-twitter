import React from 'react'
import './CommonStyle.scss'
import { TweetIcon, LikeIcon } from '../assets/icons/index' 

const UserCard = ({id, cover, avatar, name, account, tweetCount, likeCount, followingCount, followerCount} ) => {

  // 若Count數大於1000，以無條件捨去法，換算數量單位為k (千進位)
  tweetCount = (tweetCount > 1000) ? (`${Math.floor(tweetCount/1000)}k`) : tweetCount;
  likeCount = (likeCount > 1000) ? (`${Math.floor(likeCount/1000)}k`) : likeCount;
  followingCount = (followingCount > 1000) ? (`${Math.floor(followingCount/1000)}k`) : followingCount;
  followerCount = (followerCount > 1000) ? (`${Math.floor(followerCount/1000)}k`) : followerCount;

  return (
    <div className="userCardContainer" key={id}>
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
          <div className="post"><TweetIcon className="icon"/> {tweetCount}</div>
          <div className="like"><LikeIcon className="icon"/> {likeCount}</div>
        </div>
        <div className="followInfo">
          <div className="following"><p>{followingCount} 個</p>跟隨中</div>
          <div className="follower"><p>{followerCount} 位</p>跟隨者</div>
        </div>
      </div>
    </div>
  )
}

export default UserCard