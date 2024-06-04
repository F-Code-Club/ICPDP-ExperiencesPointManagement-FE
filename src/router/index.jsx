import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CircularIndeterminate from "../components/CircularIndeterminate";
import { ROLE } from "../constant/core";

import PersistLogin from "../components/Auth/PersistLogin";
import RequireAuth from "../components/Auth/RequireAuth";

import UnauthorizedPage from "../pages/403";
import ErrorPage from "../pages/404";
import LoginPage from "../pages/Login";
import Home from "../pages/Home";


const RouterComponent = () => {
  const router = createBrowserRouter([
    // Public routes
    { path: "login", element: <LoginPage /> },
    { path: "unauthorized", element: <UnauthorizedPage /> },
    { path: "*", element: <ErrorPage /> },
    // Protected routes
    {
      element: <PersistLogin />,
      children: [
        { path: "transcripts/experience-point", element: <div>Điểm phong trào</div> },
        { path: "transcripts/final-point", element: <div>Điểm tổng kết</div> },
        { path: "settings/students", element: <div>Quản lí sinh viên</div> },
        { path: "settings/clubs", element: <div>Quản lí câu lạc bộ</div> },
        { path: "settings/departments", element: <div>Quản lí phòng ban</div> },
        { path: "settings/semesters", element: <div>Quản lí kì học</div> },
        {
          // User routes
          path: "user",
          element: <RequireAuth allowedRoles={[ROLE.USER]} />,
          children: [
            {
              index: true,
              element: <Home />,
            },
          ],
        },
        {
          // Admin routes
          path: "admin",
          element: <RequireAuth allowedRoles={[ROLE.ADMIN]} />,
          children: [],
        },
      ],
    },
  ]);
  return (
    <RouterProvider
      fallbackElement={<CircularIndeterminate />}
      router={router}
    />
  );
};

export default RouterComponent;
