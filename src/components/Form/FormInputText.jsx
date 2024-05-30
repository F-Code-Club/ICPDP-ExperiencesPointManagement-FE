import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import PasswordField from "../PasswordField";
import { InputStyles } from "./style";

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
            sx={InputStyles}
            {...rest}
          />
        ) : (
          <TextField
            variant="filled"
            onChange={onChange}
            value={value}
            sx={InputStyles}
            {...rest}
          />
        )
      }
    />
  );
};

export default FormInputText;
