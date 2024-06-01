import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../lib/schema";
import { toastError } from "../../../utils/toast";
import { handleSubmitForm } from "../../../usecases/handleSubmitForm";
import { post } from "../../../utils/apiCaller";
import { API_ENDPOINTS } from "../../../utils/api";
import { errorToastHandler } from "../../../utils/toast/actions";
import useAuth from "../../../hooks/useAuth";

export default function useLogin() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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
      const { data } = res;
      const accessToken = data.accessToken;
      if (!accessToken) {
        return toastError(data.message);
      }
      setAuth({ accessToken, refreshToken: data.refreshToken });
      navigate(from, { replace: true });
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
