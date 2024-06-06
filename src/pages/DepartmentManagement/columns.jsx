import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import {styles} from "../../components/DataTable/style";
const columnsSchema = (handleEditClick, handleDeleteClick) => [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "header",
    headerAlign: "left",
    type: "number",
    width: 137,
    align: "left",
    editable: false,
  },
  {
    field: "name",
    headerName: "Tên",
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
        <Avatar src={params.row.avatar} alt="Avatar" sx={styles.avatar} />
        <Typography variant="body1" className="ml-[12px]">
          {params.value}
        </Typography>
      </Box>
    ),
    
    type: "string",
    width: 539,
    align: "left",
    headerAlign: "left",
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    headerClassName: "header",
    type: "string",
    width: 560,
    editable: true,
  },
  {
    field: "actions",
    type: "actions",
    headerClassName: "header",
    headerName: "Hành động",
    width: 137,
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
