/* eslint-disable react/prop-types */
import {
  FormControl,
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { styles } from "./pointViewStyle";
import useAuth from "../../../hooks/useAuth";
import { decodeToken } from "react-jwt";
import useFetchSemesters from "../hooks/useFetchSemesters";
const SemesterSelect = ({
  setSelectedYear,
  setSelectedOrganization,
  setSelectedSemester,
  selectedYear,
  selectedOrganization,
  selectedSemester
}) => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? decodeToken(auth.accessToken) : undefined;
  const role = decoded?.role || "";
  const { years, semesters, organizations } = useFetchSemesters(
    selectedSemester,
    selectedYear,
    selectedOrganization
  );
  return (
    <Box className="flex gap-3 h-full">
      <FormControl fullWidth size="small">
        <InputLabel
          htmlFor="year-select"
          size="small"
          sx={{ textAlign: "start" }}
        >
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
          defaultValue={semesters[0]?.semester}
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

      {role === "admin" ? (
        <FormControl fullWidth size="small">
          <InputLabel
            htmlFor="organization-select"
            sx={{ textAlign: "center" }}
          >
            Tổ chức
          </InputLabel>
          <Select
            label="Tổ chức"
            size="small"
            value={selectedOrganization}
            id="organization-select"
            sx={{ ...styles.selectField }}
            onChange={(e) => setSelectedOrganization(e.target.value)}
          >
            {organizations.map((option) => (
              <MenuItem
                key={option.clubID || option.departmentID}
                value={option.clubID || option.departmentID}
              >
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <FormControl fullWidth size="small">
          <TextField
            size="small"
            defaultValue="Tổ chức"
            value={organizations[0]?.name}
            label="Tổ chức"
            id="organization-select"
            sx={{ ...styles.selectField }}
            InputProps={{
              readOnly: true,
            }}
          />
        </FormControl>
      )}
    </Box>
  );
};

export default SemesterSelect;
