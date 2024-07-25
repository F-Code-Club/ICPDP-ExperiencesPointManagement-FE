import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AddSemesterFormSchema } from "../lib/schema";
import { handleSubmitForm } from "../../../usecases/handleSubmitForm";
import { errorToastHandler } from "../../../utils/toast/actions";

const useAddSemester = () => {
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

  const onSubmit = async (data) => {
    const result = handleSubmitForm(data, AddSemesterFormSchema);

    if (!result || !result.success || result.error) {
      return;
    }

    try {
      // call api here
    } catch (error) {
      if (error.name !== "CanceledError") {
        errorToastHandler(error.response);
      }
    }
  };

  return [handleSubmit(onSubmit), control, isSubmitting, watch];
};

export default useAddSemester;
