import React from 'react'
import './CommonStyle.scss'
import { FailIcon } from 'assets/icons'
import { deleteTweet } from '../api/admin';

const TweetCard = ({authorId, tweetId, avatar, name, account, description, time}) => {

  const timeDiff = (time) => {
    const currentDate = new Date();
    const createdAtDate = new Date(time);

    const timeDifference = currentDate - createdAtDate + (8 * 60 * 60 * 1000); //補回+8 timezone
    const minsDifference = Math.floor(timeDifference / (60 * 1000)); 
    const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000)); 
    const yearsDifference = Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000));

    if (minsDifference < 60) {
      let newTime = `${Math.floor(timeDifference / (60 * 1000))} min`
      return newTime
    } else if (daysDifference < 1) {
      let newTime = `${Math.floor(timeDifference / (60 * 60 * 1000))} h`
      return newTime
    } else if (daysDifference < 30) {
      let newTime = `${daysDifference} d`;
      return newTime
    } else if (daysDifference < 365) {
      const month = String(createdAtDate.getMonth() + 1).padStart(2, '0');
      const day = String(createdAtDate.getDate()).padStart(2, '0');
      let newTime = `${month}-${day}`;
      return newTime
    } else {
      let newTime = `${yearsDifference} y`;
      return newTime
    }
    
  }

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
            <div className="timer">{timeDiff(time)}</div>
          </div>
          <button className="deleteBtn" onClick={()=>handleClick(tweetId)}><FailIcon fill={"#696974"} /></button>
        </div>
        <div className="tweetContext" >{description}</div>
      </div>
    </div>
  )
}

export default TweetCard