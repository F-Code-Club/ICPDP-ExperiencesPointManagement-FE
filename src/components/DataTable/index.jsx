import React, { useState, useEffect } from "react";
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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DataTable = ({
  title,
  columnsSchema,
  initialRows,
  API_ENDPOINTS,
  accessToken,
  role,
}) => {
  const [rows, setRows] = useState([]);
  const axios = useAxiosPrivate();
  //set Index for each row
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rowsWithIds = initialRows.map((row, index) => {
          return { ...row, id: index + 1 };
        });
        setRows(rowsWithIds);
      } catch (error) {
        console.error("Error while setting rows with IDs:", error);
      }
    };
    fetchData();
  }, [initialRows]);
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

  const handleSaveClick = async (formData) => {
    const clubID = await rows.find((row) => row.id === rowToEdit)?.clubID;
    try {
      const response = await axios.patch(
        `${API_ENDPOINTS.UPDATE}/${clubID}`,
        {
          ...formData,
          id: rowToEdit,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200 || 201) {
        const updatedRow = {
          ...formData,
          id: rowToEdit,
          avatar:
            formData.avatar || rows.find((row) => row.id === rowToEdit)?.avatar,
        };
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === rowToEdit ? updatedRow : row))
        );
        setRowToEdit(null);
        setShowEditForm(false);
        setIsEdit(false);
        return;
      }
    } catch (error) {
      console.error("Error updating row:", error);
    }
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

  const handleDelete = async (rowId) => {
    const clubID = await rows.find((row) => row.id === rowId)?.clubID;
    try {
      const response = await axios.delete(`${API_ENDPOINTS.DELETE}/${clubID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      if (response.status === 200 || 201) {
        const newRows = rows.filter((row) => row.clubID !== clubID);
       setRows(newRows.map((row, index) => ({ ...row, id: index + 1 })));
        setShowDeleteForm(false);
        setRowToDelete(null);
        handleClose();
        return;
      }
    } catch (error) {
      console.error("Error deleting row:", error);
    }
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
            autoComplete="off"
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
          <AddToolbar
            setRows={setRows}
            rows={rows}
            title={title}
            API_ENDPOINTS={API_ENDPOINTS}
            accessToken={accessToken}
            role={role}
          />
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={55}
          onCellDoubleClick={(e) => e.preventDefault()}
          columnHeaderHeight={48}
          disableColumnSelector={true}
          disableRowSelectionOnClick={true}
          disableMultipleRowSelection={true}
          autoHeight={true}
          getRowId={(row) => row.id}
          scrollbarSize={0}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          // autoPageSize={true}
          sx={{
            ...styles.dataGrid,
            color: "text.light",
            width: "100%",
            overflowX: "auto",
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
            "& .css-1rtad1 ": {
              position: "relative",
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
        API_ENDPOINTS={API_ENDPOINTS}
        accessToken={accessToken}
      />
    </Box>
  );
};

export default DataTable;
