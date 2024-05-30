import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../lib/schema";
import { toastError } from "../../../utils/toast";
import { handleSubmitForm } from "../../../usecases/handleSubmitForm";
import { post } from "../../../utils/apiCaller";
import { API_ENDPOINTS } from "../../../utils/api";
import { errorToastHandler } from "../../../utils/toast/actions";

export default function useLogin() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data) => {
    const result = handleSubmitForm(data, LoginFormSchema);

    if (!result || !result.success || result.error) {
      return;
    }

    try {
      const res = await post(API_ENDPOINTS.AUTH.LOGIN, false, result.data);
      console.log(res);
    } catch (error) {
      errorToastHandler(error);
    }

    if (isSubmitSuccessful) {
      reset();
    }
  };

  useEffect(() => {
    if (errors?.code?.message) {
      toastError(errors.code.message);
    }
    if (errors?.password?.message) {
      toastError(errors.password.message);
    }
  }, [errors]);

  return [handleSubmit(onSubmit), isSubmitting, control];
}
