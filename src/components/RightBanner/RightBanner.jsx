import "./rightBanner.scss";
import { useState } from "react";
import fakeUserAvatar from "assets/images/fakeUserAvatar.png";

const userTopDummyData = [
  {
    id: 1,
    name: "AilsaYang",
    account: "ailsayang",
    avatar: fakeUserAvatar,
    isFollowed: true,
  },
  {
    id: 2,
    name: "PeterLu",
    account: "peterLu",
    avatar: fakeUserAvatar,
    isFollowed: true,
  },
  {
    id: 3,
    name: "AmyJohnsondsfdsf",
    account: "amyJohnson",
    avatar: fakeUserAvatar,
    isFollowed: false,
  },
];

const RecommendTopUserItems = () => {
  const [topUserArr, setTopUserArr] = useState(userTopDummyData);

  const handleFollowBtnClick = (id, isFollowed) => {
    setTopUserArr(
      topUserArr.map((personObj) => {
        if (personObj.id === id) {
          return { ...personObj, isFollowed: !isFollowed };
        } else {
          return personObj;
        }
      })
    );
  };

  return (
    <div className="recommend-top-user-items">
      {topUserArr.map(({ id, name, account, avatar, isFollowed }) => {
        return (
          <div className="userTop-item-container" id={id}>
            <div className="userTop-item">
              <div className="useTopAvatar">
                <img src={avatar} alt="avatar" />
              </div>

              <div className="userTop-name-account">
                <div className="user-top-name">{name}</div>
                <div className="user-top-account">@{account}</div>
              </div>
              <div className="follow-btn-container">
                <button
                  className={`${isFollowed ? "following-btn" : "follow-btn"}`}
                  onClick={() => handleFollowBtnClick(id, isFollowed)}
                >
                  {isFollowed ? "正在跟隨" : "跟隨"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const RightBanner = () => {
  return (
    <div className="right-banner">
      <h4 className="right-banner-title">推薦跟隨</h4>
      <RecommendTopUserItems />
    </div>
  );
};

export default RightBanner;
