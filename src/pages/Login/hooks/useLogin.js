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
import { getRoles } from "../../../utils/jwt";

export default function useLogin() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
      const res = await post(API_ENDPOINTS.AUTH.LOGIN, false, {
        username: result.data.code,
        password: result.data.password,
      });
      const { data } = res;
      const resData = data.data;
      if (!resData) {
        return errorToastHandler(data);
      }
      const { access_token, refresh_token } = resData;
      setAuth({ accessToken: access_token, refreshToken: refresh_token });

      // unauthenticated user is redirected to the page they were trying to access
      const from = location.state?.from?.pathname;
      if (from) {
        return navigate(from, { replace: true });
      }

      const resRoles = getRoles(access_token);
      if (!resRoles.success) {
        return;
      }

      navigate("/" + resRoles.data);
    } catch (error) {
      errorToastHandler(error.response);
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
