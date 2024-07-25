/* eslint-disable react/prop-types */
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import CustomInputAdornment from "./CustomInputAdornment";
import { STRING_EMPTY } from "../../constant/core";

const MyDatePicker = ({
  value,
  onChange,
  label = "Date",
  disablePast = false,
  minDate,
  controlError,
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
        onAccept={() => setError(null)}
        slots={{
          inputAdornment: CustomInputAdornment,
          openPickerIcon: CalendarMonthIcon,
        }}
        slotProps={{
          inputAdornment: { hasError: !!error || !!controlError },
          textField: {
            helperText: controlError?.message || STRING_EMPTY,
          },
        }}
        minDate={minDate}
        {...rest}
      />
    </LocalizationProvider>
  );
};

export default MyDatePicker;
