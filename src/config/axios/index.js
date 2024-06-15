import axios from "axios";
// import { API_URL } from "..";
const TEMP_API = "https://epm-be-dev.f-code.tech";
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
