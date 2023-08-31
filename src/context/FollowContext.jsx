import { createContext, useState } from "react";
import { postFollowShip, deleteFollowShip, getTop10 } from "api/tweets";

const FollowContext = createContext("");

function FollowContextProvider({ children }) {
  const dummyFollower = [
    {
      followerId: 5,
      followingId: 2,
      createdAt: "2023-08-28T07:25:10.000Z",
      updatedAt: "2023-08-28T07:25:10.000Z",
      isFollowed: false,
      follower: {
        id: 5,
        name: "User4",
        email: "user4@example.com",
        account: "user4",
        introduction:
          "Asperiores fugiat ratione dolor aperiam. Nesciunt cupiditate omnis consequuntur mollitia. Vitae non rerum beatae aut odit illum consequatur repudiandae est. Rei",
        avatar:
          "https://loremflickr.com/320/240/man/?random=23.513182113941646",
        cover:
          "https://loremflickr.com/1440/480/city/?random=12.66073706759907",
        role: "user",
        createdAt: "2023-08-28T07:25:03.000Z",
        updatedAt: "2023-08-28T07:25:03.000Z",
      },
    },
  ];
  const dummyFollowing = [
    {
      followerId: 2,
      followingId: 16,
      createdAt: "2023-08-30T15:57:23.000Z",
      updatedAt: "2023-08-30T15:57:23.000Z",
      isFollowed: false,
      following: {
        id: 16,
        name: "User15",
        email: "user15@example.com",
        account: "user15",
        introduction:
          "Dolor ea pariatur nemo enim eaque eveniet explicabo.\nQuo debitis sed quidem sit velit quis ad quo aut.\nEt assumenda praesentium voluptatem sapiente facilis qui.",
        avatar: "https://loremflickr.com/320/240/man/?random=91.99711765606024",
        cover:
          "https://loremflickr.com/1440/480/city/?random=70.42234398086744",
        role: "user",
        createdAt: "2023-08-28T07:25:03.000Z",
        updatedAt: "2023-08-28T07:25:03.000Z",
      },
    },
  ];
  const userTopDummyData = [
    {
      id: 1,
      account: "user14",
      name: "User14",
      avatar: "https://loremflickr.com/320/240/man/?random=27.946851311382748",
      totalFollowers: 5,
      isFollowed: true,
    },
  ];
  const [follower, setFollower] = useState(dummyFollower);
  const [following, setFollowing] = useState(dummyFollowing);
  const [topUserArr, setTopUserArr] = useState(userTopDummyData);

  const handleFollowBtnClick = async (id, isFollowed) => {
    console.log("follow id", id);
    const followPayload = {
      id: id,
    };
    console.log("followPayload", followPayload);
    console.log("isFollow", isFollowed);

    // 想追蹤某個user
    if (isFollowed === false) {
      const res = await postFollowShip(followPayload);
      console.log("後端傳來postFollowShip的結果", res.data.status);
      //如果有追蹤成功的話就：
      if (res) {
        if (res.data.status === "success") {
          setTopUserArr(
            topUserArr.map((personObj) => {
              if (personObj.id === id) {
                return { ...personObj, isFollowed: true };
              } else {
                return personObj;
              }
            })
          );
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

          //更新
          alert("追蹤成功");
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
          setTopUserArr(
            topUserArr.map((personObj) => {
              if (personObj.id === id) {
                return { ...personObj, isFollowed: false };
              } else {
                return personObj;
              }
            })
          );
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
          alert("取消追蹤成功");
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
  };

  return (
    <FollowContext.Provider value={FollowContextValueToShare}>
      {children}
    </FollowContext.Provider>
  );
}

export { FollowContextProvider };
export default FollowContext;
