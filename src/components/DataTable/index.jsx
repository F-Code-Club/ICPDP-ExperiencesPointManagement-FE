import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import AddToolbar from "./AddToolbar";
import WarningForm from "../Form/WarningModal";
import ManagementForm from "../Form/ManagementForm";
import { styles } from "./style";

const DataTable = ({ title, columnsSchema, initialRows }) => {
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

  const columns = columnsSchema(handleEditClick, handleDeleteClick);

  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.innerContainer}>
        <Box className="flex justify-end w-full h-[36px] mb-[50px] gap-x-[24px]">
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
          rows={rows}
          columns={columns}
          rowHeight={55}
          onCellDoubleClick={(e) => e.preventDefault()}
          columnHeaderHeight={48}
          disableColumnSelector={true}
          disableRowSelectionOnClick={true}
          disable
          disableMultipleRowSelection={true}
          autoHeight={true}
          getRowId={(row) => row.id}
          scrollbarSize={0}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          sx={{
            ...styles.dataGrid,
            color: "text.light",
            width: "100%",
            overflowX: "auto",
            "& .MuiDataGrid-root": {
              color: "blue",
            },
            "& .css-1jhlys9-MuiTablePagination-displayedRows": {
              //rows per page color
              color: "text.light",
            },
            //disable prev button color
            "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root.Mui-disabled":
            {
                color: "text.secondary",
            },
            "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root": {
              //prev button color
              color: "text.light",
            },
            "& .css-1b9e9gy": {
              display: "none", //hidden scrollY
            },
            "& .css-1w53k9d-MuiDataGrid-overlay ": {
              //no rows color
              backgroundColor: "transparent ",
            },
            "& .MuiDataGrid-filler": {
              backgroundColor: "primary.main", //white space color when resize
            },
            // "& .css-1rtad1 ": {
            //   position: "relative", //fix scrollX
            // },
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
