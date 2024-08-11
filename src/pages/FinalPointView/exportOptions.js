export const exportOptions = {
  fields: [
    "id",
    "studentID",
    "studentName",
    "studyPoint",
    "studyComment",
    "totalStudyPoint",
    "activityPoint1",
    "activityPoint2",
    "activityPoint3",
    "activityPoint4",
    "activityPoint5",
    "totalActivityPoint",
    "citizenshipPoint",
    "citizenshipComment",
    "totalCitizenshipPoint",
    "organizationPoint",
    "organizationComment",
    "totalOrganizationPoint",
    "totalFinalPoint",
    "classification",
  ],
  headers: [
    { field: "id", headerName: "ID" },
    { field: "studentID", headerName: "MSSV" },
    { field: "studentName", headerName: "Họ và Tên" },
    {
      field: "study",
      headerName: "Đánh giá Ý thức học tập (Mặc định: 20; tối đa 35)",
      children: [
        {
          field: "studyPoint",
          headerName: "Điểm cộng",
        },
        { field: "studyComment", headerName: "Nhận xét" },
        { field: "finalStudyPoint", headerName: "Điểm tổng kết" },
      ],
    },
    {
      field: "activityPoints",
      headerName:
        "Ý thức tham gia các hoạt động chính trị; văn hóa; văn nghệ; thể dục thế thao (Mặc định 15; tối đa 50)",
      children: [
        { field: "activityPoint1", headerName: "Điểm cộng 1" },
        { field: "activityPoint2", headerName: "Điểm cộng 2" },
        { field: "activityPoint3", headerName: "Điểm cộng 3" },
        { field: "activityPoint4", headerName: "Điểm cộng 4" },
        { field: "activityPoint5", headerName: "Điểm cộng 5" },
        { field: "finalActivityPoint", headerName: "Điểm tổng kết hoạt động" },
      ],
    },
    {
      field: "citizenship",
      headerName:
        "Phẩm chất công dân và quan hệ cộng đồng (Điểm mặc định: 15; tối đa 25)",
      children: [
        { field: "citizenshipPoint", headerName: "Điểm cộng" },
        { field: "citizenshipComment", headerName: "Nhận xét" },
        { field: "finalCitizenshipPoint", headerName: "Điểm tổng kết" },
      ],
    },
    {
      field: "organization",
      headerName: "Đánh giá tham gia công tác phụ trách đoàn thể; các tổ chức…",
      children: [
        { field: "organizationPoint", headerName: "Điểm cộng" },
        { field: "organizationComment", headerName: "Nhận xét" },
        { field: "finalOrganizationPoint", headerName: "Điểm tổng kết" },
      ],
    },
    { field: "totalFinalPoint", headerName: "Tổng điểm cuối cùng" },
    { field: "classification", headerName: "Xếp loại" },
  ],
};

export const resolveHeaders = (headers) => {
  const resolved = [];

  const traverseHeaders = (headerArray) => {
    headerArray.forEach((header) => {
      if (header.children) {
        traverseHeaders(header.children, header.headerName);
      } else {
        resolved.push(header.headerName);
      }
    });
  };

  traverseHeaders(headers);
  return resolved;
};
