import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import PasswordField from "../PasswordField";

// eslint-disable-next-line react/prop-types
const FormInputText = ({ name, control, isPassword = false, ...rest }) => {
  return (
    <Controller
      name={name || "password"}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) =>
        isPassword ? (
          <PasswordField
            helperText={error ? error.message : " "}
            error={!!error}
            onChange={onChange}
            value={value}
            {...rest}
          />
        ) : (
          <TextField
            helperText={error ? error.message : " "}
            error={!!error}
            onChange={onChange}
            value={value}
            {...rest}
          />
        )
      }
    />
  );
};

export default FormInputText;
