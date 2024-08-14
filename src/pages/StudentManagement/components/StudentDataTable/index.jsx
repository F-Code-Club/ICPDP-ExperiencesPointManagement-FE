import { useCallback, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";

import WarningForm from "../../../../components/Form/WarningModal";
import ExportForm from "../../../../components/Form/ExportModal";
import StudentForm from "../../../../components/Form/StudentForm";
import AddStudentToolbar from "../AddStudentToolbar";

import useSearch from "../../../../components/DataTable/hooks/useSearch";
import useEdit from "../../../../components/DataTable/hooks/useEdit";
import useDelete from "../../../../components/DataTable/hooks/useDelete";
import useExport from "../../../../components/DataTable/hooks/useExport";
import useFetchStudents from "../../hooks/useFetchStudents";
import useActionStudents from "../../hooks/useActionStudents";
import useAuth from "../../../../hooks/useAuth";

import { StudentContext } from "../../student.context";

import { styles } from "../../../../components/DataTable/style";
import { PAGE_SIZE, ROLE } from "../../../../constant/core";
import { searchString } from "../../../../utils/stringHelper";

// eslint-disable-next-line react/prop-types
const StudentDataTable = ({ columnsSchema, exportOptions, formConfig }) => {
  const {
    rows,
    setRows,
    originalRows,
    rowSelectionModel,
    setRowSelectionModel,
    paginationModel,
    setPaginationModel,
    total,
    setTotal,
  } = useContext(StudentContext);
  const { handleSearch, searchQuery } = useSearch(
    originalRows,
    setRows,
    setTotal,
    paginationModel,
    (row, searchQuery) =>
      searchString(row.studentID, searchQuery) ||
      searchString(row.name, searchQuery)
  );
  const { isTotalLoading, isLoading } = useFetchStudents(searchQuery);
  const {
    rowToEdit,
    showEditForm,
    setShowEditForm,
    isEdit,
    handleEditClick,
    handleEditClose,
  } = useEdit();
  const {
    showDeleteForm,
    setShowDeleteForm,
    rowToDelete,
    setRowToDelete,
    handleDeleteClick,
    handleDeleteClose,
  } = useDelete();
  const { handleSaveClick, handleDelete } = useActionStudents(
    rowToEdit,
    handleEditClose,
    handleDeleteClose
  );
  const {
    showExportForm,
    setShowExportForm,
    handleExportClick,
    exportSelectedRow,
  } = useExport();
  const apiRef = useGridApiRef();
  const { role } = useAuth();

  const handleClose = useCallback(() => {
    setShowDeleteForm(false);
    setShowEditForm(false);
    setRowToDelete(null);
    setShowExportForm(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                      sx={{ color: "text.dark", width: 15, height: 15 }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <AddStudentToolbar formConfig={formConfig(role)} />
          {role === ROLE.ADMIN && (
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
          )}
        </Box>
        <DataGrid
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          rows={rows}
          columns={columnsSchema(role, handleEditClick, handleDeleteClick)}
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
          pagination
          paginationMode="server"
          pageSizeOptions={[PAGE_SIZE]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={total}
          loading={isTotalLoading || isLoading}
          sx={styles.dataGrid}
        />
      </Box>
      {showDeleteForm && (
        <WarningForm
          open={showDeleteForm}
          handleClose={handleClose}
          handleDelete={handleDelete}
          rowId={rowToDelete}
        />
      )}
      {rowToEdit && (
        <StudentForm
          open={showEditForm}
          handleClose={handleClose}
          title="Chỉnh sửa sinh viên"
          handleSave={handleSaveClick}
          editedRow={rows.find((row) => row.id === rowToEdit)}
          func={"Sửa"}
          isEdit={isEdit}
          formConfig={formConfig(role)}
        />
      )}
      {showExportForm && (
        <ExportForm
          open={showExportForm}
          handleClose={handleClose}
          handleExport={exportSelectedRow(
            rows,
            rowSelectionModel,
            exportOptions
          )}
          numberOfRow={rowSelectionModel.length}
          title="Sinh viên"
        />
      )}
    </Box>
  );
};

export default StudentDataTable;
