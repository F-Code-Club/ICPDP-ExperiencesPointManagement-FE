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
    borderRadius: "8px",
    height: 650,
    overflow: "hidden",
    "& .actions": { color: "text.dark" },
    "& .textPrimary": { color: "text.dark" },
    "& .header": {
      backgroundColor: "primary.main",
      color: "text.light",
    },
    border: "1px solid",
  },
  avatar: {
    width: 32,
    height: 32,
    color: "text.light",
    backgroundColor: "text.dark",
  },
  selectField: {
    width: 130,
    minWidth: "fit-content",
    borderRadius: 1,
    "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
      {
        position: "relative",
        padding: "0",
        height: 36,
        display: "flex",
      },
    "& .css-ub0vj5-MuiFormLabel-root-MuiInputLabel-root ": {
      padding: "0",
      top: "-25%",
    },
    textAlign: "left",
  },
};

export const ManagementFormStyles = {
  managementModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    backgroundColor: "text.light",
    color: "text.dark",
  },
  warningModal: {
    width: 400,
    height: 266,
    borderRadius: "8px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "text.light",
    color: "text.dark",
    position: "absolute",
  },
  warningHeader: {
    width: "100%",
    height: "96px",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
  },
  warningModalContent: {
    width: "100%",
    height: "74px",
    textAlign: "center",
    padding: "0px 12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  formHeader: {
    width: "100%",
    height: "88px",
    padding: "16px 0",
    position: "relative",
    marginBottom: "16px",
  },
  formContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 368,
    borderTop: "2px solid",
    borderColor: "text.neutral",
  },
  inputField: {
    width: "321px",
    "& .MuiInputLabel-root": {
      fontSize: "16px",
      color: "text.secondary",
      position: "absolute",
      top: "-4px",
      left: "4px",
      "&.Mui-focused": {
        color: "primary.main",
      },
    },
    "& .MuiOutlinedInput-root": {
      height: "120px",
      "& fieldset": {
        borderColor: "text.dark",
        border: "2px solid",
      },
      "&:hover fieldset": {
        borderColor: "text.dark",
      },
      "&.Mui-focused fieldset": {
        borderColor: "primary.main",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "10px 14px",
      fontSize: "16px",
      color: "text.dark",
    },
    "& .MuiFormHelperText-root": {
      color: "red",
      width: "max-content",
    },
  },
  formColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: 345,
    height: 288,
    padding: "12px",
    justifyContent: "center",
    margin: "16px",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "end",
    gap: "10px",
    padding: "12px 36px 40px 12px",
    height: 88,
  },
  approveButton: {
    borderRadius: "5px",
    backgroundColor: "#3A9E29",
    color: "text.light",
    height: 36,
    width: 102,
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.25)",
    fontSize: 12,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "text.light",
      color: "#3A9E29",
      border: "2px solid",
      borderColor: "#3A9E29",
      "& .MuiSvgIcon-root": {
        color: "#3A9E29",
      },
    },
  },
  rejectButton: {
    borderRadius: "5px",
    color: "text.light",
    border: "1px solid",
    borderColor: "text.neutral",
    height: 36,
    width: 102,
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.25)",
    fontSize: 12,
    textTransform: "none",
    backgroundColor: "#FF5858",
    "&:hover": {
      backgroundColor: "text.light",
      color: "#FF5858",
      border: "2px solid",
      borderColor: "#FF5858",
      "& .MuiSvgIcon-root": {
        color: "#FF5858",
      },
    },
  },
  addIcon: {
    color: "text.light",
    width: "15px",
    height: "15px",
  },
  clearIcon: {
    color: "text.light",
    width: "15px",
    height: "15px",
  },
};
