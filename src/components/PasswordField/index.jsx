/* eslint-disable react/prop-types */
import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({
  name = "password",
  id = "password",
  label = "Password",
  showIcon = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      type={showPassword ? "text" : "password"}
      id={id}
      InputProps={{
        endAdornment: showIcon && (
          <InputAdornment
            position="end"
            sx={{ position: "absolute", right: "12px" }}
          >
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};
export default PasswordField;
