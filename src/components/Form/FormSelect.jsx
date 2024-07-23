import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";

const parseValue = (value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  if (typeof value === "string" && !isNaN(Number(value))) {
    return Number(value);
  }
  return value;
};

/* eslint-disable react/prop-types */
const FormSelect = ({ name, control, label, options, ...rest }) => {
  return (
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error} sx={{ mt: 1.5 }}>
            <Select
              labelId={`${name}-label`}
              value={value}
              label={label}
              onChange={(event) => onChange(parseValue(event.target.value))}
              {...rest}
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option.value.toString()}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{error ? error.message : " "}</FormHelperText>
          </FormControl>
        )}
      />
    </Box>
  );
};

export default FormSelect;
