import { useLocation, Navigate, Outlet } from "react-router-dom";
import { decodeToken } from "react-jwt";
import useAuth from "../../../hooks/useAuth";

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  console.log(auth);

  const decoded = auth?.accessToken ? decodeToken(auth.accessToken) : undefined;

  const role = decoded?.role || "";

  // eslint-disable-next-line react/prop-types
  return allowedRoles?.includes(role) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
