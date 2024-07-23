import { Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MyDatePicker from "../MyDatePicker";

// eslint-disable-next-line react/prop-types
const FormDatePicker = ({ name, control, label = "Date", ...rest }) => (
  <Controller
    name={name || "date"}
    control={control}
    rules={{ required: true }}
    render={({ field: { value, ref, onChange } }) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MyDatePicker
          label={label}
          value={value}
          inputRef={ref}
          onChange={onChange}
          {...rest}
        />
      </LocalizationProvider>
    )}
  />
);

export default FormDatePicker;
