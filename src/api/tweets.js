// DummyData
import userSelfAvatar from "assets/images/fakeUserAvatar.png";
import userOtherAvatar from "assets/images/fakeUserOtherAvatar.png";
import userOtherInfoCover from "assets/images/fakeUserOtherCover.png";

// 串切開始
import axios from "axios";

const baseUrl = "https://mighty-temple-45104-0d6672fb07d0.herokuapp.com/api";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

///////////////////////////////////////////////// getUserInfo /////////////////////////////////////////////////
// get /api/users/:id 取得特定使用者資料
export const getUserInfo = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}`);
    return res.data;
  } catch (error) {
    console.error("[Get User Information failed]: ", error);
  }
};

///////////////////////////////////////////////// getTweets /////////////////////////////////////////////////
// 拿到所有的 tweets
export const getTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets`);
    return res.data;
  } catch (error) {
    console.error("[Get Tweets failed]: ", error);
  }
};

export const dummyTweets = [
  {
    TweetId: 0,
    authorId: 0,
    authorAccount: "anna",
    authorName: "Anna",
    authorAvatar:
      "https://loremflickr.com/320/240/man/?random=22.488061823126504",
    description: "I am Anna",
    likeCount: 0,
    replyCount: 0,
    isLiked: false,
    createdAt: "2023-08-31T03:34:04.000Z",
  },
];

///////////////////////////////////////////////// postTweet /////////////////////////////////////////////////
export const postTweet = async (description) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets`, description);
    return res;
  } catch (error) {
    console.error("[Post Tweet failed]: ", error);
  }
};

//////////////////////////////////////////////// postTweetLike ////////////////////////////////////////////////
//把後端某篇貼文Like改為true，新增喜歡
export const postTweetLike = async (id) => {
  try {
    const res = axiosInstance.post(`/tweets/${id}/like`);
    console.log(res);
    return res;
  } catch (error) {
    console.error("[Post like tweet failed]: ", error.response.data.message);
  }
};
//////////////////////////////////////////////// postTweetUnLike ////////////////////////////////////////////////
// //把後端某篇貼文Like改為false，取消喜歡
export const postTweetUnlike = async (id) => {
  try {
    const res = axiosInstance.post(`/tweets/${id}/unlike`);
    console.log(res);
    return res;
  } catch (error) {
    console.error("[Post unlike tweet failed]: ", error.response.data.message);
  }
};


//////////////////////////////////////////////// postTweetReply ////////////////////////////////////////////////
// post /api/tweets/:tweet_id/replies 回覆某一則貼文
export const postTweetReply = async (comment, tweetId) => {
  try {
    const res = await axiosInstance.post(
      `${baseUrl}/tweets/${tweetId}/replies`,
      comment
    );
    return res;
  } catch (error) {
    console.error("[Post Tweet Reply failed]: ", error);
  }
};
//////////////////////////////////////////////// getSpecificTweet ////////////////////////////////////////////////
// get /api/tweets/:id 取得某一則貼文的資料
export const getSpecificTweet = async (specificTweetId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${specificTweetId}`);
    return res.data;
  } catch (error) {
    console.error("[Get Specific Tweet failed]: ", error);
  }
};

//////////////////////////////////////////////// getSpecificTweetReply ////////////////////////////////////////////////
// get /api/tweets/:tweet_id/replies 取得某一則貼文的所有留言
export const getSpecificTweetReply = async (specificTweetId) => {
  try {
    const res = await axiosInstance.get(
      `${baseUrl}/tweets/${specificTweetId}/replies`
    );
    return res.data;
  } catch (error) {
    console.error("[Get Specific Tweet Reply failed]: ", error);
  }
};

