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
    console.log('把login的data(account、password)轉換成authToken')
    const { authToken } = data;

    if (authToken) {
      console.log('Add success: true into data!')
      return { success: true, ...data };   
    }
    console.log(`auth.js中的login通過authToken驗證 success 後拿到data資料: ${data}`)
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
