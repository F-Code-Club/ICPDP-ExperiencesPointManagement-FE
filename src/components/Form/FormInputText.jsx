import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import PasswordField from "../PasswordField";
import { InputStyles } from "./style";
import { STRING_EMPTY } from "../../constant/core";

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
            value={value || STRING_EMPTY}
            sx={InputStyles}
            showIcon
            {...rest}
          /> 
        ) : (
          <TextField
            variant="filled"
            onChange={onChange}
            value={value || STRING_EMPTY}
            sx={InputStyles}
            {...rest}
          />
        )
      }
    />
  );
};

export default FormInputText;
