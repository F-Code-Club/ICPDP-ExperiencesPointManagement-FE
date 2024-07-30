/* eslint-disable react/prop-types */

import { Box, TextField, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { styles } from "./finalPointViewStyle";
import { useState } from "react";
const FinalPointTable = ({ columnsSchema, columnGroupingModel }) => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [rows, setRows] = useState([
    {
      id: "1",
      studentID: "B1809272",
    },
    {
      id: "1",
      studentID: "B1809272",
    },
  ]);
  const handleEditClick = () => {};
  const columns = columnsSchema(handleEditClick);

  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.innerContainer}>
        <Box className="flex justify-end w-full h-[36px] mb-[50px] gap-x-[12px]">
          <TextField
            className="rounded-sm border-2"
            placeholder="Tìm kiếm"
            autoComplete="off"
            variant="outlined"
            //   onChange={handleSearch}
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
          <Button
            //   onClick={handleExportClick}
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
