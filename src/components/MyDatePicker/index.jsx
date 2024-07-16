/* eslint-disable react/prop-types */
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import CustomInputAdornment from "./CustomInputAdornment";

const MyDatePicker = ({
  value,
  onChange,
  label = "Date",
  disablePast = true,
  minDate,
  ...rest
}) => {
  const [error, setError] = useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        disablePast={disablePast}
        onError={setError}
        slots={{
          inputAdornment: CustomInputAdornment,
        }}
        slotProps={{
          inputAdornment: { hasError: !!error },
        }}
        minDate={minDate}
        {...rest}
      />
    </LocalizationProvider>
  );
};

export default MyDatePicker;
