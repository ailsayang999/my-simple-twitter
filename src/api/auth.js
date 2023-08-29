import axios from 'axios';

const baseUrl = 'https://mighty-temple-45104-0d6672fb07d0.herokuapp.com/api';

export const register = async ({ name, account, email, password , checkPassword }) => {
  console.log( `Go into register auth.js name:${name}, account:${account} email: ${email} password:${password} checkPassword:${checkPassword}`)
  try {
    console.log('Try to get data from api /users')

    const { data } = await axios.post(`${baseUrl}/users`, {
      name,
      account,
      email,
      password,
      checkPassword
    });

    console.log(`使用Payload傳入資料後，拿到的data做JSON.stringify後的data:${JSON.stringify(data)}`)
    const { status } = data;

    console.log('Get into API We did it!!!!')
    console.log(`status: ${status}`)
    console.log(`解構賦值後獲得的data:${data} status:${status}`)

    if (status ==="success") {
      console.log('Status : success!')
       console.log(`${JSON.stringify({"success":true, ...data})}`);
       return data;
    }
    return data;
  } catch (error) {
    console.error(`[Register Failed]:`, error);
  }
};

export const login = async ({ account, password }) => {
  console.log(`進到login拿資料,account:${account} password:${password}`)
  try {
    const { data } = await axios.post(`${baseUrl}/users/signin`, {
      account,
      password,
    });
    console.log(`解構賦值拿出data中的data，做JSON.stringify後的data:${data}, Json:${JSON.stringify(data)}`)
    
    const authToken = data.data.token
    console.log(`取出data中的token值，改命名為authToken:${authToken}`)

    if (authToken) {
      console.log('AuthToken get! Add "success": true , "authToken":authToken into data(最外層)!')
      return { success: true, authToken:authToken, ...data };   
    }
    console.log(`auth.js中的login通過authToken驗證 success 後拿到data做JSON.stringify後的data: ${JSON.stringify(data)}`)
    return data;
  } catch (error) {
    console.error(`[Login Failed]:`, error);
  }
};

//有要驗證token嗎?
export const checkPermission = async (authToken) => {
  try {
    console.log(`進入auth.js的checkPermission中`)
    const response = await axios.get(`${baseUrl}/users/signin`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    console.log(`res.data: ${JSON.stringify(response.data)}`)
    console.log(`res.data: ${JSON.stringify(response.data.success)}`)
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
