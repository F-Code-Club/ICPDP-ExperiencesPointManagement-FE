import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { API_ENDPOINTS } from "../../../utils/api/index";
import { decodeToken } from "react-jwt";
import { toastError, toastSuccess } from "../../../utils/toast";
import { useCallback, useState } from "react";
import { ROLE, VALID_MIME_TYPES } from "../../../constant/core";

const useImportExcel = (eventID, setOriginalRows, setShowModal) => {
  const [uploading, setUploading] = useState(false);
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? decodeToken(auth.accessToken) : undefined;
  const role = decoded?.role || "";
  const axios = useAxiosPrivate();

  const handleFileChange = useCallback(
    async (event) => {
      const file = event.target.files[0];

      if (!file) return;

      // Validate file type
      if (!VALID_MIME_TYPES.includes(file.type)) {
        return toastError("Vui lòng upload file Excel hợp lệ.");
      }
      console.log("Selected file:", file);
      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);

        // Make the request to upload the Excel file
        const response = await axios.post(
          `${API_ENDPOINTS.EVENTS_POINT}/${eventID}/import`,
          formData.get("file"),
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle the response
        if (response.status === 200 || response.status === 201) {
          const data =
            role === ROLE.ADMIN
              ? response.data.data
              : response.data.data.students;

          // Generate IDs for the imported rows
          const id =
            setOriginalRows.length > 0
              ? Math.max(...setOriginalRows.map((row) => row.id))
              : 0;

          const rowsWithIds =
            data.map((row, index) => ({
              ...row,
              id: id + index + 1,
            })) || [];

          // Update the original rows state with the new data
          setOriginalRows((prevRows) => [...prevRows, ...rowsWithIds]);
          setShowModal(false);
          toastSuccess("Upload thành công!");
        } else {
          toastError(`Upload failed with status: ${response.status}`);
        }
      } catch (error) {
        if (error.response) {
          toastError(`Error uploading file: ${error.response.data.message}`);
        } else {
          toastError("Error uploading file.");
        }
      } finally {
        setUploading(false);
      }
    },
    [auth.accessToken, eventID, role, setOriginalRows, setShowModal]
  );

  return { handleFileChange, uploading };
};

export default useImportExcel;
