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
  Tabs,
  Tab,
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
  const [tables, setTables] = useState([{ id: 1, rows: initialRows }]);
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
  const [tabValue, setTabValue] = useState(0);
  const apiRef = useGridApiRef();

  useEffect(() => {
    const rowsWithIds =
      initialRows?.map((row, index) => ({
        ...row,
        id: index + 1,
      })) || [];
    setOriginalRows(rowsWithIds);
  }, [initialRows]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };

  const handleEditClick = (tableId, rowId) => {
    setRowToEdit({ tableId, rowId });
    setIsEdit(true);
    setShowEditForm(true);
  };

  const handleSaveClick = async (formData) => {
    const { tableId, rowId } = rowToEdit;
    const updatedRow = { ...formData, id: rowId };
    const updatedTables = tables.map((table) =>
      table.id === tableId
        ? {
            ...table,
            rows: table.rows.map((row) =>
              row.id === rowId ? updatedRow : row
            ),
          }
        : table
    );
    setTables(updatedTables);
    handleClose();
  };

  const handleDeleteClick = (tableId, rowId) => {
    setRowToDelete({ tableId, rowId });
    setShowDeleteForm(true);
  };

  const handleDelete = async (tableId, rowId) => {
    const updatedTables = tables.map((table) =>
      table.id === tableId
        ? {
            ...table,
            rows: table.rows.filter((row) => row.id !== rowId),
          }
        : table
    );
    setTables(updatedTables);
    handleClose();
  };

  const addNewTable = () => {
    const newTable = { id: tables.length + 1, rows: [] };
    setTables([...tables, newTable]);
    setTabValue(tables.length); // Switch to the newly added tab
  };

  const columns = () => columnsSchema(handleEditClick, handleDeleteClick);

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
              setTables={setTables}
              setOriginalRows={setOriginalRows}
              tables={tables}
              title={title}
              API_ENDPOINTS={API_ENDPOINTS}
              accessToken={accessToken}
              role={role}
              formConfig={formConfig}
            />
          </Box>
        </Box>
        <Box className="w-full  mb-[32px] flex justify-start gap-8 pb-2">
          <Tabs value={tabValue} onChange={handleTabChange}>
            {tables.map((table, index) => (
              <Tab key={table.id} label={`Tab ${index + 1}`} />
            ))}
            <Tab
              icon={<AddIcon />}
              onClick={addNewTable}
              sx={{ minWidth: "48px", width: "48px" }}
            />
          </Tabs>
        </Box>
        {tables.map((table, index) => (
          <Box key={table.id} hidden={tabValue !== index}>
            <DataGrid
              checkboxSelection
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              rowSelectionModel={rowSelectionModel}
              rows={table.rows}
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
          </Box>
        ))}
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
        editedRow={tables
          .find((table) => table.id === rowToEdit?.tableId)
          ?.rows.find((row) => row.id === rowToEdit?.rowId)}
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
