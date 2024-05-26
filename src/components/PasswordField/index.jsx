/* eslint-disable react/prop-types */
import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({
  name = "password",
  id = "password",
  label = "Password",
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <TextField
      required
      fullWidth
      name={name}
      label={label}
      type={showPassword ? "text" : "password"}
      id={id}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
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
