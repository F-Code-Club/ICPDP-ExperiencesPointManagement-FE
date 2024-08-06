import { API_ENDPOINTS } from "..";
import axios from "../../../config/axios";

const clubMemberApi = {
  fetchPagination: async (data, accessToken, signal) => {
    return await axios
      .get(API_ENDPOINTS.CLUB_MEMBER.GET, {
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

export default clubMemberApi;
