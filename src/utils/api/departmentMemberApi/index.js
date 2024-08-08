import { API_ENDPOINTS } from "..";
import axios from "../../../config/axios";

const departmentMemberApi = {
  fetchPagination: async (data, accessToken, signal) => {
    return await axios
      .get(API_ENDPOINTS.DEPARTMENT_MEMBER.GET, {
        params: {
          page: data.page + 1,
          take: data.pageSize,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
        signal,
      })
      .then((response) => response.data);
  },
  addOne: async (data, accessToken) => {
    return await axios.post(API_ENDPOINTS.DEPARTMENT_MEMBER.ADD, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  deleteOne: async (id, accessToken) => {
    return await axios.delete(
      `${API_ENDPOINTS.DEPARTMENT_MEMBER.DELETE}/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  },
  uploadFile: async (formData, accessToken) => {
    return await axios.post(API_ENDPOINTS.DEPARTMENT_MEMBER.UPLOAD, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default departmentMemberApi;
