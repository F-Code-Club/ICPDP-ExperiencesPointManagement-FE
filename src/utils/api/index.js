export const API_ENDPOINTS = {
  AUTH: {
    PROFILE: "auth/profile",
    LOGIN: "auth/login",
    LOGOUT: "auth/logout",
    REFRESH_TOKEN: "auth/refresh",
  },
  CLUBS: {
    GET_ALL: "/clubs",
    GET: `/clubs`,
    ADD: "/clubs",
    UPLOAD: `/local-files`,
    UPDATE: `/clubs`,
    DELETE: `/clubs`,
  },
  DEPARTMENTS: {
    GET_ALL: "/departments",
    GET: `/departments`,
    ADD: "/departments",
    UPLOAD: `/local-files`,
    UPDATE: `/departments`,
    DELETE: `/departments`,
  },
  STUDENTS: {
    GET_ALL: "/students",
    GET: `/students`,
    ADD: "/students",
    UPLOAD: `/students/import`,
    UPDATE: `/students`,
    DELETE: `/students`,
  },
};
