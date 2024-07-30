/* eslint-disable react/prop-types */

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styles } from "./finalPointViewStyle";
import { useState, useContext } from "react";
import { FinalPointContext } from "../context/finalPointContext";
import SemesterSelect from "./SemesterSelect";
import ToolBar from "./ToolBar";
const FinalPointTable = ({ columnsSchema, columnGroupingModel }) => {
  const { rowSelectionModel, setRowSelectionModel } =
    useContext(FinalPointContext);
  const [rows, setRows] = useState([
    {
      id: "1",
      studentID: "A1809272",
      name: "Huy",
    },
    {
      id: "2",
      studentID: "B1829272",
      name: "Hiếu",
    },
  ]);
  
  const handleEditClick = () => {};
  const columns = columnsSchema(handleEditClick);

  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.innerContainer}>
        <Box className="flex justify-between w-full h-[36px] mb-[50px] ">
          <SemesterSelect />
          <ToolBar />
        </Box>
        <DataGrid
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
      </Box>
    </Box>
  );
};

export default FinalPointTable;
