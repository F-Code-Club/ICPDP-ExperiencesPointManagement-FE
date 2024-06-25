export const formConfig = {
    fields: [
      { name: "studentID", label: "MSSV", type: "text" },
      { name: "name", label: "Họ và Tên", type: "text" },
    ],
    selectFields: [
      {
        name: "participantRole",
        label: "Tư cách tham gia",
        options: [
          { value: "Thành viên", label: "Thành viên" }, // default value
          { value: "Ban tổ chức", label: "Ban tổ chức" },
        ],
      },
    ],
  };