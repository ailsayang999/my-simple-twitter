import axios from 'axios';

const baseUrl = 'https://mighty-temple-45104-0d6672fb07d0.herokuapp.com/api/admin';


export const adminLogin = async ({ account, password }) => {
  try {
    const data  = await axios.post(`${baseUrl}/signin`, {
      account,
      password,
    });
    if (data.status === "success") {
      return data;
    } else {
      return data;
    }
  } catch (data) {
    return Promise.reject(data)
  }
};

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);


export const getUsers = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users`);
    return res.data;
  } catch (error) {
    console.error(`[Get Users failed]:`, error);
  }
};

export const getTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets`);
    return res.data;
  } catch (error) {
    console.error(`[Get Tweets failed]:`, error);
  }
};

export const deleteTweet = async (tweetId) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/tweets/${tweetId}`);
    return res.data;
  } catch (error) {
    console.error(`[Delete Tweet failed]:`, error);
  }
};
