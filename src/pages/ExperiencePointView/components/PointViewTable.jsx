import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
 } from "@mui/material";
import { toastError } from "../../../utils/toast";
import WarningForm from "../../../components/Form/WarningModal";
import StudentForm from "../../../components/Form/StudentForm";
import ManagementForm from "../../../components/Form/ManagementForm";
import { styles } from "./style";
import AddToolbar from "./AddToolbar";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { selectOptions } from "./selectOptions";

const ExperiencePointTable = ({
  title,
  columnsSchema,
  initialRows,
  API_ENDPOINTS,
  accessToken,
  role,
  exportOptions,
  formConfig,
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
  const apiRef = useGridApiRef();
  console.log(columnsSchema);
  useEffect(() => {
    const rowsWithIds =
      initialRows?.map((row, index) => ({
        ...row,
        id: index + 1,
      })) || [];
    setRows(rowsWithIds);
    setOriginalRows(rowsWithIds);
  }, [initialRows]);

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
    // const currentRow = rows.find((row) => row.id === rowToEdit);
    // const ID = currentRow?.[`${role}ID`];

    // try {
    //   const updatedFormData = {
    //     ...formData,
    //     id: rowToEdit,
    //     active: formData.active,
    //   };

    //   if (!formData.password || formData.password === currentRow?.password) {
    //     delete updatedFormData.password;
    //   }

    //   const response = await axios.patch(
    //     `${API_ENDPOINTS.UPDATE}/${ID}`,
    //     { ...updatedFormData, id: rowToEdit, active: formData.active },
    //     { headers: { Authorization: `Bearer ${accessToken}` } }
    //   );
    //   if (response.status === 200 || response.status === 201) {
    //     const updatedRow = {
    //       ...formData,
    //       id: rowToEdit,
    //     };
    //     const updatedRows = rows.map((row) =>
    //       row.id === rowToEdit ? updatedRow : row
    //     );
    //     setRows(updatedRows);
    //     setOriginalRows(updatedRows);
    //     handleClose();
    //   }
    // } catch (error) {
    //   toastError("Updating Fail..");
    // }
    const updatedRow = {
      ...formData,
      id: rowToEdit,
    };
    const updatedRows = rows.map((row) =>
      row.id === rowToEdit ? updatedRow : row
    );
    setRows(updatedRows);
    setOriginalRows(updatedRows);
    handleClose();
  };

  const handleDeleteClick = (id) => () => {
    setRowToDelete(id);
    setShowDeleteForm(true);
  };

  const handleDelete = async (rowID) => {
    // const currentRow = rows.find((row) => row.id === rowID);
    // const ID = currentRow?.[`${role}ID`];
    // try {
    //   const response = await axios.delete(`${API_ENDPOINTS.DELETE}/${ID}`, {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   });

    //   if (response.status === 200 || response.status === 201) {
    //     const newRows = rows.filter((row) => row.id !== rowID);
    //     setRows(newRows.map((row, index) => ({ ...row, id: index + 1 })));
    //     setOriginalRows(
    //       newRows.map((row, index) => ({ ...row, id: index + 1 }))
    //     );
    //     handleClose();
    //   }
    // } catch (error) {
    //   toastError("Deleting Fail..");
    // }

    const newRows = rows.filter((row) => row.id !== rowID);
    setRows(newRows.map((row, index) => ({ ...row, id: index + 1 })));
    setOriginalRows(newRows.map((row, index) => ({ ...row, id: index + 1 })));
    handleClose();
  };

  const columns = columnsSchema(handleEditClick, handleDeleteClick);

  const handleClose = useCallback(() => {
    setShowDeleteForm(false);
    setShowEditForm(false);
    setRowToDelete(null);
    setShowExportForm(false);
  }, []);

  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.innerContainer}>
        <Box className="flex justify-between w-full h-[36px] mb-[50px] ">
          <Box className="flex gap-3 h-full">
            <TextField
              id="outlined-select-currency"
              select
              label="Năm học"
              placeholder="Năm học"
              sx={styles.selectField}
            >
              {selectOptions.years.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Kì học"
              placeholder="Kì học"
              sx={styles.selectField}
            >
              {selectOptions.semesters.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Tổ chức"
              placeholder="Tổ chức"
              sx={styles.selectField}
            >
              {selectOptions.clubs.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box className="flex gap-3">
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
                        sx={{ color: "text.dark", width: 15, height: 15 }}
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
              formConfig={formConfig}
            />
          </Box>
        </Box>
        <Box className="w-full border-b-2 border-neutral mb-[32px] flex justify-start gap-8">
          <AddIcon className="text-xl text-red-500 cursor-pointer" />
        </Box>
        <DataGrid
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          rows={rows}
          columns={columns}
          apiRef={apiRef}
          rowHeight={55}
          onCellDoubleClick={(e) => e.preventDefault()}
          columnHeaderHeight={48}
          disableColumnSelector
          disableRowSelectionOnClick
          disableColumnResize
          autoHeight
          getRowId={(row) => row.id}
          scrollbarSize={0}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          sx={{
            ...styles.dataGrid,
            color: "text.dark",
            width: "100%",
            borderColor: "text.dark",
            borderRadius: "8px",
            overflowX: "auto",
            "& .css-1jhlys9-MuiTablePagination-displayedRows": {
              color: "text.dark",
            },
            "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root.Mui-disabled":
              {
                color: "text.secondary",
              },
            "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root": {
              color: "text.dark",
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
              color: "text.dark",
            },
            "& .MuiDataGrid-cell": {
              borderColor: "text.dark",
            },
            "& .MuiDataGrid-footerContainer": {
              borderColor: "text.dark",
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
      <StudentForm
        open={showEditForm}
        handleClose={handleClose}
        title={`Chỉnh sửa ${title}`}
        handleSave={handleSaveClick}
        editedRow={rows.find((row) => row.id === rowToEdit)}
        func={"Sửa"}
        isEdit={isEdit}
        API_ENDPOINTS={API_ENDPOINTS}
        accessToken={accessToken}
        formConfig={formConfig}
      />
    </Box>
  );
};

export default ExperiencePointTable;