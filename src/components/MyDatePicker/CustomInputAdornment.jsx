import { InputAdornment } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

// eslint-disable-next-line react/prop-types
const CustomInputAdornment = ({ hasError, children, ...other }) => (
  <InputAdornment {...other}>
    <PriorityHighIcon
      color="error"
      sx={{ marginLeft: 1, opacity: hasError ? 1 : 0 }}
    />
    {children}
  </InputAdornment>
);

export default CustomInputAdornment;
