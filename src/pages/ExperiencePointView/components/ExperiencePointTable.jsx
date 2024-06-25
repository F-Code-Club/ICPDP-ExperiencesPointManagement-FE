import { useState, useEffect, useCallback } from "react";
import {
  Box,
  TextField,
  IconButton,
  Button,
  MenuItem,
  InputAdornment,
  Tabs,
  Tab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { toastError } from "../../../utils/toast";
import WarningForm from "../../../components/Form/WarningModal";
import StudentForm from "../../../components/Form/StudentForm";
import { styles } from "./style";
import AddToolbar from "./AddToolbar";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { selectOptions } from "./selectOption";

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
  const [tabValue, setTabValue] = useState(0);
  const axios = useAxiosPrivate();
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [tables, setTables] = useState([
    {
      tableID: 1,
      name: "Tab 1",
      row: [],
    },
  ]);
  const apiRef = useGridApiRef();

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
    const newRows = rows.filter((row) => row.id !== rowID);
    setRows(newRows.map((row, index) => ({ ...row, id: index + 1 })));
    setOriginalRows(newRows.map((row, index) => ({ ...row, id: index + 1 })));
    handleClose();
  };

  const columns = columnsSchema(handleEditClick, handleDeleteClick);

  const handleTableChange = () => {
    const newTable = {
      tableID: tables.length + 1,
      name: `Tab ${tables.length + 1}`,
      row: [],
    };
    setTables([...tables, newTable]);
    setTabValue(tables.length); // Switch to the new tab
  };

  const handleTabDelete = (tableID) => {
    setTables(tables.filter((table) => table.tableID !== tableID));
    setTabValue(0); // Switch to the first tab
  };

  const handleClose = useCallback(() => {
    setShowDeleteForm(false);
    setShowEditForm(false);
    setRowToDelete(null);
    setShowExportForm(false);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            marginBottom: 2,
            width: "100%",
            height: 36,
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          {tables.map((table, index) => (
            <Tab
              key={table.tableID}
              sx={{
                position: "relative",
                "& .css-qdjdaa-MuiButtonBase-root-MuiTab-root": {
                  padding: 0,
                },
                color: "text.dark",
                "&:focus": {
                  color: "primary.main",
                },
              }}
              label={
                <Box
                  tabIndex={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 12,
                  }}
                >
                  <IconButton
                    edge="start"
                    sx={{
                      position: "absolute",
                      left: "5px",
                      top: "-10px",
                      "& .css-i4bv87-MuiSvgIcon-root": {
                        width: "10px",
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTabDelete(table.tableID);
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                  {table.name}
                </Box>
              }
            />
          ))}
          <Button onClick={handleTableChange}>
            <AddIcon className="text-xl text-dark-text-color" />
          </Button>
        </Tabs>
        <Box>
          {tables.map((table, index) => (
            <Box
              key={table.tableID}
              role="tabpanel"
              hidden={tabValue !== index}
            >
              {tabValue === index && (
                <DataGrid
                  checkboxSelection
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                  }}
                  rowSelectionModel={rowSelectionModel}
                  rows={table.row}
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
                  initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                  }}
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
                    "& .css-6w2epi-MuiButtonBase-root-MuiCheckbox-root.Mui-checked":
                      {
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
              )}
            </Box>
          ))}
        </Box>
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
