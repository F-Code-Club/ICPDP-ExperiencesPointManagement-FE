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
import { DataGrid } from "@mui/x-data-grid";
import WarningForm from "../../../components/Form/WarningModal";
import StudentForm from "../../../components/Form/StudentForm";
import { styles } from "./pointViewStyle";
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
  const [currentTab, setCurrentTab] = useState(0);
  const axios = useAxiosPrivate();
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [tables, setTables] = useState([
    {
      tableID: 0,
      name: "Tab 1",
      row: [],
    },
  ]);
  useEffect(() => {
    const rowsWithIds =
      initialRows?.map((row, index) => ({
        ...row,
        id: index + 1,
      })) || [];
    const updatedTables = tables.map(
      (table, index) =>
        index === currentTab ? { ...table, rows: rowsWithIds } : table //i don't know why it's rows instead of row but it actually works
    );
    setTables(updatedTables);
    setRows(rowsWithIds);
    setOriginalRows(rowsWithIds);
  }, [initialRows, currentTab]);

  useEffect(() => {
    const filteredRows = originalRows.filter(
      (row) =>
        row.name.toLowerCase().includes(searchQuery) ||
        row.studentID.toLowerCase().includes(searchQuery)
    );
    const updatedTables = tables.map((table, index) =>
      index === currentTab ? { ...table, rows: filteredRows } : table
    );
    setTables(updatedTables);
    setRows(filteredRows);
  }, [searchQuery, originalRows, currentTab]);

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

    const updatedTables = tables.map((table) => {
      if (table.tableID === currentTab) {
        return {
          ...table,
          row: updatedRows,
        };
      }
      return table;
    });
    setTables(updatedTables);

    handleClose();
  };

  const handleDeleteClick = (id) => () => {
    setRowToDelete(id);
    setShowDeleteForm(true);
  };

  const handleDelete = async (rowID) => {
    const newRows = rows.filter((row) => row.id !== rowID);

    const updatedRows = newRows.map((row, index) => ({
      ...row,
      id: index + 1,
    }));

    setRows(updatedRows);
    setOriginalRows(updatedRows);

    const updatedTables = tables.map((table) => {
      if (table.tableID === currentTab) {
        const updatedTableRows = table.row.filter((row) => row.id !== rowID);
        return {
          ...table,
          row: updatedTableRows,
        };
      }
      return table;
    });

    setTables(updatedTables);

    handleClose();
  };

  const columns = columnsSchema(handleEditClick, handleDeleteClick);

  const handleTableChange = () => {
    const newTableID = tables.length;
    const newTable = {
      tableID: newTableID,
      name: `Tab ${newTableID + 1}`,
      row: [],
    };
    setTables([...tables, newTable]);
    setCurrentTab(newTableID);
  };
  const handleTabDelete = (tableID) => {
    const newTables = tables
      .filter((table) => table.tableID !== tableID)
      .map((table, index) => ({
        ...table,
        tableID: index,
        name: `Tab ${index + 1}`,
      }));
    setTables(newTables);
    if (currentTab >= newTables.length) {
      setCurrentTab(newTables.length - 1 !== -1 ? newTables.length - 1 : 0);
    }
  };

  const handleClose = useCallback(() => {
    setShowDeleteForm(false);
    setShowEditForm(false);
    setRowToDelete(null);
    setShowExportForm(false);
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.innerContainer}>
        <Box className="flex justify-between w-full h-[36px] mb-[50px] ">
          <Box className="flex gap-3 h-full">
            <TextField
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
              currentTable={tables[currentTab]?.tableID}
              tables={tables}
              setTables={setTables}
              title={title}
              API_ENDPOINTS={API_ENDPOINTS}
              accessToken={accessToken}
              role={role}
              formConfig={formConfig}
            />
          </Box>
        </Box>
        <Tabs
          value={currentTab}
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
                    edge="end"
                    sx={{
                      position: "absolute",
                      left: "80%",
                      top: "-10px",
                      "& .css-i4bv87-MuiSvgIcon-root": {
                        width: "12px",
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        color: "text.dark",
                      },
                    }}
                    onClick={(e) => {
                      //   e.stopPropagation();
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
              hidden={currentTab !== index}
            >
              {currentTab === index && (
                <DataGrid
                  rows={table.row}
                  columns={columns}
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
