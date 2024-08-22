import axios from "axios";
import { API_URL } from "../index";

const TEMP_API = "";
export default axios.create({
  baseURL: TEMP_API || API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: TEMP_API || API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
