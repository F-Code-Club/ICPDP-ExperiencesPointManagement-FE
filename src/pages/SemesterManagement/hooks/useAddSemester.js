import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useAuth from "../../../hooks/useAuth";
import { SemesterContext } from "../semester.context";
import { AddSemesterFormSchema } from "../lib/schema";

import semesterApi from "../../../utils/api/semesterApi";
import { handleSubmitForm } from "../../../usecases/handleSubmitForm";
import { toastError, toastSuccess } from "../../../utils/toast";
import { DATE_FORMAT } from "../../../constant/core";

const useAddSemester = (setShowForm) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(AddSemesterFormSchema),
    defaultValues: {
      year: null,
      springStartDate: null,
      springEndDate: null,
      summerStartDate: null,
      summerEndDate: null,
      fallStartDate: null,
      fallEndDate: null,
    },
  });
  const {
    auth: { accessToken },
  } = useAuth();
  const { rows, setOriginalRows, setTotal } = useContext(SemesterContext);

  const onSubmit = async (data) => {
    const result = handleSubmitForm(data, AddSemesterFormSchema);

    if (!result || !result.success || result.error) {
      return;
    }

    const resData = result.data;
    try {
      const response = await semesterApi.createBulkInYear(
        {
          year: resData.year,
          semesters: [
            {
              semester: "spring",
              startDate: resData.springStartDate.format(DATE_FORMAT),
              endDate: resData.springEndDate.format(DATE_FORMAT),
            },
            {
              semester: "summer",
              startDate: resData.summerStartDate.format(DATE_FORMAT),
              endDate: resData.summerEndDate.format(DATE_FORMAT),
            },
            {
              semester: "fall",
              startDate: resData.fallStartDate.format(DATE_FORMAT),
              endDate: resData.fallEndDate.format(DATE_FORMAT),
            },
          ],
        },
        accessToken
      );

      const data = response.data?.data;
      if (response.status !== 201 || !data || data.length === 0) {
        return toastError("Failed to add semester. Please try again.");
      }

      // update optimistic UI
      setTotal((prev) => prev + 3);
      const rowsWithIds = data.map((row, index) => ({
        ...row,
        id: Math.max(...rows.map((row) => row.id)) + index + 1,
      }));
      setOriginalRows((prev) => [...prev, ...rowsWithIds]);
      setShowForm(false);
      toastSuccess("Semester added successfully.");
    } catch (error) {
      console.log(error.response);
      if (error.name !== "CanceledError") {
        toastError("Failed to add semester. Please try again.");
      }
    }
  };

  return [handleSubmit(onSubmit), control, isSubmitting, watch];
};

export default useAddSemester;
