import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { API_ENDPOINTS } from "../../../utils/api/index";
import { decodeToken } from "react-jwt";
import { toastError, toastSuccess } from "../../../utils/toast";
import { useCallback, useState } from "react";
import { ROLE, VALID_MIME_TYPES } from "../../../constant/core";
const useImportExcel = ({ eventID, setOriginalRows, rows }) => {
  const [uploading, setUploading] = useState(false);
  const {
    auth: { accessToken },
  } = useAuth();
  const decoded = auth?.accessToken ? decodeToken(auth.accessToken) : undefined;
  const role = decoded?.role || "";
  const axios = useAxiosPrivate();
  const importData = async () => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.EVENTS_POINT.ADD}/${eventID}/import`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileChange = useCallback(
    async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      if (!VALID_MIME_TYPES.includes(file.type)) {
        return toastError("Vui lòng upload file Excel hợp lệ.");
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);
        const response = await api.uploadFile(formData, accessToken);

        const data =
          role === ROLE.ADMIN
            ? response.data.data
            : response.data.data.students;
        if (response.status === 200 || response.status === 201) {
          const id =
            rows.length > 0 ? Math.max(...rows.map((row) => row.id)) : 0;
          const rowsWithIds =
            data.map((row, index) => ({
              ...row,
              id: id + index + 1,
            })) || [];
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken, rows]
  );
};
