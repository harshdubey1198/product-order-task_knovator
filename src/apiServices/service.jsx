import axios from "axios";
import constant from "./constant";

const createAxiosInstance = axios.create({
  baseURL: `${constant.appBaseUrl}/api/`,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: token ? `Bearer ${token}` : null,
  },
});

const axiosInstance = axios.create({
  baseURL: `${constant.appBaseUrl}/api/`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("authUser"))?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data || "Something went wrong")
);
// will define the structure for api's below

export default axiosInstance;


