import { useContext } from "react";
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

import { PAGE_SIZE } from "../../../constant/core";
import { styles } from "../../../components/DataTable/style";
import { SemesterContext } from "../semester.context";
import useSearch from "../../../components/DataTable/hooks/useSearch";

// eslint-disable-next-line react/prop-types
const SemesterDataTable = ({ columnsSchema }) => {
  const { isLoading } = useFetchSemesters();
  const { showEditForm, rowToEdit, handleEditClick, handleEditClose } =
    useEdit();
  const {
    paginationModel,
    setPaginationModel,
    rows,
    setRows,
    originalRows,
    total,
  } = useContext(SemesterContext);
  const apiRef = useGridApiRef();
  const handleSearch = useSearch(
    originalRows,
    setRows,
    (row, searchQuery) =>
      row.year.toString().toLowerCase().includes(searchQuery) ||
      row.semester.toLowerCase().includes(searchQuery)
  );

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
          <AddToolbar />
        </Box>
        <DataGrid
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
            { value: PAGE_SIZE, label: PAGE_SIZE + "" },
            { value: -1, label: "All" },
          ]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={total}
          loading={isLoading}
          sx={styles.dataGrid}
        />
      </Box>
      {rowToEdit && (
        <SememsterEditForm
          open={showEditForm}
          handleClose={handleEditClose}
          editedRowId={rowToEdit}
        />
      )}
    </Box>
  );
};

export default SemesterDataTable;
