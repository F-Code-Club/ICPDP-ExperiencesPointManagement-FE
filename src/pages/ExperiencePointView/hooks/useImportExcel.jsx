import useAuth from "../../../hooks/useAuth";
import { API_ENDPOINTS } from "../../../utils/api/index";
import { toastError, toastSuccess } from "../../../utils/toast";
import { useCallback, useState } from "react";
import { VALID_MIME_TYPES } from "../../../constant/core";
import axios from "../../../config/axios";
import useFetchStudent from "../hooks/useFetchStudent";
const useImportExcel = (
  eventID,
  setOriginalRows,
  setShowModal,
  setRows,
  setTables,
  setTotalPage,
  tables
) => {
  const [uploading, setUploading] = useState(false);
  const {
    auth: { accessToken },
    role,
  } = useAuth();

  const { debouncedFetchRows } = useFetchStudent(
    eventID,
    setOriginalRows,
    setRows,
    setTables,
    setTotalPage,
    tables
  );
  const handleFileChange = useCallback(
    async (event) => {
      const file = event.target.files[0];

      if (!file) return;

      // Validate file type
      if (!VALID_MIME_TYPES.includes(file.type)) {
        return toastError("Please upload a valid Excel file.");
      }
      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);

        // Make the request to upload the Excel file
        await axios.post(
          `${API_ENDPOINTS.EVENTS_POINT.ADD}/${eventID}/import`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Update the original rows state with the new data
        setShowModal(false);
        debouncedFetchRows();
        toastSuccess("Upload successfully");
      } catch (error) {
        toastError(`${error.response.data.message}`);
        // console.log(error);
      } finally {
        setUploading(false);
      }
    },
    [accessToken, eventID, role, setOriginalRows, setShowModal]
  );

  return { handleFileChange, uploading };
};

export default useImportExcel;
