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
  SEMESTERS: {
    GET_ALL: `/semesters`,
    GET: `/semesters`,
    NOW: `/semesters/now`,
    ADD: `/semesters`,
    UPDATE: `/semesters`,
    DELETE: `/semesters`,
  },
  EVENTS: {
    GET_ALL: `/events`,
    GET: `/events`,
    ADD: `/events`,
    UPDATE: `/events`,
    DELETE: `/events`,
    REVIEW: `/events/grant-permission`,
  },
  EVENTS_POINT: {
    GET_ALL: `/event-point`,
    GET: `/event-point`,
    ADD: `/event-point`,
    UPDATE: `/event-point`,
    DELETE: `/event-point`,
  },
  ROLE_CLUBS: {
    GET_ALL: `role-clubs`,
    GET: `role-clubs`,
    ADD: `role-clubs`,
    UPDATE: `role-clubs`,
    DELETE: `role-clubs`,
  },
  ROLE_DEPARTMENTS: {
    GET_ALL: `role-departments`,
    GET: `role-departments`,
    ADD: `role-departments`,
    UPDATE: `role-departments`,
    DELETE: `role-departments`,
  },

  CLUB_MEMBER: {
    GET: `club-member`,
    ADD: `club-member`,
    UPDATE: `club-member`,
    DELETE: `club-member`,
    UPLOAD: `club-member/import`,
  },
  DEPARTMENT_MEMBER: {
    GET: `department-member`,
    ADD: `department-member`,
    UPDATE: `department-member`,
    DELETE: `department-member`,
    UPLOAD: `department-member/import`,
  },
  FINAL_POINTS: {
    GET_ALL: `/final-point`,
    GET: `/final-point`,
    ADD: `/final-point`,
    UPDATE: `/final-point`,
    DELETE: `/final-point`,
  },
};
