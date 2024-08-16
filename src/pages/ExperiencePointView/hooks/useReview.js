import useAuth from "../../../hooks/useAuth";
import { API_ENDPOINTS } from "../../../utils/api";
import axios from "../../../config/axios";
import { toastSuccess } from "../../../utils/toast";
const useReview = (formData, eventID) => {
  const {
    auth: { accessToken },
  } = useAuth();

  const handleReview = async () => {
    try {
      const formattedData = {
        note: formData.note,
        status: formData.isApproved === true ? "approved" : "denied",
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
      console.log(err);
    }
  };
  return { handleReview };
};
export default useReview;
