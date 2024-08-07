import { API_ENDPOINTS } from "..";
import axios from "../../../config/axios";

const studentApi = {
  fetchPagination: async (data, accessToken, signal) => {
    return await axios
      .get(API_ENDPOINTS.STUDENTS.GET_ALL, {
        params: {
          page: data.page + 1,
          take: data.pageSize,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
      })
      .then((response) => response.data);
  },
  addOne: async (data, accessToken) => {
    return await axios.post(API_ENDPOINTS.STUDENTS.ADD, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  updateOne: async (id, data, accessToken) => {
    return await axios.patch(`${API_ENDPOINTS.STUDENTS.UPDATE}/${id}`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  deleteOne: async (id, accessToken) => {
    return await axios.delete(`${API_ENDPOINTS.STUDENTS.DELETE}/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  uploadFile: async (formData, accessToken) => {
    return await axios.post(API_ENDPOINTS.STUDENTS.UPLOAD, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default studentApi;
