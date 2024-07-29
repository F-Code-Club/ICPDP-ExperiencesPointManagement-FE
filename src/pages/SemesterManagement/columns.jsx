import { GridActionsCellItem } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { DATE_FORMAT } from "../../constant/core";

dayjs.extend(customParseFormat);

const semesterColumnsSchema = (handleEditClick) => [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "header",
    headerAlign: "left",
    type: "number",
    flex: 0.5,
    align: "left",
    editable: false,
  },
  {
    field: "semester",
    headerName: "Kỳ học",
    headerClassName: "header",
    headerAlign: "left",
    type: "string",
    flex: 1,
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
    flex: 1,
    align: "left",
    editable: false,
    renderCell: (params) => (
      <Typography variant="body1" className="capitalize contents">
        {params.value.toLocaleString("en-US", {
          minimumIntegerDigits: 4,
          maximumFractionDigits: 0,
          useGrouping: false,
        })}
      </Typography>
    ),
  },
  {
    field: "startDate",
    headerName: "Ngày bắt đầu",
    headerClassName: "header",
    headerAlign: "left",
    valueGetter: (_, row) => dayjs(row.startDate, DATE_FORMAT).toDate(),
    type: "date",
    flex: 1.75,
    align: "left",
    editable: false,
    renderCell: (params) => (
      <Typography variant="body1" className="contents">
        {dayjs(params.value).format(DATE_FORMAT)}
      </Typography>
    ),
  },
  {
    field: "endDate",
    headerName: "Ngày kết thúc",
    headerClassName: "header",
    headerAlign: "left",
    valueGetter: (_, row) => dayjs(row.endDate, DATE_FORMAT).toDate(),
    type: "date",
    flex: 1.75,
    align: "left",
    editable: false,
    renderCell: (params) => (
      <Typography variant="body1" className="contents">
        {dayjs(params.value).format(DATE_FORMAT)}
      </Typography>
    ),
  },
  {
    field: "actions",
    type: "actions",
    headerClassName: "header",
    headerName: "Hành động",
    flex: 0.75,
    cellClassName: "actions",
    getActions: ({ row }) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        key="edit"
        label="Edit"
        className="textPrimary"
        onClick={() => handleEditClick(row.semesterID)}
        color="inherit"
      />,
    ],
  },
];

export default semesterColumnsSchema;
