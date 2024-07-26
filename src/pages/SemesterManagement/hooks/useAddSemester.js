import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useAuth from "../../../hooks/useAuth";
import { SemesterContext } from "../semester.context";
import { AddSemesterFormSchema } from "../lib/schema";

import semesterApi from "../../../utils/api/semesterApi";
import { handleSubmitForm } from "../../../usecases/handleSubmitForm";
import { toastError, toastSuccess } from "../../../utils/toast";

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
  const { rows, setRows, setOriginalRows, setTotal } =
    useContext(SemesterContext);

  const onSubmit = async (data) => {
    const result = handleSubmitForm(data, AddSemesterFormSchema);

    if (!result || !result.success || result.error) {
      return;
    }

    const resData = result.data;
    const formatDate = "DD/MM/YYYY";
    try {
      const response = await semesterApi.createBulkInYear(
        {
          year: resData.year,
          semesters: [
            {
              semester: "spring",
              startDate: resData.springStartDate.format(formatDate),
              endDate: resData.springEndDate.format(formatDate),
            },
            {
              semester: "summer",
              startDate: resData.summerStartDate.format(formatDate),
              endDate: resData.summerEndDate.format(formatDate),
            },
            {
              semester: "fall",
              startDate: resData.fallStartDate.format(formatDate),
              endDate: resData.fallEndDate.format(formatDate),
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
      setRows((prev) => [...prev, ...rowsWithIds]);
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
