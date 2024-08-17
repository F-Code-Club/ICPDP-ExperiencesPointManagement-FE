import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styles } from "./dashboardStyle";
import { useContext, useEffect } from "react";
import { DashboardContext } from "../context/dashboardContext";
import Toolbar from "./Toolbar";
import useFetchCurrentEvent from "../hooks/useFetchCurrentEvent";
//eslint-disable-next-line
const DashboardTable = ({ columnsSchema }) => {
  const { rowSelectionModel, rows } = useContext(DashboardContext);
  const { fetchCurrentEvent } = useFetchCurrentEvent();
  useEffect(() => {
    fetchCurrentEvent();
  }, [fetchCurrentEvent]);
  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.innerContainer}>
        <Box className="flex justify-end w-full h-[36px] mb-[50px] ">
          <Toolbar />
        </Box>
        <DataGrid
          rowSelectionModel={rowSelectionModel}
          rows={rows}
          columns={columnsSchema}
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
      </Box>
    </Box>
  );
};

export default DashboardTable;
