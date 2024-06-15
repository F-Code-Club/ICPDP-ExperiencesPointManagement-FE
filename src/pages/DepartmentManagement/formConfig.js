export const formConfig = {
  fields: [
    { name: "name", label: "Tên", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "username", label: "Mã định danh", type: "text" },
    { name: "password", label: "Mật khẩu", type: "password" },
  ],
  selectFields: [
    {
      name: "active",
      label: "Active",
      options: [
        { value: true, label: "Đang hoạt động" }, // default value
        { value: false, label: "Ngừng hoạt động" },
      ],
    },
  ],
};