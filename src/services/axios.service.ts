import axios from "axios";
import { BASE_URL } from "../utils/apiConstant";
// const BASE_URL = process.env.BASE_URL as string;
// console.log("BASE_URL", BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const errHandling = (error: Error) => Promise.reject(error);

const reqHandling = async (config: any) => {
  const obj = { ...config };
  const token = localStorage.getItem("token");
  if (token) obj.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
  return obj;
};

const resHandling = (response: any) => response;
axiosInstance.interceptors.request.use(reqHandling, errHandling);
axiosInstance.interceptors.response.use(resHandling, errHandling);

export default axiosInstance;
