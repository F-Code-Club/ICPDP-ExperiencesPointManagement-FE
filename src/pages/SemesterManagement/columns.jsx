import { GridActionsCellItem } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const semesterColumnsSchema = (handleEditClick) => [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "header",
    headerAlign: "left",
    type: "number",
    width: 120,
    align: "left",
    editable: false,
  },
  {
    field: "semester",
    headerName: "Kỳ học",
    headerClassName: "header",
    headerAlign: "left",
    type: "string",
    width: 200,
    align: "left",
    editable: false,
    renderCell: (params) => (
      <Typography variant="body1" className="capitalize contents">
        {params.value}
      </Typography>
    ),
  },
  {
    field: "year",
    headerName: "Năm",
    headerClassName: "header",
    headerAlign: "left",
    type: "number",
    width: 150,
    align: "left",
    editable: false,
  },
  {
    field: "startDate",
    headerName: "Ngày bắt đầu",
    headerClassName: "header",
    headerAlign: "left",
    type: "string",
    width: 300,
    align: "left",
    editable: false,
  },
  {
    field: "endDate",
    headerName: "Ngày kết thúc",
    headerClassName: "header",
    headerAlign: "left",
    type: "string",
    width: 300,
    align: "left",
    editable: false,
  },
  {
    field: "actions",
    type: "actions",
    headerClassName: "header",
    headerName: "Hành động",
    width: 180,
    cellClassName: "actions",
    getActions: ({ row }) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        key="edit"
        label="Edit"
        className="textPrimary"
        onClick={() => handleEditClick(row.id)}
        color="inherit"
      />,
    ],
  },
];

export default semesterColumnsSchema;
