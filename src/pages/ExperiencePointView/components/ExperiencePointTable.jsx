import { useState, useEffect, useCallback } from "react";
import {
  Box,
  TextField,
  IconButton,
  Button,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
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
  const [currentTab, setCurrentTab] = useState(0);
  const axios = useAxiosPrivate();
  const [semesters, setSemesters] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [tables, setTables] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        let semestersResponse, organizationsResponse;

        if (role === "admin") {
          const [semestersRes, clubsRes, departmentsRes] = await Promise.all([
            axios.get(API_ENDPOINTS.SEMESTERS.GET, {
              params: { page: 1, take: 0 },
              headers,
            }),
            axios.get(API_ENDPOINTS.CLUBS.GET_ALL, {
              params: { page: 1, take: 0 },
              headers,
            }),
            axios.get(API_ENDPOINTS.DEPARTMENTS.GET_ALL, {
              params: { page: 1, take: 0 },
              headers,
            }),
          ]);

          semestersResponse = semestersRes.data.data;
          const clubsData = clubsRes.data.data;
          const departmentsData = departmentsRes.data.data;

          organizationsResponse = [...clubsData, ...departmentsData];
        } else {
          [semestersResponse, organizationsResponse] = await Promise.all([
            axios.get(API_ENDPOINTS.SEMESTERS.GET, {
              params: { page: 1, take: 0 },
              headers,
            }),
            role === "club"
              ? axios.get(`${API_ENDPOINTS.CLUBS.GET}/${organizationID}`, {
                  headers,
                })
              : axios.get(
                  `${API_ENDPOINTS.DEPARTMENTS.GET}/${organizationID}`,
                  { headers }
                ),
          ]);

          semestersResponse = semestersResponse.data.data;
          console.log(semestersResponse);
          organizationsResponse = [organizationsResponse.data.data];
        }
        setSemesters(semestersResponse);
        setOrganizations(organizationsResponse);
        if (semestersResponse && organizationsResponse) {
          fetchEvents(semestersResponse, organizationsResponse);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    const fetchEvents = async (semestersData, organizationData) => {
      if (!semestersData || !organizationData) {
        return;
      }
      setEvents([]);
      setupTables([]);
      try {
        const response = await axios.get(API_ENDPOINTS.EVENTS.GET_ALL, {
          params: {
            organization: selectedOrganization || organizationID,
            year: selectedYear,
            semester: selectedSemester,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const eventData = response.data.data;
        setEvents(eventData);
        setupTables(eventData);
      } catch (err) {
        console.log("Error fetching events:", err);
      }
    };

    fetchData();
  }, [
    role,
    organizationID,
    accessToken,
    selectedYear,
    selectedSemester,
    selectedOrganization,
  ]);
  useEffect(() => {
    const fetchRows = async (eventID) => {
      setPageLoading(true);
      setTables([]);
      setTotal(0);
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.EVENTS_POINT.GET}/${eventID}`,
          {
            params: {
              page: currentPage + 1,
              take: pageSize,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = response.data.data || [];
        const totalPage = response.data.totalPage;
        console.log("Rows Fetching ", data);
        const rowsWithIds =
          data.map((row, index) => ({
            ...row,
            name: row?.studentName,
            id: currentPage !== 0 ? index + 1 + currentPage * 10 : index + 1,
          })) || [];
        setRows(rowsWithIds);
        setOriginalRows(rowsWithIds);
        const updatedTables = tables.map((table) =>
          table.eventID === eventID ? { ...table, rows: rowsWithIds } : table
        );
        setTables(updatedTables);
        setTotal(totalPage);
      } catch (err) {
        console.log("Error fetching rows:", err);
      }
      setPageLoading(false);
    };
    fetchRows(currentTab);
  }, [currentPage, pageSize, currentTab, selectedOrganization]);

  const setupTables = (eventsData) => {
    const newTables = eventsData.map((event, index) => ({
      eventID: event.eventID,
      index: currentPage !== 0 ? index + 1 + currentPage * 10 : index + 1,
      eventName: event.eventName,
      rows: [],
    }));
    setTables(newTables);
  };

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
    try {
      const response = await axios.patch(
        `${API_ENDPOINTS.EVENTS_POINT.UPDATE}/${currentTab}&${rowToEdit.studentID}`,
        {
          ...formData,
          name: rowToEdit?.studentName,
        }
      );
      const data = await response.data.data;
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
      handleClose();
      console.log(response);
    } catch (err) {
      console.log("Error updating row:", err);
    }
  };

  // Handler for delete button click
  const handleDeleteClick = (deleteRow) => {
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
          id: currentPage !== 0 ? index + 1 + currentPage * 10 : index + 1,
        }));
        setRows(updatedRows);
        setOriginalRows(updatedRows);
        const updatedTables = tables.map((table) =>
          table.eventID === currentTab ? { ...table, rows: updatedRows } : table
        );
        setTables(updatedTables);
        handleClose();
      }
    } catch (err) {
      console.log("Error deleting row:", err);
    }
  };

  const columns = columnsSchema(handleEditClick, handleDeleteClick, role);

  // Handler for adding a new table/event
  const handleAddTable = async (formData) => {
    setShowAddEventModal(true);
    try {
      if (
        !semesters ||
        !semesters[0] ||
        !organizations ||
        organizations.length === 0
      ) {
        console.error("Semesters or organizations data not available.");
        return;
      }

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
      console.log(data);
      if (response.status === 200 || response.status === 201) {
        const newTab = {
          eventID: data.eventID,
          index: tables.length,
          eventName: data.eventName,
          rows: [],
        };
        setTables((prevTables) => [...prevTables, newTab]);
        setCurrentTab(newTab.eventID);
      }
    } catch (err) {
      console.log("Error adding event:", err);
    }
  };
  // Handler for closing modals
  const handleClose = () => {
    setShowDeleteForm(false);
    setShowEditForm(false);
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

        if (newTables.length === 0) {
          setCurrentTab(0);
        } else if (currentTab >= newTables.length) {
          setCurrentTab(newTables.length - 1);
        } else {
          setCurrentTab(currentTab);
        }
      }
    } catch (err) {
      console.log("Error deleting event:", err);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage.page);
  };

  const years = Array.from(
    new Set(
      semesters
        .map((semester) => {
          const year = semester?.year;
          return year && !isNaN(year) ? year : null;
        })
        .filter((year) => year !== null)
    )
  );
  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.innerContainer}>
        <Box className="flex justify-between w-full h-[36px] mb-[50px] ">
          <Box className="flex gap-3 h-full">
            <FormControl fullWidth size="small">
              <InputLabel
                htmlFor="year-select"
                size="small"
                sx={{ textAlign: "start" }}
              >
                Năm học
              </InputLabel>
              <Select
                size="small"
                label="Năm học"
                value={semesters[0]?.year}
                onChange={(e) => setSelectedYear(e.target.value)}
                id="year-select"
                sx={{ ...styles.selectField }}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel
                htmlFor="semester-select"
                sx={{ textAlign: "center" }}
              >
                Kì học
              </InputLabel>
              <Select
                label="Kì học"
                size="small"
                defaultValue={semesters[0]?.semester}
                id="semester-select"
                onChange={(e) => setSelectedSemester(e.target.value)}
                sx={{ ...styles.selectField }}
              >
                {semesters
                  .filter((option) => option.year === selectedYear)
                  .map((option) => (
                    <MenuItem key={option.semesterID} value={option.semester}>
                      {`Kì ${option.semester}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {role === "admin" ? (
              <FormControl fullWidth size="small">
                <InputLabel
                  htmlFor="organization-select"
                  sx={{ textAlign: "center" }}
                >
                  Tổ chức
                </InputLabel>
                <Select
                  label="Tổ chức"
                  size="small"
                  value={selectedOrganization}
                  id="organization-select"
                  sx={{ ...styles.selectField }}
                  onChange={(e) => setSelectedOrganization(e.target.value)}
                >
                  {organizations.map((option) => (
                    <MenuItem
                      key={option.clubID || option.departmentID}
                      value={option.clubID || option.departmentID}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <FormControl fullWidth size="small">
                <TextField
                  size="small"
                  defaultValue="Tổ chức"
                  value={organizations[0]?.name}
                  label="Tổ chức"
                  id="organization-select"
                  sx={{ ...styles.selectField }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            )}
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
          value={currentTab}
          onChange={handleTabChange}
          sx={{
            marginBottom: 2,
            width: "100%",
            height: 36,
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          {events.length > 0 &&
            tables.map((table, index) => (
              <Tab
                key={table.eventID}
                value={table.eventID}
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
                    <IconButton
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
                        handleTabDelete(table.eventID);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                    {table?.eventName}
                  </Box>
                }
              />
            ))}
          <Button onClick={handleAddTable}>
            <AddIcon className="text-xl text-dark-text-color" />
          </Button>
        </Tabs>
        <Box>
          {tables.map((table, index) => (
            <Box
              key={table.eventID}
              role="tabpanel"
              hidden={currentTab !== table.eventID || !(events.length > 0)}
            >
              {currentTab === table.eventID && (
                <DataGrid
                  rows={table.rows}
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
                  rowsPerPageOptions={[10]}
                  pagination
                  paginationMode="server"
                  paginationModel={{
                    pageSize: pageSize,
                    page: currentPage,
                  }}
                  onPaginationModelChange={handlePageChange}
                  rowCount={total * 10}
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
        formConfig={formConfig}
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
