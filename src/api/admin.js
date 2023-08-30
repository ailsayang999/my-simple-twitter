import axios from 'axios';

const baseUrl = 'https://mighty-temple-45104-0d6672fb07d0.herokuapp.com/api/admin';


export const adminLogin = async ({ account, password }) => {
  try {
    console.log(`進到admin.js 傳入資料,account:${account} password:${password}`)
    const {data}  = await axios.post(`${baseUrl}/signin`, {
      account,
      password,
    });


    console.log(`登入後台從後端signin拿回來的data:${JSON.stringify(data)}`)
    console.log(`登入後台從後端signin拿回來的authToken:${data.data.token}`)
    const authToken = data.data.token

    if (authToken) {
      localStorage.setItem('authToken', authToken);
      console.log('將authToken存入localStorage Add "success": true, "authToken": authToken  into data(最外層)!')
     
      return { "authToken": authToken, ...data };
    } else {
      console.log("AuthToken missed! Find one!")
      return data;
    }
  } catch (error) {
    console.error(`[AdminLogin Failed]:`, error);
  }
};


//先不使用checkPermission  (沒有另外做一支test-token的api)
// export const checkPermission = async (authToken) => {
//   try {
//     const response = await axios.get(`${baseUrl}/test-token`, {
//       headers: {
//         Authorization: 'Bearer ' + authToken,
//       },
//     });
//     return response.data.success;
//   } catch (error) {
//     console.error(`[Check Permission Failed]:`, error);
//   }
// };



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

export const deleteTweet = async (id) => {
  try {
    const res = await axiosInstance.del(`${baseUrl}/tweets/:${id}`);
    return res.data;
  } catch (error) {
    console.error(`[Delete Tweet failed]:`, error);
  }
};
