/* eslint-disable react/prop-types */
import { FormControl, Box, InputLabel, MenuItem, Select } from "@mui/material";
import { styles } from "./finalPointViewStyle";
import useFetchSemesters from "../hooks/useFetchSemesters.js";
import { useContext } from "react";
import { FinalPointContext } from "../context/finalPointContext.jsx";
const SemesterSelect = () => {
  const {
    selectedYear,
    setSelectedYear,
    selectedSemester,
    setSelectedSemester,
  } = useContext(FinalPointContext);
  const { years, semesters } = useFetchSemesters(
    selectedSemester,
    selectedYear
  );
  return (
    <Box className="flex gap-3 h-full">
      <FormControl fullWidth size="small">
        <InputLabel htmlFor="year-select" size="small" sx={{}}>
          Năm học
        </InputLabel>
        <Select
          size="small"
          label="Năm học"
          value={semesters[0]?.year}
          onChange={(e) => setSelectedYear(e.target.value)}
          id="year-select"
          sx={{ ...styles.selectField }}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel htmlFor="semester-select" sx={{ textAlign: "center" }}>
          Kì học
        </InputLabel>
        <Select
          label="Kì học"
          size="small"
          id="semester-select"
          onChange={(e) => setSelectedSemester(e.target.value)}
          sx={{ ...styles.selectField }}
        >
          {semesters
            .filter((option) => option.year === selectedYear)
            .map((option) => (
              <MenuItem key={option.semesterID} value={option.semester}>
                {`Kì ${option.semester}`}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SemesterSelect;
