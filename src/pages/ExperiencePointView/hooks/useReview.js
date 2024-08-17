import useAuth from "../../../hooks/useAuth";
import { API_ENDPOINTS } from "../../../utils/api";
import axios from "../../../config/axios";
import { toastError, toastSuccess } from "../../../utils/toast";

const useReview = (eventID) => {
  const {
    auth: { accessToken },
  } = useAuth();

  const handleReview = async (isApproved, note) => {
    try {
      const formattedData = {
        note: note,
        status: isApproved ? "approved" : "denied",
      };
      await axios.patch(
        `${API_ENDPOINTS.EVENTS.REVIEW}/${eventID}`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toastSuccess("Review event successfully");
    } catch (err) {
      toastError("Review failed");
    }
  };
  return { handleReview };
};
export default useReview;
