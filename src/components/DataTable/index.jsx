import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditToolbar from "./EditToolbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import WarningForm from "../Form/WarningModal";
import ManagementForm from "../Form/ManagementForm";
import { styles } from "./style";

const initialRows = [
  { id: 1, name: "test1", email: `test1@gmail.com` },
  { id: 2, name: "test2", email: `test2@gmail.com` },
  { id: 3, name: "test3", email: `test3@gmail.com` },
  { id: 4, name: "test1", email: `test1@gmail.com` },
  { id: 5, name: "test2", email: `test2@gmail.com` },
  { id: 6, name: "test3", email: `test3@gmail.com` },
  { id: 7, name: "test1", email: `test1@gmail.com` },
  { id: 8, name: "test2", email: `test2@gmail.com` },
  { id: 9, name: "test3", email: `test3@gmail.com` },
  { id: 10, name: "Fcode", email: `test1@gmail.com` },
];

const DataTable = ({ title }) => {
  const [rows, setRows] = useState(initialRows);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleEditClick = (id) => {
    setRowToEdit(id);
    setShowEditForm(true);
  };

  const handleSaveClick = (formData) => {
    const updatedRow = {
      ...formData,
      id: rowToEdit,
      avatar: rows.find((row) => row.id === rowToEdit)?.avatar,
      isNew: false,
    };
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === rowToEdit ? updatedRow : row))
    );
    setRowToEdit(null);
    setShowEditForm(false);
  };

  const handleClose = () => {
    setShowDeleteForm(false);
    setShowEditForm(false);
    setRowToDelete(null);
  };

  const handleDeleteClick = (id) => () => {
    setRowToDelete(id);
    setShowDeleteForm(true);
  };

  const handleDelete = (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows.map((row, index) => ({ ...row, id: index + 1 })));
    setShowDeleteForm(false);
    setRowToDelete(null);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    const newRows = initialRows.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchValue) ||
        row.email.toLowerCase().includes(searchValue)
      );
    });
    setRows(newRows);
  };

  const columns = [
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
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ],
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "24px 20px",
        margin: "0 auto",
        position: "relative",
        top: "-10%",
      }}
    >
      <Box
        sx={{
          display: "block",
          margin: "auto",
          width: "100%",
          maxWidth: "1376px",
        }}
      >
        <Box className="flex justify-end w-[1376px] h-[36px] mb-20 gap-x-[24px]">
          <TextField
            className="rounded-sm border-2"
            placeholder="Tìm kiếm"
            variant="outlined"
            onChange={handleSearch}
            sx={styles.searchBar}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon
                      sx={{ color: "text.light", width: 15, height: 15 }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <EditToolbar setRows={setRows} rows={rows} title={title} />
        </Box>
        <Box sx={styles.dataContainer}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={55}
            columnHeaderHeight={48}
            editMode="row"
            getRowId={(row) => row.id}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            scrollbarSize={0} //hidden scorllX
            sx={{
              color: "text.light",
              width: 1376,
              overflow: "hidden",
              "& .MuiDataGrid-root": {
                color: "blue",
              },
              "& .css-1jhlys9-MuiTablePagination-displayedRows": {
                color: "text.light",
              },
              "& .css-i4bv87-MuiSvgIcon-root": {
                color: "text.light",
              },
              "& .css-1b9e9gy": {
                display: "none", //hidden scorllY
              },
            }}
          />
        </Box>
      </Box>
      <WarningForm
        open={showDeleteForm}
        handleClose={handleClose}
        handleDelete={handleDelete}
        rowId={rowToDelete}
      />
      <ManagementForm
        open={showEditForm}
        handleClose={handleClose}
        title={`Chỉnh sửa ${title}`}
        handleSave={handleSaveClick}
        func={"Sửa"}
      />
    </Box>
  );
};

export default DataTable;