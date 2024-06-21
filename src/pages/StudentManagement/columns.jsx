import React from "react";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
const columnsSchema = (handleEditClick, handleDeleteClick) => [
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
    field: "studentID",
    headerName: "MSSV",
    headerClassName: "header",
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "12px 18px 12px 0px",
          gap: "18px",
        }}
      >
        <Typography variant="body1" className="ml-[12px]">
          {params.value}
        </Typography>
      </Box>
    ),

    type: "string",
    width: 200,
    align: "left",
    headerAlign: "left",
    editable: true,
  },
  {
    field: "name",
    headerName: "Họ và Tên",
    headerClassName: "header",
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "12px 18px 12px 0px",
          gap: "18px",
        }}
      >
        <Typography variant="body1" className="ml-[12px]">
          {params.value}
        </Typography>
      </Box>
    ),

    type: "string",
    width: 900,
    align: "left",
    headerAlign: "left",
    editable: true,
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
        label="Edit"
        className="textPrimary"
        onClick={() => handleEditClick(row)}
        color="inherit"
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={handleDeleteClick(row.id)}
        color="inherit"
      />,
    ],
  },
];

export default columnsSchema;
