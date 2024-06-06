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
    margin: "0 auto",
    position: "relative",
    top: "-10%",
    // backgroundColor: "red",
  },
  innerContainer: {
    display: "block",
    margin: "auto",
    width: "100%",
    maxWidth: "1376px",
  },
  toolbarContainer: {
    display: "flex",
    justifyContent: "end",
    width: "1376px",
    height: "36px",
    marginBottom: "20px",
    gap: "24px",
  },
  searchBar: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "text.light",
      },
      "&:hover fieldset": {
        borderColor: "text.light",
      },
      "&.Mui-focused fieldset": {
        borderColor: "text.light",
      },
      color: "text.light",
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: "text.light",
      fontSize: 12,
    },
    "& .MuiOutlinedInput-input": {
      padding: "6px",
    },
    width: 247,
  },
  dataGrid: {
    color: "text.light",
    width: "1376px",
    border: "2px solid",
    borderRadius: "8px",
    height: 650,
    width: 1376,
    overflow: "hidden",
    "& .actions": { color: "text.light" },
    "& .textPrimary": { color: "text.light" },
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
    color: "text.dark",
    backgroundColor: "text.light",
  },
};
