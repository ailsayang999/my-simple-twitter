import React, { useState } from "react";
import "./userSelfFellowPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import NavigationContext from "context/NavigationContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import followerAvatar from "assets/images/fakeUserOtherAvatar.png";

const followerDummyData = [
  {
    id: 1,
    name: "Ailsa Yang",
    avatar: followerAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 2,
    name: "Peter Lu",
    avatar: followerAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 3,
    name: "Amy Johnson",
    avatar: followerAvatar,
    isFollowed: false,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 4,
    name: "Amy Johnson",
    avatar: followerAvatar,
    isFollowed: false,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 5,
    name: "Amy Johnson",
    avatar: followerAvatar,
    isFollowed: false,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 6,
    name: "Amy Johnson",
    avatar: followerAvatar,
    isFollowed: false,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 7,
    name: "Amy Johnson",
    avatar: followerAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
];

const followingDummyData = [
  {
    id: 1,
    name: "Ailsa Yang",
    avatar: followerAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 2,
    name: "Peter Lu",
    avatar: followerAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 3,
    name: "Amy Johnson",
    avatar: followerAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 4,
    name: "Amy Johnson",
    avatar: followerAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 5,
    name: "Amy Johnson",
    avatar: followerAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
];


const FollowerContent = ({ followerArray, handleFollowBtnClick }) => {
  return (
    <>
      {followerArray.map(({ id, name, avatar, isFollowed, intro }) => {
        return (
          <div className="follower-item-container" key={id}>
            <div className="follower-content">
              <div className="follower-avatar-container">
                <img src={avatar} alt="" className="follower-avatar" />
              </div>

              <div className="follower-name-follow-btn-intro">
                <div className="follower-name-btn-container">
                  <div className="follower-name">{name}</div>

                  <button
                    className={`${isFollowed ? "following-btn" : "follow-btn"}`}
                    onClick={() => handleFollowBtnClick(id, isFollowed)}
                  >
                    {isFollowed ? "正在跟隨" : "跟隨"}
                  </button>
                </div>
                <div className="follower-intro">{intro}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const FollowingContent = ({ followingDummyData }) => {
  return (
    <>
      {followingDummyData.map(({ id, name, avatar, isFollowed, intro }) => {
        return (
          <div className="follower-item-container" key={id}>
            <div className="follower-content">
              <div className="follower-avatar-container">
                <img src={avatar} alt="" className="follower-avatar" />
              </div>

              <div className="follower-name-follow-btn-intro">
                <div className="follower-name-btn-container">
                  <div className="follower-name">{name}</div>

                  <button
                    className={`${isFollowed ? "following-btn" : "follow-btn"}`}
                  >
                    {isFollowed ? "正在跟隨" : "跟隨"}
                  </button>
                </div>
                <div className="follower-intro">{intro}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};


const UserSelfFellowPageInfo = () => {
  const navigate = useNavigate();
  const handleBackArrowClick = () => {
    navigate("/user/self");
  };

  // 從Context中拿取setFollowContent的function
  const { followContent, handleFollowingClick, handleFollowerClick } =
    useContext(NavigationContext);
  console.log(followContent);

  const [followerArray, setFollowerArray] = useState(followerDummyData);

  const handleFollowBtnClick = (id, isFollowed) => {
    setFollowerArray(
      followerArray.map((personObj) => {
        if (personObj.id === id) {
          return { ...personObj, isFollowed: !isFollowed };
        } else {
          return personObj;
        }
      })
    );
  };

  return (
    <div className="user-self-follow-page-info">
      {/* 以下header UserSelfPage, UserOtherPage UserSelfFollowPage, UserOtherFollowPage 可以重複使用 */}
      <div className="header-container">
        <BackArrowIcon
          className="back-arrow-icon"
          onClick={handleBackArrowClick}
        />

        <div className="name-tweet-amount-container">
          <h5 className="header-title-user-self-name">{"Ailsa Yang"}</h5>
          <div className="tweet-amount">
            25 <span className="tweet-amount-text">推文</span>
          </div>
        </div>
      </div>
      {/* user-self-follower-following-like-navigator */}
      <div className="user-self-follow-follower-following-navigator">
        <button
          className={`user-self-follower ${
            followContent === "follower" ? "follow-navigate-active" : ""
          }`}
          value="follower"
          onClick={(e) => {
            handleFollowerClick(e.target.value);
          }}
        >
          追隨者
        </button>
        <button
          className={`user-self-following ${
            followContent === "following" ? "follow-navigate-active" : ""
          }`}
          value="following"
          onClick={(e) => handleFollowingClick(e.target.value)}
        >
          正在追隨
        </button>
      </div>

      {followContent === "follower" && (
        <FollowerContent
          followerArray={followerArray}
          handleFollowBtnClick={handleFollowBtnClick}
        />
      )}

      {/* Render Follower */}
      {followContent === "following" && (
        <FollowingContent followingDummyData={followingDummyData} />
      )}

      {/* Render Following */}
    </div>
  );
};

export default UserSelfFellowPageInfo;
