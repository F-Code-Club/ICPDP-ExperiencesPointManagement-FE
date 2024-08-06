import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { ROLE } from "../../constant/core";
const columnsSchema = (role, handleEditClick, handleDeleteClick) => [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "header",
    headerAlign: "left",
    type: "number",
    flex: 0.35,
    align: "left",
    editable: false,
  },
  {
    field: "studentID",
    headerName: "MSSV",
    headerClassName: "header",
    flex: 1,
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
    align: "left",
    headerAlign: "left",
    editable: false,
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
    flex: 2,
    type: "string",
    align: "left",
    headerAlign: "left",
    editable: false,
  },
  {
    field: "actions",
    type: "actions",
    headerClassName: "header",
    headerName: "Hành động",
    flex: 0.75,
    cellClassName: "actions",
    getActions: ({ row }) => {
      const deleteAction = (
        <GridActionsCellItem
          icon={<DeleteIcon />}
          key="delete"
          label="Delete"
          onClick={handleDeleteClick(row.id)}
          color="inherit"
        />
      );
      return role === ROLE.ADMIN
        ? [
            <GridActionsCellItem
              icon={<EditIcon />}
              key="edit"
              label="Edit"
              className="textPrimary"
              onClick={() => handleEditClick(row)}
              color="inherit"
            />,
            deleteAction,
          ]
        : [deleteAction];
    },
  },
];

export default columnsSchema;
