import axios from 'axios';

const baseUrl = 'https://mighty-temple-45104-0d6672fb07d0.herokuapp.com/api/admin';


export const adminLogin = async ({ account, password }) => {
  console.log(`進到adminLogin拿資料,account:${account} password:${password}`)
  try {
    const { data } = await axios.post(`${baseUrl}/login`, {
      account,
      password,
    });
    console.log('把data轉換成authToken')
    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    }
    console.log(`admin.js中的adminLogin通過驗證 success 後拿到data資料: ${data}`)
    return data;
  } catch (error) {
    console.error(`[AdminLogin Failed]:`, error);
  }
};

//有要驗證token嗎?
export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${baseUrl}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data.success;
  } catch (error) {
    console.error(`[Check Permission Failed]:`, error);
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
    console.log(res.data)
    console.log(res.data.data.id)
    return res.data.data;
  } catch (error) {
    console.error(`[Get Users failed]:`, error);
  }
};

export const getTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets`);
    console.log(res.data)
    console.log(res.data.id)
    return res.data;
  } catch (error) {
    console.error(`[Get Tweets failed]:`, error);
  }
};

export const deleteTweet = async (id) => {
  try {
    const res = await axiosInstance.del(`${baseUrl}/tweets/:${id}`);
    console.log(res.data)
    console.log(res.data.data.id)
    return res.data.data;
  } catch (error) {
    console.error(`[Delete Tweet failed]:`, error);
  }
};
