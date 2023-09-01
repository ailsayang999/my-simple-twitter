import React from 'react'
import './CommonStyle.scss'
import { FailIcon } from 'assets/icons'
import { deleteTweet } from '../api/admin';

const TweetCard = ({authorId, tweetId, avatar, name, account, description, time}) => {

  const handleClick = async (tweetId) => {
    try {
      const data = await deleteTweet(tweetId);
      console.log(`${data.message}`)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="tweetContainer">
      <div className="leftSideAvatar" authorId={authorId}>
        <img src={avatar} alt="Avatar" />
      </div>
      <div className="rightSideBox">
        <div className="upper">
          <div className="userName">{name}</div>
          <div className="userInfo">
            <div className="userAccount">{'@'+account}</div>
            <p>．</p>
            <div className="timer">{time}</div>
          </div>
          <button className="deleteBtn" onClick={()=>handleClick(tweetId)}><FailIcon fill={"#696974"} /></button>
        </div>
        <div className="tweetContext" >{description}</div>
      </div>
    </div>
  )
}

export default TweetCard