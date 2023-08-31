import axios from 'axios';

const baseUrl = 'https://mighty-temple-45104-0d6672fb07d0.herokuapp.com/api';

export const register = async ({ name, account, email, password , checkPassword }) => {
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

    if (data.status ==="success") {
      console.log('Status : success!')
      return {data};
    }
    return {data};
  } catch (error) {
    console.error(`[Register Failed]:`, error);
  }
};

export const login = async ({ account, password }) => {
  try {
    const {data} = await axios.post(`${baseUrl}/users/signin`, {
      account,
      password,
    });
    
    console.log(`解構附值後取出data:${JSON.stringify(data)}`)
    const authToken = data.data.token

    if (authToken) {
      return {data};   
    }
    return {data};
  } catch (error) {
    console.error(`[Login Failed]:`, error);
  }
};


// export const checkPermission = async (authToken) => {
//   try {
//     console.log(`進入auth.js的checkPermission中`)
//     const response = await axios.get(`${baseUrl}/users/signin`, {
//       headers: {
//         Authorization: 'Bearer ' + authToken,
//       },
//     });
//     console.log(`res.data: ${JSON.stringify(response.data)}`)
//     console.log(`res.data: ${JSON.stringify(response.data.success)}`)
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
