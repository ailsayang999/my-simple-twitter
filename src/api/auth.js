import axios from 'axios';

const baseUrl = 'https://mighty-temple-45104-0d6672fb07d0.herokuapp.com/api';

export const register = async ({ name, account, email, password , checkPassword }) => {
  try {
    console.log('Try to get data from api /users')

    const data = await axios.post(`${baseUrl}/users`, {
      name,
      account,
      email,
      password,
      checkPassword
    });

    if (data.status ==="success") {
      console.log('Status : success!')
      return data;
    }
    return data;
  } catch (data) {
    const errorMsg = data.response.data.message
    return Promise.reject(errorMsg)
  }
};

export const login = async ({ account, password }) => {
  try {
    const data = await axios.post(`${baseUrl}/users/signin`, {
      account,
      password,
    });
    const authToken = data.data.token
    if (authToken) {
      return data;   
    }
    return data;
  } catch (data) {
    const errorMsg = data.response.data.message
    return Promise.reject(errorMsg)
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