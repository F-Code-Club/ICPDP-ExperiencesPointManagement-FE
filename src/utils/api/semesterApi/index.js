import { API_ENDPOINTS } from "..";
import axios from "../../../config/axios";

const semesterApi = {
  updateOne: async (id, data, accessToken) => {
    return await axios.patch(`${API_ENDPOINTS.SEMESTERS.UPDATE}/${id}`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  fetchPagination: async (data, accessToken, signal) => {
    return await axios
      .get(API_ENDPOINTS.SEMESTERS.GET, {
        params: {
          page: data.page + 1,
          take: data.pageSize,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
        signal,
      })
      .then((response) => response.data);
  },
};

export default semesterApi;
