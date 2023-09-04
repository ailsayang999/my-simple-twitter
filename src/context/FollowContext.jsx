import { createContext, useState, useContext } from "react";
import { postFollowShip, deleteFollowShip } from "api/tweets";
import {
  getUserSelfFollower,
  getUserSelfFollowing,
  getUserInfo,
} from "api/tweets";
import UserInfoContext from "context/UserInfoContext";

const FollowContext = createContext("");

function FollowContextProvider({ children }) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [topUserArr, setTopUserArr] = useState([]);
  const [userOtherFollower, setUserOtherFollower] = useState([]);
  const [userOtherFollowing, setUserOtherFollowing] = useState([]);
  const [userOtherInfo, setUserOtherInfo] = useState([]); //在每一頁的useEffect中會去向後端請求登入者的object資料

  const handleFollowBtnClick = async (id, isFollowed) => {
    const localStorageUserObjectString = localStorage.getItem("userInfo");
    // 然後在把他變成object，讓header做渲染
    const userInfoObject = JSON.parse(localStorageUserObjectString);
    if (id === userInfoObject.id) {
      alert("不可以追隨自己");
      return;
    }
    // console.log("follow id", id);
    const followPayload = {
      id: id,
    };
    // console.log("followPayload", followPayload);
    // console.log("isFollow", isFollowed);

    // 想追蹤某個user
    if (isFollowed === false) {
      const res = await postFollowShip(followPayload);
      //如果有追蹤成功的話就：
      if (res) {
        if (res.data.status === "success") {
          //更新
          alert("追蹤成功");
          setTopUserArr(
            topUserArr.map((personObj) => {
              if (personObj.id === id) {
                return { ...personObj, isFollowed: true };
              } else {
                return personObj;
              }
            })
          );
          //userOtherPage裡面的isFollowed也要跟著改
          setUserOtherInfo({
            ...userOtherInfo,
            isFollowed: true,
            followerCount: userOtherInfo.followerCount + 1,
          });
          setFollower(
            follower.map((personObj) => {
              if (personObj.followerId === id) {
                return { ...personObj, isFollowed: true };
              } else {
                return personObj;
              }
            })
          );
          setFollowing(
            following.map((personObj) => {
              if (personObj.followingId === id) {
                return { ...personObj, isFollowed: true };
              } else {
                return personObj;
              }
            })
          );
          setUserOtherFollower(
            userOtherFollower.map((personObj) => {
              if (personObj.followerId === id) {
                return { ...personObj, isFollowed: true };
              } else {
                return personObj;
              }
            })
          );
          setUserOtherFollowing(
            userOtherFollowing.map((personObj) => {
              if (personObj.followingId === id) {
                return { ...personObj, isFollowed: true };
              } else {
                return personObj;
              }
            })
          );
          //更新使用者個追隨中的數字
          const userInfoObjectNew = await getUserInfo(userInfoObject.id);
          localStorage.setItem(
            "UserInfoObjectString",
            JSON.stringify(userInfoObjectNew)
          );
          if (userInfoObjectNew) {
            // console.log("userInfoObjectNew", userInfoObjectNew);
            setUserInfo(userInfoObjectNew);
          }
        }
        if (res.data.status === "error") {
          alert(res.data.message);
          alert("你已追蹤過這個帳戶");
        }
      }
    }
    // 想取消追蹤這個user
    if (isFollowed === true) {
      const res = await deleteFollowShip(id);
      if (res) {
        if (res.data.status === "success") {
          alert("取消追蹤成功");
          setTopUserArr(
            topUserArr.map((personObj) => {
              if (personObj.id === id) {
                return { ...personObj, isFollowed: false };
              } else {
                return personObj;
              }
            })
          );
          setUserOtherInfo({
            ...userOtherInfo,
            isFollowed: false,
            followerCount: userOtherInfo.followerCount - 1,
          });
          setFollower(
            follower.map((personObj) => {
              if (personObj.followerId === id) {
                return { ...personObj, isFollowed: false };
              } else {
                return personObj;
              }
            })
          );
          setFollowing(
            following.map((personObj) => {
              if (personObj.followingId === id) {
                return { ...personObj, isFollowed: false };
              } else {
                return personObj;
              }
            })
          );
          setUserOtherFollower(
            userOtherFollower.map((personObj) => {
              if (personObj.followerId === id) {
                return { ...personObj, isFollowed: false };
              } else {
                return personObj;
              }
            })
          );
          setUserOtherFollowing(
            userOtherFollowing.map((personObj) => {
              if (personObj.followingId === id) {
                return { ...personObj, isFollowed: false };
              } else {
                return personObj;
              }
            })
          );
          //更新使用者個追隨中的數字
          const userInfoObjectNew = await getUserInfo(userInfoObject.id);
          localStorage.setItem(
            "UserInfoObjectString",
            JSON.stringify(userInfoObjectNew)
          );
          if (userInfoObjectNew) {
            // console.log("userInfoObjectNew", userInfoObjectNew);
            setUserInfo(userInfoObjectNew);
          }
        }
        if (res.data.status === "error") {
          alert(res.data.message);
          alert("你還沒追蹤這個帳戶");
        }
      }
    }
  };

  const FollowContextValueToShare = {
    follower,
    setFollower,
    following,
    setFollowing,
    handleFollowBtnClick,
    topUserArr,
    setTopUserArr,
    userOtherFollower,
    setUserOtherFollower,
    userOtherFollowing,
    setUserOtherFollowing,
    userOtherInfo,
    setUserOtherInfo,
  };

  return (
    <FollowContext.Provider value={FollowContextValueToShare}>
      {children}
    </FollowContext.Provider>
  );
}

export { FollowContextProvider };
export default FollowContext;
