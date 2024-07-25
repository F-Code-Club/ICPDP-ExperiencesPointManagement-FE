import { Box, MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { STRING_EMPTY } from "../../constant/core";

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
          <TextField
            select
            value={value}
            label={label}
            onChange={(event) => onChange(parseValue(event.target.value))}
            error={!!error}
            helperText={error ? error.message : STRING_EMPTY}
            {...rest}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value.toString()}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Box>
  );
};

export default FormSelect;
