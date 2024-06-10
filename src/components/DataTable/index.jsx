import React, { useState, useEffect, useCallback } from "react";
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
import { Button } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ExportForm from "../Form/ExportModal";

const DataTable = ({
  title,
  columnsSchema,
  initialRows,
  API_ENDPOINTS,
  accessToken,
  role,
}) => {
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showExportForm, setShowExportForm] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const axios = useAxiosPrivate();
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  // Set index for each row
  useEffect(() => {
    const rowsWithIds = initialRows.map((row, index) => ({
      ...row,
      id: index + 1,
    }));
    setRows(rowsWithIds);
    setOriginalRows(rowsWithIds);
  }, [initialRows]);

  // Update rows based on search query
  useEffect(() => {
    const filteredRows = originalRows.filter(
      (row) =>
        row.name.toLowerCase().includes(searchQuery) ||
        row.email.toLowerCase().includes(searchQuery)
    );
    setRows(filteredRows);
  }, [searchQuery, originalRows]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };

  const handleEditClick = (row) => {
    setRowToEdit(row.id);
    setIsEdit(true);
    setShowEditForm(true);
  };

  const handleSaveClick = async (formData) => {
    const clubID = rows.find((row) => row.id === rowToEdit)?.clubID;
    try {
      const response = await axios.patch(
        `${API_ENDPOINTS.UPDATE}/${clubID}`,
        { ...formData, id: rowToEdit },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response.status === 200 || response.status === 201) {
        const updatedRow = {
          ...formData,
          id: rowToEdit,
          avatar:
            formData.avatar || rows.find((row) => row.id === rowToEdit)?.avatar,
        };
        const updatedRows = rows.map((row) =>
          row.id === rowToEdit ? updatedRow : row
        );
        setRows(updatedRows);
        setOriginalRows(updatedRows);
        setRowToEdit(null);
        setShowEditForm(false);
        setIsEdit(false);
      }
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  const handleDeleteClick = (id) => () => {
    setRowToDelete(id);
    setShowDeleteForm(true);
  };

  const handleDelete = async (rowId) => {
    const clubID = rows.find((row) => row.id === rowId)?.clubID;
    try {
      const response = await axios.delete(`${API_ENDPOINTS.DELETE}/${clubID}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.status === 200 || response.status === 201) {
        const newRows = rows.filter((row) => row.clubID !== clubID);
        setRows(newRows.map((row, index) => ({ ...row, id: index + 1 })));
        setOriginalRows(
          newRows.map((row, index) => ({ ...row, id: index + 1 }))
        );
        setShowDeleteForm(false);
        setRowToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const columns = columnsSchema(handleEditClick, handleDeleteClick);

  const handleClose = useCallback(() => {
    setShowDeleteForm(false);
    setShowEditForm(false);
    setRowToDelete(null);
    setShowExportForm(false);
  }, []);

  const handleExportClick = () => {
    setShowExportForm(true);
  };
  console.log(showDeleteForm);
  const exportSelectedRow = () => {
    
    //TODO
    if (!rowSelectionModel.length) {
      
      return;
    }

    const selectedRows = rows.filter((row) =>
      rowSelectionModel.includes(row.id)
    );

    const fieldsToExport = ["id", "name", "email"];
    const customHeaders = ["ID", "Tên", "Email"];

    const csvHeader = customHeaders.join(",");

    const csvRows = selectedRows.map((row) =>
      fieldsToExport.map((field) => row[field]).join(",")
    );

    const csvContent = `data:text/csv;charset=utf-8,${csvHeader}\n${csvRows.join("\n")}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "selected_rows.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.innerContainer}>
        <Box className="flex justify-end w-full h-[36px] mb-[50px] gap-x-[12px]">
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
            setOriginalRows={setOriginalRows}
            rows={rows}
            title={title}
            API_ENDPOINTS={API_ENDPOINTS}
            accessToken={accessToken}
            role={role}
          />
          <Button
            onClick={handleExportClick}
            sx={{
              borderRadius: 1,
              backgroundColor: "primary.main",
              color: "text.light",
              height: 36,
              width: 73,
              padding: "10px",
              fontSize: 12,
              textTransform: "none",
            }}
          >
            Xuất
            <ImportExportIcon
              sx={{ color: "text.light", width: 15, height: 15 }}
            />
          </Button>
        </Box>
        <DataGrid
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            console.log(rowSelectionModel);
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          rows={rows}
          columns={columns}
          rowHeight={55}
          onCellDoubleClick={(e) => e.preventDefault()}
          columnHeaderHeight={48}
          disableColumnSelector
          disableRowSelectionOnClick
          autoHeight
          getRowId={(row) => row.id}
          scrollbarSize={0}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          sx={{
            ...styles.dataGrid,
            color: "text.light",
            width: "100%",
            overflowX: "auto",
            "& .css-1jhlys9-MuiTablePagination-displayedRows": {
              color: "text.light",
            },
            "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root.Mui-disabled":
              {
                color: "text.secondary",
              },
            "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root": {
              color: "text.light",
            },
            "& .css-1b9e9gy": {
              display: "none",
            },
            "& .css-1w53k9d-MuiDataGrid-overlay": {
              backgroundColor: "transparent",
            },
            "& .MuiDataGrid-filler": {
              backgroundColor: "primary.main",
            },
            "& .css-1rtad1": {
              position: "relative",
            },
            "& .MuiDataGrid-columnHeaderDraggableContainer": {
              backgroundColor: "primary.main",
            },
            "& .css-6w2epi-MuiButtonBase-root-MuiCheckbox-root.Mui-checked": {
              color: "text.light"
            }
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
      <ExportForm open={showExportForm} handleClose={handleClose} handleExport={exportSelectedRow} numberOfRow={rowSelectionModel.length}/>
    </Box>
  );
};

export default DataTable;
