import axios from 'axios';

const baseUrl = 'https://mighty-temple-45104-0d6672fb07d0.herokuapp.com/api/admin';


export const adminLogin = async ({ account, password }) => {
  try {
    console.log(`進到admin.js 傳入資料,account:${account} password:${password}`)
    const { data } = await axios.post(`${baseUrl}/login`, {
      account,
      password,
    });

    const authToken = data.data.token
    console.log(`取出data中的token值，改命名為authToken:${authToken}`)

    if (authToken) {
      console.log('AuthToken get! Add "success": true, "authToken": authToken  into data(最外層)!')
      return { success: true, authToken: authToken, ...data };
    }
    console.log(`auth.js中的login通過authToken驗證 success 後拿到data做JSON.stringify後的data: ${JSON.stringify(data)}`)
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
