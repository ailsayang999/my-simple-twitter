import "./rightBanner.scss";
import { useEffect, useState } from "react";
import fakeUserAvatar from "assets/images/fakeUserAvatar.png";
import { getTop10, postFollowShip, deleteFollowShip } from "api/tweets";

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

const RecommendTopUserItems = ({ topUserArr, handleFollowBtnClick }) => {
  return (
    <div className="recommend-top-user-items">
      {topUserArr.map(({ id, name, account, avatar, isFollowed }) => {
        return (
          <div className="userTop-item-container" id={id}>
            <div className="userTop-item">
              <div className="user-top-avatar-container">
                <img src={avatar} alt="" className="top10-avatar" />
              </div>

              <div className="userTop-name-account">
                <div className="user-top-name">{name}</div>
                <div className="user-top-account">@{account}</div>
              </div>
              <div className="follow-btn-container">
                <button
                  className={`${isFollowed ? "following-btn" : "follow-btn"}`}
                  onClick={() => {handleFollowBtnClick(id, isFollowed)}}
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
  const [topUserArr, setTopUserArr] = useState(userTopDummyData);

  useEffect(() => {
    console.log("execute right banner function in useEffect");
    const getTop10Async = async () => {
      try {
        const backendTop10 = await getTop10();
        console.log(backendTop10);

        setTopUserArr(backendTop10.top10UsersWithFollowStatus);
      } catch (error) {
        console.error(error);
      }
    };
    getTop10Async();
  }, []);

  ////////////////////////////////////////////////// 追蹤和取消追蹤功能 //////////////////////////////////////////////////

  const handleFollowBtnClick = async (id, isFollowed) => {
    console.log("follow id", id);
    const followPayload = {
      id: id,
    };
    console.log("followPayload", followPayload);
    console.log("isFollow", isFollowed);

    // 想追蹤某個top ten user
    if (isFollowed === false) {
      const res = await postFollowShip(followPayload);
      console.log("後端傳來postFollowShip的結果", res);
      //如果有追蹤成功的話就：
      if (res) {
        if (res.data.status === "success") {
          setTopUserArr(
            topUserArr.map((personObj) => {
              if (personObj.followerId === id) {
                return { ...personObj, isFollowed: true };
              } else {
                return personObj;
              }
            })
          );
          alert("追蹤成功");
        }
        if (res.data.status === "error") {
          alert(res.data.message);
          alert("你已追蹤過這個帳戶");
        }
      }
    }
    // 想取消追蹤這個top ten user
    if (isFollowed === true) {
      const res = await deleteFollowShip(id);
      if (res) {
        if (res.data.status === "success") {
          setTopUserArr(
            topUserArr.map((personObj) => {
              if (personObj.followerId === id) {
                return { ...personObj, isFollowed: false };
              } else {
                return personObj;
              }
            })
          );
          alert("取消追蹤成功");
        }
        if (res.data.status === "error") {
          alert(res.data.message);
          alert("你還沒追蹤這個帳戶");
        }
      }
    }
  };

  return (
    <div className="right-banner">
      <h4 className="right-banner-title">推薦跟隨</h4>
      <RecommendTopUserItems
        topUserArr={topUserArr}
        handleFollowBtnClick={handleFollowBtnClick}
      />
    </div>
  );
};

export default RightBanner;
