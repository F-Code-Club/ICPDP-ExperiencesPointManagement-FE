import { TextField, Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CalculateIcon from "@mui/icons-material/Calculate";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { styles } from "./finalPointViewStyle";

import useSearchStudent from "../hooks/useSearchStudent";
import { useState, useContext } from "react";
import { FinalPointContext } from "../context/FinalPointContext";
import ExportModal from "./ExportModal";
const ToolBar = () => {
  const { rowSelectionModel } = useContext(FinalPointContext);
  const handleSearch = useSearchStudent();
  const [showForm, setShowForm] = useState(false);
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <>
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
        <Button
          sx={{
            borderRadius: 1,
            backgroundColor: "primary.main",
            color: "text.light",
            height: 36,
            width: 100,
            padding: "10px",
            fontSize: 12,
            textTransform: "none",
          }}
        >
          Tính điểm
          <CalculateIcon sx={{ color: "text.light", width: 15, height: 15 }} />
        </Button>

        <Button
          onClick={handleOpenForm}
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
        <ExportModal
          open={showForm}
          handleCloseForm={handleCloseForm}
          numberOfRow={rowSelectionModel.length}
        />
      </Box>
    </>
  );
};

export default ToolBar;
