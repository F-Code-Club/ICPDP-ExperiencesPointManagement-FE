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
