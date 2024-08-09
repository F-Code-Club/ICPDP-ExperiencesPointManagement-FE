/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styles } from "./finalPointViewStyle";
import { useContext, useEffect } from "react";
import { FinalPointContext } from "../context/finalPointContext.jsx";
import SemesterSelect from "./SemesterSelect";
import ToolBar from "./ToolBar";
import useEdit from "../../../components/DataTable/hooks/useEdit.js";
import EditFinalPointModal from "./EditFinalPointModal.jsx";
import useFetchStudentData from "../hooks/useFetchStudentData.js";

const FinalPointTable = ({ columnsSchema, columnGroupingModel }) => {
  const {
    rowSelectionModel,
    setRowSelectionModel,
    rows,
    selectedSemester,
    selectedYear,
    setOriginalRows,
    setRows,
  } = useContext(FinalPointContext);
  const { handleEditClick, showEditForm, handleClose, rowToEdit } = useEdit();
  const columns = columnsSchema(handleEditClick);
  const { isLoading, debouncedFetchData } = useFetchStudentData();

  useEffect(() => {
    debouncedFetchData();
  }, [selectedSemester, selectedYear]);
  useEffect(() => {
    setRows([]);
    setOriginalRows([]);
  }, [selectedSemester, selectedYear]);
  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.innerContainer}>
        <Box className="flex justify-between w-full h-[36px] mb-[50px] ">
          <SemesterSelect />
          <ToolBar />
        </Box>
        <DataGrid
          loading={isLoading}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          rows={rows}
          columns={columns}
          columnGroupingModel={columnGroupingModel}
          rowHeight={55}
          onCellDoubleClick={(e) => e.preventDefault()}
          columnHeaderHeight={48}
          disableColumnSelector
          disableRowSelectionOnClick
          disableColumnResize
          autoHeight
          scrollbarSize={0}
          sx={styles.dataGrid}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        />
        {showEditForm && (
          <EditFinalPointModal
            handleClose={handleClose}
            open={showEditForm}
            rowToEdit={rowToEdit}
          />
        )}
      </Box>
    </Box>
  );
};

export default FinalPointTable;
