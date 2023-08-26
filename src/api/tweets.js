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

// get /api/tweets 取得所有貼文
//前台allTweetsDummyData
import userSelfAvatar from "assets/images/fakeUserAvatar.png"
import userOtherAvatar from "assets/images/fakeUserOtherAvatar.png";
import userOtherInfoCover from "assets/images/fakeUserOtherCover.png";

export const allTweetsDummyData = [
  {
    id: 3,
    author: {
      id: 21,
      account: "Ailsa",
      name: "ailsa",
      avatar: userOtherAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userOtherAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userSelfAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userSelfAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userOtherAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userSelfAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userOtherAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userSelfAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
    likeCount: 6,
    replyCount: 1,
    isLiked: true,
    createdAt: "2023-08-19T15:35:14.000Z",
  },
];

/////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////// postTweet /////////////////////////////////////////////////

// export const postTweet = async (payload) => {
//   const { description, userId, createdAt } = payload;

//   try {
//     const res = await axiosInstance.post(`${baseUrl}/tweets`, {
//       description,
//       userId,
//       createdAt,
//     });
//     return res.data;
//   } catch (error) {
//     console.error("[Post Tweet failed]: ", error);
//   }
// };

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


// get /api/tweets/:tweet_id/replies 取得某一則貼文的所有留言
export const replyItemsDummyData = [
  {
    replyId: 31,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: userOtherAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 32,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: userOtherAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 33,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: userOtherAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 34,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: userOtherAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 35,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: userOtherAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 36,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: userOtherAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
];

// get api/users/:id 取得特定使用者資料

export const getUserInformation = [
  {
    id: 1,
    userName: "Peter",
    tweetAmount: 45,
    userAvatar: userOtherAvatar,
    userCover: userOtherInfoCover,
  },
];
// get /api/users/:id/tweets 查看特定使用者的推文 UserSelfPage tweet
export const getUserSelfTweetsDummyData = [
  {
    id: 3,
    author: {
      id: 21,
      account: "Ailsa",
      name: "ailsa",
      avatar: userSelfAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userSelfAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userSelfAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userSelfAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userSelfAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userSelfAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userSelfAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userSelfAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
    likeCount: 6,
    replyCount: 1,
    isLiked: true,
    createdAt: "2023-08-19T15:35:14.000Z",
  },
];

// get /api/users/:id/replied_tweets 查看特定使用者回應過的推文 UserSelfPage reply
export const getUserSelfReplyItemsDummyData = [
  {
    replyId: 31,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: userSelfAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 32,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: userSelfAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 33,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: userSelfAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 34,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: userSelfAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 35,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: userSelfAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
  {
    replyId: 36,
    comment: "It's so melting hot outside!!!!!",
    replierName: "Jennifer",
    replierAvatar: userSelfAvatar,
    replierAccount: "user1",
    tweetBelongerAccount: "Ailsa",
    createdAt: "12小時",
  },
];

// get /api/users/:id/likes 查看特定使用者喜歡過的推文
export const getUserSelfLikeItemsDummyData = [
  {
    id: 3,
    author: {
      id: 21,
      account: "Ailsa",
      name: "ailsa",
      avatar: userOtherAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userOtherAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userOtherAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userOtherAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userOtherAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userOtherAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userOtherAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
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
      avatar: userOtherAvatar,
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dol.",
    likeCount: 6,
    replyCount: 1,
    isLiked: true,
    createdAt: "2023-08-19T15:35:14.000Z",
  },
];

// get /api/users/:id/followers 查看特定使用者的粉絲
export const followerDummyData = [
  {
    id: 1,
    name: "Ailsa Yang",
    avatar: userOtherAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 2,
    name: "Peter Lu",
    avatar: userOtherAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 3,
    name: "Amy Johnson",
    avatar: userOtherAvatar,
    isFollowed: false,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 4,
    name: "Amy Johnson",
    avatar: userOtherAvatar,
    isFollowed: false,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 5,
    name: "Amy Johnson",
    avatar: userOtherAvatar,
    isFollowed: false,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 6,
    name: "Amy Johnson",
    avatar: userOtherAvatar,
    isFollowed: false,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 7,
    name: "Amy Johnson",
    avatar: userOtherAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
];
// get /api/users/:id/followings 查看特定使用者追蹤的人
export const followingDummyData = [
  {
    id: 1,
    name: "Ailsa Yang",
    avatar: userOtherAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 2,
    name: "Peter Lu",
    avatar: userOtherAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 3,
    name: "Amy Johnson",
    avatar: userOtherAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 4,
    name: "Amy Johnson",
    avatar: userOtherAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
  {
    id: 5,
    name: "Amy Johnson",
    avatar: userOtherAvatar,
    isFollowed: true,
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore repudiandae",
  },
];
