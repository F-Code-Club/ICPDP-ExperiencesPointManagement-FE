import { ROLE } from "../../constant/core";

export const formConfig = (role) => {
  const fields = [{ name: "studentID", label: "MSSV", type: "text" }];
  if (role === ROLE.ADMIN)
    fields.push({ name: "name", label: "Họ và Tên", type: "text" });
  return { fields };
};
