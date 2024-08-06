import { ROLE } from "../../constant/core";

export const formConfig = (role) => {
  const fields = [{ name: "studentID", label: "MSSV", type: "text" }];
  return role === ROLE.ADMIN
    ? {
        fields: [...fields, { name: "name", label: "Họ và Tên", type: "text" }],
      }
    : {
        fields,
      };
};
