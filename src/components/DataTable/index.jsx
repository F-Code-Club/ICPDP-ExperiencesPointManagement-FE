import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddToolbar from "./AddToolbar";
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
  {
    id: 10,
    name: "Fcode",
    email: `test1@gmail.com`,
    password: "dasdas",
    username: "dsad",
    avatar:
      "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/440491684_953819473416997_5707415369883086073_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=0Js6PhRnegIQ7kNvgE5CJB-&_nc_ht=scontent.fsgn5-5.fna&oh=00_AYDIDKxX74BqJS65cNj99QmVjFS7UD4bJQYqnVEEHDiyuw&oe=66674F05",
  },
];

const DataTable = ({ title }) => {
  const [rows, setRows] = useState(initialRows);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditClick = (row) => {
    setRowToEdit(row.id);
    setIsEdit(true);
    setShowEditForm(true);
  };

  const handleSaveClick = (formData) => {
    console.log(formData);
    const updatedRow = {
      ...formData,
      id: rowToEdit,
      avatar:
        formData.avatar || rows.find((row) => row.id === rowToEdit)?.avatar,
      username: rows.find((row) => row.id === rowToEdit)?.username,
      password: rows.find((row) => row.id === rowToEdit)?.password,
      isNew: false,
    };

    setRows((prevRows) =>
      prevRows.map((row) => (row.id === rowToEdit ? updatedRow : row))
    );
    setRowToEdit(null);
    setShowEditForm(false);
    setIsEdit(false);
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
      resizable: false,
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
      resizable: false,
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

  return (
    <Box
      sx={styles.pageContainer}
    >
      <Box
        sx={styles.innerContainer}
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
          <AddToolbar setRows={setRows} rows={rows} title={title} />
        </Box>
        <DataGrid
          onRowClick={(row) => handleEditClick(row)}
          rows={rows}
          columns={columns}
          rowHeight={55}
          columnHeaderHeight={48}
          disableColumnSelector={true}
          disableRowSelectionOnClick={true}
          disableColumnResize={true}
          disableMultipleRowSelection={true}
          autoHeight={true}
          getRowId={(row) => row.id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          scrollbarSize={0} //hidden scrollX
          sx={{
            ...styles.dataGrid,
            color: "text.light",
            width: 1376,
            overflow: "hidden",
            "& .MuiDataGrid-root": {
              color: "blue",
            },
            "& .css-1jhlys9-MuiTablePagination-displayedRows": { //rows per page color
              color: "text.light",
            },
            "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root.Mui-disabled": //disable prev button color
              {
                color: "text.secondary",
              },
            "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root": { //prev button color
              color: "text.light",
            },
            "& .css-1b9e9gy": {
              display: "none", //hidden scrollY
            },
            "& .css-1w53k9d-MuiDataGrid-overlay ": { //no rows color
              backgroundColor: "transparent "
            },
          }}
        />
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
        editedRow={rows.find((row) => row.id === rowToEdit)}
        func={"Sửa"}
        isEdit={isEdit}
      />
    </Box>
  );
};

export default DataTable;
