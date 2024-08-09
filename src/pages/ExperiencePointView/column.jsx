import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";

const columnsSchema = (handleEditClick, handleDeleteClick, role) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "header",
      headerAlign: "left",
      type: "number",
      width: 100,
      align: "left",
      editable: false,
    },
    {
      field: "studentID",
      headerName: "MSSV",
      headerClassName: "header",
      type: "string",
      width: 200,
      editable: false,
    },
    {
      field: "name",
      headerName: "Họ và Tên",
      headerClassName: "header",
      renderCell: (params) => <Box>{params.value}</Box>,
      type: "string",
      width: 500,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "role",
      headerName: "Tư cách tham gia",
      headerClassName: "header",
      type: "string",
      width: 300,
      editable: false,
      renderCell: (params) => {
        return <span>{params.value}</span>;
      },
    },
    {
      field: "point",
      headerName: "Điểm cộng",
      headerClassName: "header",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: 150,
      editable: false,
    },
  ];

  if (role !== "admin") {
    columns.push({
      field: "actions",
      type: "actions",
      headerClassName: "header",
      headerName: "Hành động",
      width: 200,
      cellClassName: "actions",
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          key={row.studentID}
          label="Edit"
          className="textPrimary"
          onClick={() => handleEditClick(row)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          key={row.studentID}
          label="Delete"
          onClick={() => handleDeleteClick(row)}
          color="inherit"
        />,
      ],
    });
  }

  return columns;
};

export default columnsSchema;
