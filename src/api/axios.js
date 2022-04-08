import axios from "axios";
import { APPLICATION_JSON } from "../constants/contentTypes";
const { REACT_APP_BASE_URL } = process.env;

export const axiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

export const privateAxiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    "Content-Type": APPLICATION_JSON,
  },
  withCredentials: true,
});
