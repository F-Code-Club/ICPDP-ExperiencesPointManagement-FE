/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import {
  Box,
  TextField,
  IconButton,
  Button,
  InputAdornment,
  FormControl,
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
import AddEventModal from "./AddEventModal";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useFetchRole from "../hooks/useFetchRole";
import { toastError, toastSuccess } from "../../../utils/toast";
import { PAGE_SIZE } from "../../../constant/core";
import useFetchSemesters from "../hooks/useFetchSemesters";
import useDebounce from "../../../hooks/useDebounce";
import useAuth from "../../../hooks/useAuth";
import SemesterSelect from "./SemesterSelect";

const ExperiencePointTable = ({
  title,
  columnsSchema,
  API_ENDPOINTS,
  accessToken,
  role,
  formConfig,
  organizationID,
}) => {
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("");
  const axios = useAxiosPrivate();
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [tables, setTables] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [total, setTotal] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [deleteEvent, setDeleteEvent] = useState(null)
  const [showDeleteEvent, setShowDeleteEvent] = useState(null);
  const { auth } = useAuth();

  const { config, participantRole } = useFetchRole(
    API_ENDPOINTS,
    accessToken,
    role
  );

  const { events, semesters, organizations } = useFetchSemesters(
    selectedSemester,
    selectedYear,
    selectedOrganization,
    setCurrentPage
  );
  // Indexing
  useEffect(() => {
    const setupTables = (eventsData) => {
      const newTables = eventsData.map((event, index) => ({
        eventID: event.eventID,
        index:
          currentPage !== 0 ? index + 1 + currentPage * PAGE_SIZE : index + 1,
        eventName: event.eventName,
        rows: [],
      }));
      setTables(newTables);
    };
    setupTables(events);
  }, [events, currentPage]);

  // Fetch data in each tables
  const fetchRows = useCallback(
    async (eventID) => {
      if (!eventID) {
        return;
      }

      setPageLoading(true);
      setTotal(0);

      try {
        const response = await axios.get(
          `${API_ENDPOINTS.EVENTS_POINT.GET}/${eventID}`,
          {
            params: {
              page: currentPage + 1,
              take: PAGE_SIZE,
            },
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toastSuccess("Get data successfully");
        }
        const data = response.data.data || [];
        const totalPage = response.data.totalPage || 0;

        const rowsWithIds = data.map((row, index) => ({
          ...row,
          name: row?.studentName,
          id:
            currentPage !== 0 ? index + 1 + currentPage * PAGE_SIZE : index + 1,
        }));

        setRows(rowsWithIds);
        setOriginalRows(rowsWithIds);

        const updatedTables = tables.map((table) =>
          table.eventID === eventID ? { ...table, rows: rowsWithIds } : table
        );

        setTables(updatedTables);
        setTotal(totalPage);
      } catch (err) {
        //empty
      } finally {
        setPageLoading(false);
      }
    },
    [
      axios,
      API_ENDPOINTS.EVENTS_POINT.GET,
      currentPage,
      auth?.accessToken,
      tables,
    ]
  );

  // Add debounce
  const debouncedFetchRows = useDebounce(fetchRows, 300);

  // Re-render rows when switch tab
  useEffect(() => {
    if (
      selectedSemester &&
      selectedYear &&
      (organizationID || selectedOrganization) &&
      currentPage !== null
    ) {
      debouncedFetchRows(currentTab);
    }
  }, [
    currentPage,
    currentTab,
    selectedOrganization,
    selectedSemester,
    selectedYear,
    organizationID,
    debouncedFetchRows,
  ]);

  useEffect(() => {
    const filteredRows = originalRows.filter(
      (row) =>
        row.name?.toLowerCase().includes(searchQuery) ||
        row.studentID?.toLowerCase().includes(searchQuery)
    );
    const updatedTables = tables.map((table) =>
      table.eventID === currentTab ? { ...table, rows: filteredRows } : table
    );
    setTables(updatedTables);
    setRows(filteredRows);
  }, [searchQuery, originalRows, currentTab]);

  // Handler for search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };

  // Handler for edit button click
  const handleEditClick = (editRow) => {
    setRowToEdit(editRow);
    setIsEdit(true);
    setShowEditForm(true);
  };
  // Handler for save button click in the edit form
  const handleSaveClick = async (formData) => {
    if (!rowToEdit) {
      return;
    }

    const studentID = formData.studentID.toUpperCase().trim();
    const selectedRole = formData.role;
    const roleData = participantRole.find((role) => role.role === selectedRole);
    const point = roleData?.point;

    const newRow = {
      ...formData,
      studentID,
      point,
      eventID: currentTab,
      id: rowToEdit.id,
    };

    try {
      const response = await axios.patch(
        `${API_ENDPOINTS.EVENTS_POINT.UPDATE}/${currentTab}&${rowToEdit.studentID}`,
        {
          ...newRow,
          name: rowToEdit.studentName,
          point: point,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = response.data.data;
      const updatedRow = { ...data, id: rowToEdit.id, name: data?.studentName };
      const updatedRows = rows.map((row) =>
        row.studentID === rowToEdit.studentID ? updatedRow : row
      );

      setRows(updatedRows);
      setOriginalRows(updatedRows);

      const updatedTables = tables.map((table) =>
        table.eventID === currentTab ? { ...table, rows: updatedRows } : table
      );

      setTables(updatedTables);
      toastSuccess("Update student successfully")
      handleClose();
    } catch (err) {
      toastError("Updating fail");
    }
  };

  // Handler for delete button click
  const handleDeleteClick = (deleteRow) => {
    console.log(deleteRow);
    setRowToDelete(deleteRow);
    setShowDeleteForm(true);
  };

  // Handler for delete confirmation
  const handleDelete = async (deleteRow) => {
    
    const studentID = deleteRow.studentID;
    try {
      const response = await axios.delete(
        `${API_ENDPOINTS.EVENTS_POINT.DELETE}/${currentTab}&${studentID}`
      );
      if (response.status === 200 || response.status === 204) {
        const newRows = rows.filter((row) => row.studentID !== studentID);
        const updatedRows = newRows.map((row, index) => ({
          ...row,
          id:
            currentPage !== 0 ? index + 1 + currentPage * PAGE_SIZE : index + 1,
        }));
        setRows(updatedRows);
        setOriginalRows(updatedRows);
        const updatedTables = tables.map((table) =>
          table.eventID === currentTab ? { ...table, rows: updatedRows } : table
        );
      
        setTables(updatedTables);
        toastSuccess("Delete student successfully")
        handleClose();
      }
    } catch (err) {
      toastError("Deleting row fail");
    }
  };
  const columns = columnsSchema(handleEditClick, handleDeleteClick, role);

  // Handler for adding a new table/event
  const handleAddTable = async (formData) => {
    try {
      if (
        !semesters ||
        !semesters[0] ||
        !organizations ||
        !organizations.length
      ) {
        return;
      }
      setShowAddEventModal(true);
      
      // eslint-disable-next-line no-prototype-builtins
      if (formData.hasOwnProperty('eventName')) {
        const response = await axios.post(
          API_ENDPOINTS.EVENTS.ADD,
          {
            ...formData,

            year: selectedYear,
            semester: selectedSemester,
            organization: selectedOrganization || organizationID,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = response.data.data;

        const newTab = {
          eventID: data.eventID,
          index: tables.length,
          eventName: data.eventName,
          rows: [],
        };
        setTables((prevTables) => [...prevTables, newTab]);
        setCurrentTab(newTab.eventID);
        toastSuccess("Add event successfully")
      }
    } catch (err) {
      toastError("Adding fail");
    } 
  };
  
  // Handler for closing modals
  const handleClose = () => {
    setShowDeleteForm(false);
    setShowEditForm(false);
    setShowDeleteEvent(false)
    setShowAddEventModal(false);
    setRowToDelete(null);
    setRowToEdit(null);
    setIsEdit(false);
  };

  // Handler for changing tabs
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setCurrentPage(0);
  };

  // show delete form
  const onTabDelete = (eventID) => {
    setShowDeleteEvent(true);
    setDeleteEvent(eventID);
  }

  // Delete Tab
  const handleTabDelete = async (eventID) => {
    try {
      const response = await axios.delete(
        `${API_ENDPOINTS.EVENTS.DELETE}/${eventID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200 || response.status === 204) {
        const newTables = tables.filter((table) => table.eventID !== eventID);

        setTables(newTables);
        setCurrentTab(newTables[newTables.length - 1].eventID || null);
      }
      handleClose();
      toastSuccess("Delete successfully")
    } catch (err) {
      toastError("Deleting event fail");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage.page);
  };
  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.innerContainer}>
        <Box className="flex justify-between w-full h-[36px] mb-[50px] ">
          <SemesterSelect
            setSelectedOrganization={setSelectedOrganization}
            setSelectedYear={setSelectedYear}
            setSelectedSemester={setSelectedSemester}
            selectedOrganization={selectedOrganization}
            selectedYear={selectedYear}
            selectedSemester={selectedSemester}
          />
          <Box className="flex gap-3">
            <FormControl>
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
            </FormControl>
            {role !== "admin" && (
              <AddToolbar
                setRows={setRows}
                setOriginalRows={setOriginalRows}
                rows={
                  tables.find((table) => table.eventID === currentTab)?.rows
                }
                currentTable={currentTab}
                tables={tables}
                setTables={setTables}
                title={title}
                API_ENDPOINTS={API_ENDPOINTS}
                accessToken={accessToken}
                role={role}
                formConfig={formConfig}
                currentPage={currentPage}
              />
            )}
          </Box>
        </Box>
        <Tabs
          value={currentTab !== "" ? currentTab : false}
          onChange={handleTabChange}
          sx={{
            marginBottom: 2,
            width: "100%",
            height: 36,
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          {events.length > 0 &&
            tables.map((table) => (
              <Tab
                key={table.eventID}
                value={table.eventID}
                onMouseEnter={() => setHovered(table.eventID)}
                onMouseLeave={() => setHovered(null)}
                sx={{
                  position: "relative",
                  "& .MuiTab-root": {
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
                      width: "100%",
                    }}
                  >
                    {role ==="admin" ? null : (<IconButton
                      edge="end"
                      sx={{
                        position: "absolute",
                        left: "80%",
                        top: "-10px",
                        "& .MuiSvgIcon-root": {
                          width: "12px",
                        },
                        "&:hover": {
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          color: "text.dark",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onTabDelete(table.eventID)
                      }}
                    >
                      <ClearIcon
                        className={`object-cover w-full h-full ${
                          hovered === table.eventID
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                    </IconButton>)}
                    {table?.eventName}
                  </Box>
                }
              />
            ))}
          {role !== "admin" && (
            <Button onClick={handleAddTable}>
              <AddIcon className="text-xl text-dark-text-color" />
            </Button>
          )}
        </Tabs>
        <Box>
          {tables.map((table) => (
            <Box
              key={table.eventID}
              role="tabpanel"
              hidden={currentTab !== table.eventID || !(events.length > 0)}
            >
              {currentTab === table.eventID && (
                <DataGrid
                  rows={rows}
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
                  rowsPerPageOptions={[PAGE_SIZE]}
                  pagination
                  paginationMode="server"
                  pageSizeOptions={[PAGE_SIZE]}
                  paginationModel={{
                    pageSize: PAGE_SIZE,
                    page: currentPage,
                  }}
                  onPaginationModelChange={handlePageChange}
                  rowCount={total * PAGE_SIZE}
                  loading={pageLoading}
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
      <WarningForm
        open={showDeleteEvent}
        handleClose={handleClose}
        handleDelete={handleTabDelete}
        rowId={deleteEvent}
      />
      <StudentForm
        open={showEditForm}
        handleClose={handleClose}
        title={`Chỉnh sửa ${title}`}
        handleSave={handleSaveClick}
        editedRow={rowToEdit}
        func={"Sửa"}
        isEdit={isEdit}
        API_ENDPOINTS={API_ENDPOINTS}
        accessToken={accessToken}
        formConfig={config}
      />
      <AddEventModal
        open={showAddEventModal}
        handleClose={handleClose}
        handleAddTable={handleAddTable}
        title={"Thêm Sự Kiện"}
        func={"Thêm "}
        setTables={setTables}
        API_ENDPOINTS={API_ENDPOINTS}
        currentTab={currentTab}
        tables={tables}
      />
    </Box>
  );
};

export default ExperiencePointTable;
