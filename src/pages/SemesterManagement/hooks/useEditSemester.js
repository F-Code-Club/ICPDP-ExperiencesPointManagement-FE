import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useAuth from "../../../hooks/useAuth";
import { EditSemesterFormSchema } from "../lib/schema";
import { handleSubmitForm } from "../../../usecases/handleSubmitForm";
import semesterApi from "../../../utils/api/semesterApi";
import { toastError, toastSuccess } from "../../../utils/toast";
import { useContext, useLayoutEffect, useMemo } from "react";
import { SemesterContext } from "../semester.context";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../../constant/core";

const useEditSemester = (rowId, handleClose) => {
  const { rows, setRows, setOriginalRows } = useContext(SemesterContext);
  const editedRow = useMemo(
    () => rows.find((row) => row.semesterID === rowId),
    [rowId, rows]
  );
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(EditSemesterFormSchema),
    defaultValues: {
      startDate: dayjs(editedRow?.startDate, DATE_FORMAT),
      endDate: dayjs(editedRow?.endDate, DATE_FORMAT),
    },
  });
  const {
    auth: { accessToken },
  } = useAuth();

  const onSubmit = async (data) => {
    const result = handleSubmitForm(data, EditSemesterFormSchema);

    if (!result || !result.success || result.error) {
      return;
    }

    try {
      const response = await semesterApi.updateOne(
        editedRow.semesterID,
        {
          startDate: result.data.startDate.format(DATE_FORMAT),
          endDate: result.data.endDate.format(DATE_FORMAT),
        },
        accessToken
      );

      const data = response.data?.data;
      if (response.status !== 200 || !data) {
        return toastError("Failed to edit semester. Please try again.");
      }

      // update optimistic UI
      const updateRows = rows.map((row) =>
        editedRow.semesterID === row.semesterID
          ? {
              id: row.id,
              ...data,
            }
          : row
      );
      setRows(updateRows);
      setOriginalRows(updateRows);
      handleClose();
      toastSuccess("Semester edited successfully.");
    } catch (error) {
      console.log(error.response);
      if (error.name !== "CanceledError") {
        toastError("Failed to edit semester. Please try again.");
      }
    }
  };

  useLayoutEffect(() => {
    reset({
      startDate: dayjs(editedRow?.startDate, DATE_FORMAT),
      endDate: dayjs(editedRow?.endDate, DATE_FORMAT),
    });
  }, [editedRow, reset]);

  return [handleSubmit(onSubmit), control, isSubmitting, watch];
};

export default useEditSemester;
