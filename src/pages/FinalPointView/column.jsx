import { Box, Avatar, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { styles } from "../../components/DataTable/style";

export const columnsSchema = (handleEditClick) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "header",
      cellClassName: "cell",
      headerAlign: "left",
      type: "number",
      width: 50,
      align: "left",
      editable: false,
    },
    {
      field: "studentID",
      headerName: "MSSV",
      headerClassName: "header",
      cellClassName: "cell",

      type: "string",
      width: 120,
      editable: false,
    },
    {
      field: "name",
      headerName: "Họ và Tên",
      headerClassName: "header",
      cellClassName: "cell",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "12px 18px 12px 0px",
            gap: "18px",
          }}
        >
          <Avatar src={params.row.avatar} alt="Avatar" sx={styles.avatar} />
          <Typography variant="body1" className="ml-[12px]">
            {params.value}
          </Typography>
        </Box>
      ),
      type: "string",
      width: 300,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "learningPoint",
      headerName: "Điểm cộng",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: 100,
      editable: false,
    },
    {
      field: "learningComment",
      headerName: "Comment",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "center",
      align: "left",
      width: 150,
      editable: false,
    },
    {
      field: "finalLearningPoint",
      headerName: "Tổng điểm",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: 100,
      editable: false,
    },
    {
      field: "politicalPoint1",
      headerName: "Điểm cộng(1)",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: 120,
      editable: false,
    },
    {
      field: "politicalPoint2",
      headerName: "Điểm cộng(2)",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: 120,
      editable: false,
    },
    {
      field: "politicalPoint3",
      headerName: "Điểm cộng(3)",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: 120,
      editable: false,
    },
    {
      field: "politicalPoint4",
      headerName: "Điểm cộng(4)",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: 120,
      editable: false,
    },
    {
      field: "politicalPoint5",
      headerName: "Điểm cộng(5)",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: 120,
      editable: false,
    },
    {
      field: "politicalComment",
      headerName: "Comment",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "center",
      align: "left",
      width: 150,
      editable: false,
    },
    {
      field: "finalPoliticalPoint",
      headerName: "Tổng điểm",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: 100,
      editable: false,
    },
    {
      field: "activityPoint",
      headerName: "Điểm cộng",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: 100,
      editable: false,
    },
    {
      field: "activityComment",
      headerName: "Comment",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "center",
      align: "left",
      width: 150,
      editable: false,
    },
    {
      field: "finalActivityPoint",
      headerName: "Tổng điểm",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: 100,
      editable: false,
    },
    {
      field: "finalPoint",
      headerName: "Tổng điểm",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: 100,
      editable: false,
    },
    {
      fields: "rating",
      headerName: "Xếp loại",
      headerClassName: "header",
      cellClassName: "cell",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: 120,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "header lastHeader",
      cellClassName: "cell actions lastHeader",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => handleEditClick(params.row)}
        />
      ),
    },
  ];

  return columns;
};

export const columnGroupingModel = [
  {
    groupId: "id",
    headerName: "",
    headerClassName: "majorHeader",
    children: [{ field: "id" }],
  },
  {
    groupId: "studentID",
    headerName: "",
    headerClassName: "majorHeader",
    children: [{ field: "studentID" }],
  },
  {
    groupId: "name",
    headerName: "",
    headerClassName: "majorHeader",
    children: [{ field: "name" }],
  },
  {
    groupId: "learning",
    headerClassName: "majorHeader",
    headerName: "Đánh giá Ý thức học tập (Mặc định: 20; tối đa 35)",
    children: [
      { field: "learningPoint" },
      { field: "learningComment" },
      { field: "finalLearningPoint" },
    ],
  },
  {
    groupId: "political",
    headerName:
      "Đánh giá tham gia công tác chính trị (Mặc định: 20; tối đa 35)",
    headerClassName: "majorHeader",
    children: [
      { field: "politicalPoint1" },
      { field: "politicalPoint2" },
      { field: "politicalPoint3" },
      { field: "politicalPoint4" },
      { field: "politicalPoint5" },
      { field: "politicalComment" },
      { field: "finalPoliticalPoint" },
    ],
  },
  {
    groupId: "activity ",
    headerName: "Đánh giá tham gia công tác phụ trách đoàn thể, các tổ chức…",
    headerClassName: "majorHeader",
    children: [
      { field: "activityPoint" },
      { field: "activityComment" },
      { field: "finalActivityPoint" },
    ],
  },
  {
    groupId: "finalPoint ",
    headerName: "",
    headerClassName: "majorHeader",
    children: [{ field: "finalPoint" }],
  },
  {
    groupId: "rating",
    headerName: "",
    headerClassName: "majorHeader",
    children: [{ field: "rating" }],
  },
  {
    groupId: "actions",
    headerName: "",
    headerClassName: "majorHeader lastHeader",
    children: [{ field: "actions" }],
  },
];
