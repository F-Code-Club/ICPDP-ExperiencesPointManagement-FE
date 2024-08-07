import { useCallback, useContext } from "react";
import { StudentContext } from "../student.context";
import useAuth from "../../../hooks/useAuth";

import studentApi from "../../../utils/api/studentApi";
import { toastError, toastSuccess } from "../../../utils/toast";

const useActionStudents = (rowToEdit, handleEditClose, handleDeleteClose) => {
  const { rows, setRows, setOriginalRows } = useContext(StudentContext);
  const {
    auth: { accessToken },
  } = useAuth();

  const handleSaveClick = useCallback(
    async (formData) => {
      const currentRow = rows.find((row) => row.id === rowToEdit);
      const data = {
        ...formData,
        id: rowToEdit,
      };
      try {
        const response = await studentApi.updateOne(
          currentRow?.studentID,
          data,
          accessToken
        );

        if (response.status === 200 || response.status === 201) {
          const updatedRows = rows.map((row) =>
            row.id === rowToEdit ? data : row
          );
          setRows(updatedRows);
          setOriginalRows(updatedRows);
          handleEditClose();
          toastSuccess("Chỉnh sửa sinh viên thành công");
        }
      } catch (error) {
        toastError("Updating Fail..");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken, rowToEdit, rows]
  );

  const handleDelete = useCallback(
    async (rowId) => {
      const currentRow = rows.find((row) => row.id === rowId);
      try {
        const response = await studentApi.deleteOne(
          currentRow?.studentID,
          accessToken
        );

        if (response.status === 200 || response.status === 201) {
          const newRows = rows.filter((row) => row.id !== rowId);
          setRows(newRows.map((row, index) => ({ ...row, id: index + 1 })));
          setOriginalRows(
            newRows.map((row, index) => ({ ...row, id: index + 1 }))
          );
          handleDeleteClose();
          toastSuccess("Xóa sinh viên thành công");
        }
      } catch (error) {
        toastError("Deleting Fail..");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken, rows]
  );

  return { handleSaveClick, handleDelete };
};

export default useActionStudents;
