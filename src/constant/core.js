const STRING_EMPTY = "";

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
};

const ROLE = {
  ADMIN: "admin",
  USER: "user",
  CLUB: "club",
  DEPARTMENT: "department",
  STUDENT: "student",
};

const PAGE_SIZE = 10;

const DATE_FORMAT = "DD/MM/YYYY";
const DATE_FORMAT_US = "MM/DD/YYYY";

const VALID_MIME_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

const EVENT_STATE = {
  PENDING: "pending",
  APPROVED: "approved",
  DENIED: "denied",
};

const GRADING_STATE = {
  GRADED: true,
  UNGRADED: false,
};
const PAGE_TITLE = {
  HOME: "Trang chủ",
  EXPERIENCE_POINT: "Bảng điểm phong trào",
  FINAL_POINT: "Bảng điểm tổng kết",
  CLUBS: "Quản lí câu lạc bộ",
  DEPARTMENTS: "Quản lí phòng ban",
  SEMESTERS: "Quản lí kì học",
  STUDENTS: "Quản lí sinh viên",
  NOT_FOUND: "Trang không xác định",
};

export {
  STRING_EMPTY,
  HTTP_STATUS,
  ROLE,
  PAGE_SIZE,
  DATE_FORMAT,
  DATE_FORMAT_US,
  VALID_MIME_TYPES,
  EVENT_STATE,
  GRADING_STATE,
  PAGE_TITLE,
};
