import { API_ENDPOINTS } from "..";

const semesterApi = {
  updateOne: async (id, data, axios, accessToken) => {
    return await axios.patch(`${API_ENDPOINTS.SEMESTERS.UPDATE}/${id}`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  fetchPagination: async (data, axios, accessToken, signal) => {
    return await axios
      .get(API_ENDPOINTS.SEMESTERS.GET, {
        params: {
          page: data.page,
          take: data.pageSize,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
        signal,
      })
      .then((response) => response.data);
  },
};

export default semesterApi;
