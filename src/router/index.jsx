import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CircularIndeterminate from "../components/CircularIndeterminate";
import { ROLE } from "../constant/core";

import PersistLogin from "../components/Auth/PersistLogin";
import RequireAuth from "../components/Auth/RequireAuth";

import UnauthorizedPage from "../pages/403";
import ErrorPage from "../pages/404";
import LoginPage from "../pages/Login";
import Home from "../pages/Home";
import Layout from "../layouts/Layout";
import ClubManagement from "../pages/ClubManagement";
import DepartmentManagement from "../pages/DepartmentManagement";
import StudentManagement from "../pages/StudentManagement";
import ExperiencePointView from "../pages/ExperiencePointView";
const RouterComponent = () => {
  const router = createBrowserRouter([
    // Public routes
    { path: "login", element: <LoginPage /> },
    { path: "unauthorized", element: <UnauthorizedPage /> },
    { path: "*", element: <ErrorPage /> },
    // {
    //   path: "transcripts/experience-point",
    //   element: <ExperiencePointView />,
    // },

    // Protected routes
    {
      element: <PersistLogin />,
      children: [
        {
          // User routes
          path: "user",
          element: <RequireAuth allowedRoles={[ROLE.USER]} />,
          children: [
            {
              element: <Layout />,
              children: [
                { index: true, element: <Home /> },
                // {
                //   path: "transcripts/experience-point",
                //   element: <ExperiencePointView />,
                // },
              ],
            },
          ],
        },
        {
          // Admin routes
          path: "admin",
          element: <RequireAuth allowedRoles={[ROLE.ADMIN]} />,
          children: [
            {
              element: <Layout />,
              children: [
                { index: true, element: <Home /> },
                {
                  path: "transcripts/experience-point",
                  element: <ExperiencePointView />,
                },
                {
                  path: "transcripts/final-point",
                  element: <div>Điểm tổng kết</div>,
                },
                {
                  path: "settings/students",
                  element: <StudentManagement title="Quản lí sinh viên" />,
                },
                {
                  path: "settings/clubs",
                  element: <ClubManagement title="Quản lí câu lạc bộ" />,
                },
                {
                  path: "settings/departments",
                  element: <DepartmentManagement title="Quản lí phòng ban" />,
                },
                {
                  path: "settings/semesters",
                  element: <div>Quản lí kì học</div>,
                },
              ],
            },
          ],
        },
        {
          // club
          path: "club",
          element: <RequireAuth allowedRoles={[ROLE.CLUB]} />,
          children: [
            {
              element: <Layout />,
              children: [
                { index: true, element: <Home /> },
                {
                  path: "transcripts/experience-point",
                  element: <ExperiencePointView />,
                },
                {
                  path: "transcripts/final-point",
                  element: <div>Điểm tổng kết</div>,
                },
                {
                  path: "settings/students",
                  element: <StudentManagement title="Quản lí sinh viên" />,
                },
                {
                  path: "settings/clubs",
                  element: <ClubManagement title="Quản lí câu lạc bộ" />,
                },
                {
                  path: "settings/departments",
                  element: <DepartmentManagement title="Quản lí phòng ban" />,
                },
                {
                  path: "settings/semesters",
                  element: <div>Quản lí kì học</div>,
                },
              ],
            },
          ],
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
