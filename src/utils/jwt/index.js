import { decodeToken } from "react-jwt";
import { errorToastHandler } from "../toast/actions";

export const getRoles = (accessToken) => {
  const role = decodeToken(accessToken)?.role;
  if (!role) {
    errorToastHandler({ message: "No role found" });
    return { success: false, data: {} };
  }
  return { success: true, data: role };
};
