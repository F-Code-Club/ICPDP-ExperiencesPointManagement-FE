export const InputStyles = {
  backgroundColor: (theme) => theme.palette.secondary.light,
  borderRadius: "5px",
  "& .MuiInputBase-input:focus": {
    boxShadow: (theme) => `2px 3px 15px 0px ${theme.palette.primary[900]}`,
  },
  "& .MuiInputBase-root::after": {
    borderBottom: "none",
  },
};
