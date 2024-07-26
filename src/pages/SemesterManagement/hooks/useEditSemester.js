import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useAuth from "../../../hooks/useAuth";
import { EditSemesterFormSchema } from "../lib/schema";
import { handleSubmitForm } from "../../../usecases/handleSubmitForm";
import semesterApi from "../../../utils/api/semesterApi";
import { toastError, toastSuccess } from "../../../utils/toast";
import { useContext } from "react";
import { SemesterContext } from "../semester.context";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../../constant/core";

const useEditSemester = (editedRow, handleClose) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    watch,
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
  const { rows, setRows, setOriginalRows } = useContext(SemesterContext);

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
        editedRow.semesterID === row.semesterID ? data : row
      );
      setRows(updateRows);
      setOriginalRows(updateRows);
      handleClose();
      toastSuccess("Semester added successfully.");
    } catch (error) {
      console.log(error.response);
      if (error.name !== "CanceledError") {
        toastError("Failed to edit semester. Please try again.");
      }
    }
  };

  return [handleSubmit(onSubmit), control, isSubmitting, watch];
};

export default useEditSemester;
