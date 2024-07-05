export const formConfig = {
  fields: [
    { name: "studentID", label: "MSSV", type: "text" },
    {
      name: "point",
      label: "Điểm cộng",
      type: "number",
    },
  ],

  selectFields: [
    {
      name: "role",
      label: "Tư cách tham gia",
      options: [
        { value: "member", label: "Thành viên" }, // default value
        { value: "organizer", label: "Ban tổ chức" },
      ],
    },
  ],
};
