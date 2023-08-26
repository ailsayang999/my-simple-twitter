import React from 'react'
import './CommonStyle.scss'
import { FailIcon } from 'assets/icons'

const TweetCard = () => {
  return (
    <div className="tweetContainer">
      <div className="leftSideAvatar">
        <img src={require("../assets/images/fakeUserOtherAvatar.png")} alt="Avatar" />
      </div>
      <div className="rightSideBox">
        <div className="upper">
          <div className="userName">User Name1User Name1User Name1User Name1User Name1</div>
          <div className="userInfo">
            <div className="userAccount">@user userAccountrrrr</div>
            <p>．</p>
            <div className="timer">2 hours</div>
          </div>
          <button className="deleteBtn"><FailIcon fill={"#696974"} /></button>
        </div>
        <div className="tweetContext">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus rerum aut velit nihil eligendi in. Impedit animi dolor corrupti illo sit saepe molestiae perspiciatis perferendis explicabo inventore! Recusandae, consectetur doloribus. Velit quidem ratione repellendus, odit nemo distinctio suscipit consequuntur doloremque eveniet sint mollitia exercitationem doloribus reiciendis alias, amet quaerat blanditiis!</div>
      </div>
    </div>
  )
}

export default TweetCard