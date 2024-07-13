export const formConfig = {
  fields: [{ name: "studentID", label: "MSSV", type: "text" }],
  selectFields: [
    {
      name: "role",
      label: "Tư cách tham gia",
      options: [
        { value: true, label: "Đang hoạt động" }, // default value
        { value: false, label: "Ngừng hoạt động" },
      ],
    },
  ],
};
