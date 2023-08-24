// import axios from "axios";

// const baseUrl = "https://mighty-temple-45104-0d6672fb07d0.herokuapp.com/api";

// const axiosInstance = axios.create({
//   baseURL: baseUrl,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error(error);
//   }
// );

///////////////////////////////////////////////// getTweets /////////////////////////////////////////////////

// 拿到所有的 tweets
// export const getTweets = async () => {
//   try {
//     const res = await axiosInstance.get(`${baseUrl}/tweets`);
//     return res.data.data;
//   } catch (error) {
//     console.error("[Get Tweets failed]: ", error);
//   }
// };

///////////////////////////////////////////////// getTweets /////////////////////////////////////////////////

  //前台allTweetsDummyData
  import otherAvatar from "assets/images/fakeUserOtherAvatar.png";
  export const allTweetsDummyData = [
    {
      id: 1,
      author: {
        id: 21,
        account: "Ailsa",
        name: "ailsa",
        avatar: otherAvatar,
      },
      description: "This is my First Post!!!!!",
      likeCount: 6,
      replyCount: 1,
      isLiked: true,
      createdAt: "2023-08-19T15:35:14.000Z",
    },
    {
      id: 2,
      author: {
        id: 21,
        account: "Ailsa",
        name: "ailsa",
        avatar: otherAvatar,
      },
      description: "This is my First Post!!!!!",
      likeCount: 6,
      replyCount: 1,
      isLiked: true,
      createdAt: "2023-08-19T15:35:14.000Z",
    },
    {
      id: 3,
      author: {
        id: 21,
        account: "Ailsa",
        name: "ailsa",
        avatar: otherAvatar,
      },
      description: "This is my First Post!!!!!",
      likeCount: 6,
      replyCount: 1,
      isLiked: true,
      createdAt: "2023-08-19T15:35:14.000Z",
    },
    {
      id: 4,
      author: {
        id: 21,
        account: "Ailsa",
        name: "ailsa",
        avatar: otherAvatar,
      },
      description: "This is my First Post!!!!!",
      likeCount: 6,
      replyCount: 1,
      isLiked: true,
      createdAt: "2023-08-19T15:35:14.000Z",
    },
    {
      id: 5,
      author: {
        id: 21,
        account: "Ailsa",
        name: "ailsa",
        avatar: otherAvatar,
      },
      description: "This is my First Post!!!!!",
      likeCount: 6,
      replyCount: 1,
      isLiked: true,
      createdAt: "2023-08-19T15:35:14.000Z",
    },
    {
      id: 6,
      author: {
        id: 21,
        account: "Ailsa",
        name: "ailsa",
        avatar: otherAvatar,
      },
      description: "This is my First Post!!!!!",
      likeCount: 6,
      replyCount: 1,
      isLiked: true,
      createdAt: "2023-08-19T15:35:14.000Z",
    },
    {
      id: 7,
      author: {
        id: 21,
        account: "Ailsa",
        name: "ailsa",
        avatar: otherAvatar,
      },
      description: "This is my First Post!!!!!",
      likeCount: 6,
      replyCount: 1,
      isLiked: true,
      createdAt: "2023-08-19T15:35:14.000Z",
    },
    {
      id: 8,
      author: {
        id: 21,
        account: "Ailsa",
        name: "ailsa",
        avatar: otherAvatar,
      },
      description: "This is my First Post!!!!!",
      likeCount: 6,
      replyCount: 1,
      isLiked: true,
      createdAt: "2023-08-19T15:35:14.000Z",
    },
  ];


/////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////// postTweetLike ////////////////////////////////////////////////

// //把後端某篇貼文Like改為true，新增喜歡
// export const postTweetLike = async (id) => {
//   try {
//     const res = axiosInstance.post(`/tweets/${id}/like`);
//     console.log(res);
//     return res;
//   } catch (error) {
//     console.error("[Post like tweet failed]: ", error.response.data.message);
//   }
// };

// //把後端某篇貼文Like改為false，取消喜歡
// export const postTweetUnlike = async (id) => {
//   try {
//     const res = axiosInstance.post(`/tweets/${id}/unlike`);
//     console.log(res);
//     return res;
//   } catch (error) {
//     console.error("[Post unlike tweet failed]: ", error.response.data.message);
//   }
// };

//////////////////////////////////////////////////////////////////////////////////////////////

export const replyItemsDummyData = [
  {
    replyId: 31,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: otherAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 32,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: otherAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 33,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: otherAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 34,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: otherAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 35,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: otherAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 36,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: otherAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
];