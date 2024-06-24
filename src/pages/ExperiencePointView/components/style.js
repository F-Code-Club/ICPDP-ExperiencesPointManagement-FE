import { red } from "@mui/material/colors";

export const styles = {
  addButton: {
    borderRadius: 1,
    backgroundColor: "primary.main",
    color: "text.light",
    height: 36,
    width: 73,
    padding: "10px",
    fontSize: 12,
    textTransform: "none",
  },
  pageContainer: {
    padding: "24px 20px",
    position: "relative",
    width: "100%",
  },
  innerContainer: {
    display: "block",
    width: "100%",
  },
  toolbarContainer: {
    display: "flex",
    justifyContent: "end",
    width: "full",
    height: "36px",
    marginBottom: "20px",
    gap: "24px",
  },
  searchBar: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "text.dark",
      },
      "&:hover fieldset": {
        borderColor: "text.dark",
      },
      "&.Mui-focused fieldset": {
        borderColor: "text.dark",
      },
      color: "text.dark",
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: "text.dark",
      fontSize: 12,
    },
    "& .MuiOutlinedInput-input": {
      padding: "6px",
    },
    width: 247,
  },
  dataGrid: {
    color: "text.dark",
    width: "1376px",
    border: "2px solid",
    borderRadius: "8px",
    height: 650,
    width: "full",
    overflow: "hidden",
    "& .actions": { color: "text.dark" },
    "& .textPrimary": { color: "text.dark" },
    "& .header": {
      backgroundColor: "primary.main",
      color: "text.light",
    },
    border: "1px solid",
    borderRadius: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    color: "text.light",
    backgroundColor: "text.dark",
  },
  selectField: {
    width: 130,
    borderRadius: 1,
    "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
      {
        padding: "0",
        height: 36,
        display: "flex",
        alignItems: "center",
        paddingLeft: "15px",
      },
    "& .css-ub0vj5-MuiFormLabel-root-MuiInputLabel-root ": {
      top: "-25%",
    },
  },
};
