import { useCallback, useContext } from "react";
import { StudentContext } from "../student.context";
import useAuth from "../../../hooks/useAuth";

import studentApi from "../../../utils/api/studentApi";
import { toastError } from "../../../utils/toast";

const useActionStudents = () => {
  const { rows, setRows, setOriginalRows, rowToEdit, handleClose } =
    useContext(StudentContext);
  const {
    auth: { accessToken },
  } = useAuth();

  const handleSaveClick = useCallback(
    async (formData) => {
      const currentRow = rows.find((row) => row.id === rowToEdit);

      try {
        const response = await studentApi.updateOne(
          currentRow?.studentID,
          {
            ...formData,
            id: rowToEdit,
          },
          accessToken
        );

        if (response.status === 200 || response.status === 201) {
          const updatedRow = {
            ...formData,
            id: rowToEdit,
          };
          const updatedRows = rows.map((row) =>
            row.id === rowToEdit ? updatedRow : row
          );
          setRows(updatedRows);
          setOriginalRows(updatedRows);
          handleClose();
        }
      } catch (error) {
        toastError("Updating Fail..");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken, rowToEdit]
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
          handleClose();
        }
      } catch (error) {
        toastError("Deleting Fail..");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken]
  );

  return { handleSaveClick, handleDelete };
};

export default useActionStudents;
