import { TextField, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { styles } from "./dashboardStyle";
import useSearchEvent from "../hooks/useSearchEvent";

const ToolBar = () => {
  const handleSearch = useSearchEvent();
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
      </Box>
    </>
  );
};

export default ToolBar;
