import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
const MyButton = ({ children, ...buttonProps }) => (
  <Button
    {...buttonProps}
    sx={{
      color: (theme) => theme.palette.text.primary,
      textTransform: "none",
      border: (theme) => `2px solid ${theme.palette.primary.main}`,
      ":hover": {
        backgroundColor: "transparent",
        color: (theme) => theme.palette.primary[300],
      },
    }}
  >
    {children}
  </Button>
);
export default MyButton;
