// import axios from "axios";

// const baseUrl = "https://todo-list.alphacamp.io/api";

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

 