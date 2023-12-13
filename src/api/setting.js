import axios from "axios";

const baseUrl = "https://web-production-b188.up.railway.app/api";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

export const setting = async ({ id, name, account, email, password , checkPassword }) => {
  try {
    // console.log(`setting.js put傳入資料 id:${id}, name:${name}, account: ${account}, email:${email} password:${password} checkpassword: ${checkPassword}`)

    // api body 為 form-data 形式，資料傳入形式需要調整如下
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('account', account);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('checkPassword', checkPassword);

    const data = await axiosInstance.put(`${baseUrl}/users/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 設定Content-Type為form-data
      },
    });

    // console.log(`setting.js {data}: ${JSON.stringify(data)}`)
    return data;
  } catch (data) {
    const errorMsg = data.response.data.message
    // console.log(errorMsg)
    return Promise.reject(errorMsg)
  }
};
