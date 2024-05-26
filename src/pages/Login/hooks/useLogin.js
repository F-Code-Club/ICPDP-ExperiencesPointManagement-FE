import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../lib/schema";
import { toastError } from "../../../utils/toast";
import { handleSubmitForm } from "../../../usecases/handleSubmitForm";

export default function useLogin() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = (data) => {
    const result = handleSubmitForm(data);

    if (!result || result.error) {
      return;
    }

    // Do something with the data
  };

  useEffect(() => {
    if (errors.clubCode?.message) {
      toastError(errors.clubCode.message);
    }
  }, [errors]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return [handleSubmit(onSubmit), isSubmitting, control];
}
