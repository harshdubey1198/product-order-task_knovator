import axios from "axios";
import constant from "./constant";

const axiosInstance = axios.create({
  baseURL: `/api/`,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("authUser"))?.token;
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(error?.response?.data || error.message)
);

export const getProducts = async () =>
  (await axiosInstance.get("product/products")).data;

export const createProduct = async (payload) =>
  (await axiosInstance.post("product/create", payload)).data;

export const updateProduct = async (id, payload) =>
  (await axiosInstance.put(`product/update/${id}`, payload)).data;

export const deleteProduct = async (id) =>
  (await axiosInstance.delete(`product/${id}`)).data;

export const placeOrder = async (payload) =>
  (await axiosInstance.post("orders/place-order", payload)).data;

export const getOrders = async () =>
  (await axiosInstance.get("orders/get-orders")).data;

export default axiosInstance;
