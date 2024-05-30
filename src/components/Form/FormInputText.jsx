import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import PasswordField from "../PasswordField";

const styles = {
  backgroundColor: (theme) => theme.palette.secondary.light,
  borderRadius: "5px",
  "& .MuiInputBase-input:focus": {
    boxShadow: (theme) => `2px 3px 15px 0px ${theme.palette.primary[900]}`,
  },
  "& .MuiInputBase-root::after": {
    borderBottom: "none",
  },
};

// eslint-disable-next-line react/prop-types
const FormInputText = ({ name, control, isPassword = false, ...rest }) => {
  return (
    <Controller
      name={name || "password"}
      control={control}
      render={({ field: { onChange, value } }) =>
        isPassword ? (
          <PasswordField
            variant="filled"
            onChange={onChange}
            value={value}
            sx={styles}
            {...rest}
          />
        ) : (
          <TextField
            variant="filled"
            onChange={onChange}
            value={value}
            sx={styles}
            {...rest}
          />
        )
      }
    />
  );
};

export default FormInputText;