// get /api/users/:id/tweets 查看特定使用者的推文 UserSelfPage tweet
export const getUserSelfTweets = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}/tweets`);
    return res.data;
  } catch (error) {
    console.error("[Get User Tweet Reply failed]: ", error);
  }
};

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
export const getUserSelfReply = async (id) => {
  try {
    const res = await axiosInstance.get(
      `${baseUrl}/users/${id}/replied_tweets`
    );
    return res.data;
  } catch (error) {
    console.error("[Get User Self Reply failed]: ", error);
  }
};

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
export const getUserSelfLike = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}/likes`);
    return res.data;
  } catch (error) {
    console.error("[Get User Self Like failed]: ", error);
  }
};
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
export const getUserSelfFollower = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}/followers`);
    return res.data;
  } catch (error) {
    console.error("[Get User Follower failed]: ", error);
  }
};
export const followerDummyData = [
  {
    followerId: 5,
    followingId: 2,
    createdAt: "2023-08-28T07:25:10.000Z",
    updatedAt: "2023-08-28T07:25:10.000Z",
    isFollowed: 0,
    follower: {
      id: 5,
      name: "User4",
      email: "user4@example.com",
      account: "user4",
      introduction:
        "Asperiores fugiat ratione dolor aperiam. Nesciunt cupiditate omnis consequuntur mollitia. Vitae non rerum beatae aut odit illum consequatur repudiandae est. Rei",
      avatar: "https://loremflickr.com/320/240/man/?random=23.513182113941646",
      cover: "https://loremflickr.com/1440/480/city/?random=12.66073706759907",
      role: "user",
      createdAt: "2023-08-28T07:25:03.000Z",
      updatedAt: "2023-08-28T07:25:03.000Z",
    },
  },
];
// get /api/users/:id/followings 查看特定使用者追蹤的人
export const getUserSelfFollowing = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}/followings`);
    return res.data;
  } catch (error) {
    console.error("[Get User Following failed]: ", error);
  }
};
export const followingDummyData = [
  {
    followerId: 15,
    followingId: 3,
    createdAt: "2023-08-28T07:25:10.000Z",
    updatedAt: "2023-08-28T07:25:10.000Z",
    isFollowed: 0,
    following: {
      id: 3,
      name: "User2",
      email: "user2@example.com",
      account: "user2",
      introduction:
        "Sed quidem tempora a fuga ea porro. Ullam eum id distinctio nihil voluptas porro. Ad ea perspiciatis sunt voluptatem vitae.",
      avatar: "https://loremflickr.com/320/240/man/?random=68.61517603334588",
      cover: "https://loremflickr.com/1440/480/city/?random=30.23345850680026",
      role: "user",
      createdAt: "2023-08-28T07:25:02.000Z",
      updatedAt: "2023-08-28T07:25:02.000Z",
    },
  },
  {
    followerId: 15,
    followingId: 21,
    createdAt: "2023-08-28T07:25:10.000Z",
    updatedAt: "2023-08-28T07:25:10.000Z",
    isFollowed: 0,
    following: {
      id: 21,
      name: "User20",
      email: "user20@example.com",
      account: "user20",
      introduction:
        "Quis iure expedita id natus quo. Sunt soluta esse veritatis doloribus voluptate. Perspiciatis explicabo et. Asperiores autem iusto molestias voluptate. Ipsa del",
      avatar: "https://loremflickr.com/320/240/man/?random=66.64423864105137",
      cover: "https://loremflickr.com/1440/480/city/?random=73.5544977995281",
      role: "user",
      createdAt: "2023-08-28T07:25:03.000Z",
      updatedAt: "2023-08-28T07:25:03.000Z",
    },
  },
  {
    followerId: 15,
    followingId: 7,
    createdAt: "2023-08-28T07:25:10.000Z",
    updatedAt: "2023-08-28T07:25:10.000Z",
    isFollowed: 0,
    following: {
      id: 7,
      name: "User6",
      email: "user6@example.com",
      account: "user6",
      introduction:
        "Pariatur impedit accusamus nam odit rerum est et. Porro assumenda debitis totam rerum ut blanditiis molestiae. Neque excepturi enim consequatur sed debitis aliq",
      avatar: "https://loremflickr.com/320/240/man/?random=88.16168947945091",
      cover: "https://loremflickr.com/1440/480/city/?random=30.76582458406991",
      role: "user",
      createdAt: "2023-08-28T07:25:03.000Z",
      updatedAt: "2023-08-28T07:25:03.000Z",
    },
  },
];

// post /api/followships 追蹤指定使用者
export const postFollowShip = async (followPayload) => {
  try {
    const res = await axiosInstance.post(
      `${baseUrl}/followships`,
      followPayload
    );
    return res
  } catch (error) {
    console.error("[Post User Following failed]: ", error);
  }
};

// delete /api/followships/:following_id 取消追蹤使用者
export const deleteFollowShip = async (personNotToFollowId) => {
  try {
    const res = await axiosInstance.delete(
      `${baseUrl}/followships/${personNotToFollowId}`
    );
    return res;
  } catch (error) {
    console.error("[Delete User Following failed]: ", error);
  }
};
 
// get /api/followships/top10 取得前10位熱門使用者
export const getTop10 = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/followships/top10`);
    return res.data;
  } catch (error) {
    console.error("[Get Top10 failed]: ", error);
  }
};

