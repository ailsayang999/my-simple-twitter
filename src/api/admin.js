import axios from 'axios';

const baseUrl = 'https://mighty-temple-45104-0d6672fb07d0.herokuapp.com/api/admin';





//不知道後端有沒有做一支測試token的api?
// export const checkPermission = async (authToken) => {
//   try {
//     const response = await axios.get(`${authURL}/test-token`, {
//       headers: {
//         Authorization: 'Bearer ' + authToken,
//       },
//     });
//     return response.data.success;
//   } catch (error) {
//     console.error(`[Check Permission Failed]:`, error);
//   }
// };

export const adminLogin = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${baseUrl}/login`, {
      account,
      password,
    });

    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    }

    return data;
  } catch (error) {
    console.error(`[AdminLogin Failed]:`, error);
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




// export const patchTodo = async (payload) => {
//   const { id, title, isDone } = payload;
//   try {
//     const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`, {
//       title,
//       isDone,
//     });

//     return res.data;
//   } catch (error) {
//     console.error('[Patch Todo Failed:', error);
//   }
// };

// export const deleteTodo = async (id) => {
//   try {
//     const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`);

//     return res.data;
//   } catch (error) {
//     console.error('[Delete Todo Failed:', error);
//   }
// };
