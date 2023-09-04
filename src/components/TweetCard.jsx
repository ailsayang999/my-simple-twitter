import React from 'react'
import { useState, useEffect } from 'react'
import './commonStyle.scss'
import { FailIcon } from 'assets/icons'
import { deleteTweet } from '../api/admin';
import NotiBoxSuccess  from '../components/NotiBoxSuccess';
import NotiBoxFail from '../components/NotiBoxFail';


const TweetCard = ({authorId, tweetId, avatar, name, account, description, time}) => {
  const [showNotiBoxSuccess, setShowNotiBoxSuccess] = useState(false);
  const [showNotiBoxFail, setShowNotiBoxFail] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  

  const timeDiff = (time) => {
    const currentDate = new Date();
    const createdAtDate = new Date(time);

    const timeDifference = currentDate - createdAtDate + (8 * 60 * 60 * 1000); //補回+8 timezone
    const minsDifference = Math.floor(timeDifference / (60 * 1000)); 
    const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000)); 
    const yearsDifference = Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000));

    if (minsDifference < 60) {
      let newTime = `${Math.floor(timeDifference / (60 * 1000))} 分`
      return newTime
    } else if (daysDifference < 1) {
      let newTime = `${Math.floor(timeDifference / (60 * 60 * 1000))} 時`
      return newTime
    } else if (daysDifference < 30) {
      let newTime = `${daysDifference} 天`;
      return newTime
    } else if (daysDifference < 365) {
      const month = String(createdAtDate.getMonth() + 1).padStart(2, '0');
      const day = String(createdAtDate.getDate()).padStart(2, '0');
      let newTime = `${month}-${day}`;
      return newTime
    } else {
      let newTime = `${yearsDifference} 年`;
      return newTime
    }
  }

  const hideDescription = (description) => {
    if (description.length >= 50) {
      const newDescription = description.substring(0, 50) + '...'
      console.log(newDescription)
      return newDescription;
    }
    return description;
  }

  const handleClick = async (tweetId) => {
    try {
      const data = await deleteTweet(tweetId);
      const successMsg = data.message
      setShowNotiBoxSuccess(true)
      setSuccessMsg(successMsg)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
  if (showNotiBoxSuccess) {
    const timeout = setTimeout(() => {
    setShowNotiBoxSuccess(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }
  }, [successMsg, showNotiBoxSuccess]);

  return (
    <div className="tweetContainer">
      {showNotiBoxSuccess && <NotiBoxSuccess notiText={successMsg} />}
      {showNotiBoxFail && <NotiBoxFail notiText={"刪文失敗!"} />}
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
        <div className="tweetContext" >{hideDescription(description)}</div>
      </div>
    </div>
  )
}

export default TweetCard