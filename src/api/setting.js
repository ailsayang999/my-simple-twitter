import axios from "axios";

const baseUrl = "https://mighty-temple-45104-0d6672fb07d0.herokuapp.com/api";

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
    const res = await axiosInstance.put(`${baseUrl}/users/${id}`,{
      id: id,
      name: name,
      account: account,
      email: email,
      password: password,
      checkPassword: checkPassword
    });
    return res.data;
  } catch (error) {
    console.error("[Get User Information failed]: ", error);
  }
};

// 成功格式
// {
//     "status": "success",
//     "message": "Successfully update user.",
//     "data": {
//         "id": 12,
//         "name": "iameva",
//         "email": "user11@example.com",
//         "password": "$2b$10$Oan1kN3RB.WXkgneHEwAueQ6GvPKtDsA/vQXidJ9.zgTR6eQU.flG",
//         "account": "user11",
//         "introduction": "Tempore ab aut ea similique. Voluptatem et accusamus. Voluptas dolores necessitatibus repellat nesciunt commodi. Praesentium beatae magni quaerat sint. Voluptat",
//         "avatar": "https://loremflickr.com/320/240/man/?random=45.590225528693026",
//         "cover": "https://loremflickr.com/1440/480/city/?random=96.2668188582015",
//         "role": "user",
//         "createdAt": "2023-08-31T09:24:43.000Z",
//         "updatedAt": "2023-08-31T15:17:38.000Z"
//     }
// }

// 失敗格式
// {
//     "status": "error",
//     "message": "Error: Cannot edit other users profile"
// }