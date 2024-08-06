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
  updateOne: async (id, data, accessToken) => {
    return await axios.patch(`${API_ENDPOINTS.UPDATE}/${id}`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  deleteOne: async (id, accessToken) => {
    return await axios.delete(`${API_ENDPOINTS.DELETE}/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default studentApi;
