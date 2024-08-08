import { useCallback, useContext, useState } from "react";

import useAuth from "../../../hooks/useAuth";

import { StudentContext } from "../student.context";
import { toastError, toastSuccess } from "../../../utils/toast";
import { ROLE, VALID_MIME_TYPES } from "../../../constant/core";

const useAddStudents = (setShowForm, setShowModal) => {
  const { rows, setOriginalRows, api } = useContext(StudentContext);
  const [uploading, setUploading] = useState(false);
  const {
    auth: { accessToken },
    role,
  } = useAuth();

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

  const handleSave = useCallback(
    async (formData) => {
      try {
        const response = await api.addOne({ ...formData }, accessToken);
        const data =
          role === ROLE.ADMIN
            ? response.data.data
            : response.data.data.students;
        if (response.status === 200 || response.status === 201) {
          const id =
            rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
          const newRow = {
            ...data,
            id,
          };
          setOriginalRows((prevRows) => [...prevRows, newRow]);
          setShowForm(false);
          toastSuccess("Thêm sinh viên thành công!");
        }
      } catch (error) {
        toastError(error.response.data.message);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken, rows]
  );

  return { handleFileChange, handleSave, uploading };
};

export default useAddStudents;
