/* eslint-disable react/prop-types */
import { useState, useCallback, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";

import AddToolbar from "./AddToolBar";
import SememsterEditForm from "./SemesterEditForm";

import useEdit from "../../../components/DataTable/hooks/useEdit";
import useFetchSemesters from "../hooks/useFetchSemesters";
import useSearchSemester from "../hooks/useSearchSemseter";

import { PAGE_SIZE } from "../../../constant/core";
import { styles } from "../../../components/DataTable/style";
import { SemesterContext } from "../semester.context";

const SemesterDataTable = ({ title, columnsSchema, role }) => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const { total, isLoading } = useFetchSemesters();
  const { showEditForm, setShowEditForm, rowToEdit, handleEditClick } =
    useEdit();
  const { paginationModel, setPaginationModel, rows } =
    useContext(SemesterContext);
  const apiRef = useGridApiRef();
  const handleSearch = useSearchSemester();

  const handleClose = useCallback(() => {
    setShowEditForm(false);
  }, [setShowEditForm]);

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
          <AddToolbar title={title} role={role} />
        </Box>
        <DataGrid
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          rows={rows}
          columns={columnsSchema(handleEditClick)}
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
          pageSizeOptions={[
            { value: PAGE_SIZE, label: PAGE_SIZE },
            { value: 0, label: "All" },
          ]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={total}
          loading={isLoading}
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
      <SememsterEditForm
        open={showEditForm}
        handleClose={handleClose}
        title={`Chỉnh sửa ${title}`}
        editedRow={rows.find((row) => row.id === rowToEdit)}
        func={"Sửa"}
      />
    </Box>
  );
};

export default SemesterDataTable;
