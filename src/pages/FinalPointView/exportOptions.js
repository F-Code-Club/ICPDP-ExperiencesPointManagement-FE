export const exportOptions = {
  fields: [
    "id",
    "studentID",
    "studentName",
    "studyPoint",
    "studyComment",
    "activityPoint1",
    "activityPoint2",
    "activityPoint3",
    "activityPoint4",
    "activityPoint5",
    "citizenshipPoint",
    "citizenshipComment",
    "organizationPoint",
    "organizationComment",
    "totalFinalPoint",
    "classification",
  ],
  headers: [
    { field: "id", headerName: "ID" },
    { field: "studentID", headerName: "MSSV" },
    { field: "studentName", headerName: "Họ và Tên" },
    {
      field: "studyPoint",
      headerName: "Điểm đánh giá Ý thức học tập (Mặc định: 20; tối đa 35)",
    },
    { field: "studyComment", headerName: "Nhận xét Ý thức học tập" },
    {
      field: "activityPoints",
      headerName: "Điểm đánh giá hoạt động",
      children: [
        { field: "activityPoint1", headerName: "Hoạt động 1" },
        { field: "activityPoint2", headerName: "Hoạt động 2" },
        { field: "activityPoint3", headerName: "Hoạt động 3" },
        { field: "activityPoint4", headerName: "Hoạt động 4" },
        { field: "activityPoint5", headerName: "Hoạt động 5" },
      ],
    },
    { field: "citizenshipPoint", headerName: "Điểm đánh giá Ý thức công dân" },
    { field: "citizenshipComment", headerName: "Nhận xét Ý thức công dân" },
    { field: "organizationPoint", headerName: "Điểm đánh giá tổ chức" },
    { field: "organizationComment", headerName: "Nhận xét tổ chức" },
    { field: "totalFinalPoint", headerName: "Tổng điểm cuối cùng" },
    { field: "classification", headerName: "Xếp hạng" },
  ],
};

export const resolveHeaders = (headers) => {
  const resolved = [];

  const traverseHeaders = (headerArray, parentHeader = null) => {
    headerArray.forEach((header) => {
      if (header.children) {
        traverseHeaders(header.children, header.headerName);
      } else {
        resolved.push(
          parentHeader
            ? `${parentHeader} - ${header.headerName}`
            : header.headerName
        );
      }
    });
  };

  traverseHeaders(headers);
  return resolved;
};
