import axios from "axios";
import constant from "./constant";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: `${constant.appBaseUrl}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (optional auth token)
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

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(error.response?.data || error.message || "Something went wrong")
);


export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("product/products");
    return response.data; 
  } catch (error) {
    return Promise.reject(error);
  }
};
export const createProduct = async (payload) => {
  const res = await axiosInstance.post("product/create", payload);
  return res.data;
};

export const updateProduct = async (id, payload) => {
  const res = await axiosInstance.put(`product/update/${id}`, payload);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(`product/delete/${id}`);
  return res.data;
};

export const placeOrder = async (orderPayload) => {
  try {
    const response = await axiosInstance.post("orders/place-order", orderPayload);
    return response.data; 
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getOrders = async () => {
  try {
    const response = await axiosInstance.get("orders/get-orders"); 
    return response.data; 
  } catch (error) {
    return Promise.reject(error);
  }
};

export default axiosInstance;
