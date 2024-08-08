/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styles } from "./finalPointViewStyle";
import { useContext } from "react";
import { FinalPointContext } from "../context/FinalPointContext.jsx";
import SemesterSelect from "./SemesterSelect";
import ToolBar from "./ToolBar";
import useFetchStudentData from "../hooks/useFetchStudentData.js";
import useEdit from "../../../components/DataTable/hooks/useEdit.js";
import EditFinalPointModal from "./EditFinalPointModal.jsx";
import EmptyTable from "./EmptyTable.jsx";
const FinalPointTable = ({ columnsSchema, columnGroupingModel }) => {
  const { rowSelectionModel, setRowSelectionModel, rows } =
    useContext(FinalPointContext);
  useFetchStudentData();
  const { handleEditClick, showEditForm, handleClose } = useEdit();

  const columns = columnsSchema(handleEditClick);

  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.innerContainer}>
        <Box className="flex justify-between w-full h-[36px] mb-[50px] ">
          <SemesterSelect />
          <ToolBar />
        </Box>
        <DataGrid
          slots={{
            noRowsOverlay: EmptyTable,
          }}
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
          getRowId={(row) => row.id}
          scrollbarSize={0}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          sx={styles.dataGrid}
        />
        {showEditForm && (
          <EditFinalPointModal handleClose={handleClose} open={showEditForm} />
        )}
      </Box>
    </Box>
  );
};

export default FinalPointTable;
