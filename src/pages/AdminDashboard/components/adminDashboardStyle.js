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
    width: "100%",
    borderRadius: "8px",
    height: 650,
    borderColor: "text.dark",
    overflowX: "auto",
    overflow: "hidden",
    "& .actions": { color: "text.dark" },
    "& .textPrimary": { color: "text.dark" },
    "& .header": {
      backgroundColor: "primary.main",
    },

    "& .css-t89xny-MuiDataGrid-columnHeaderTitle": {
      padding: "0 10px",
      color: "text.light",
    },
    "&  .MuiDataGrid-withBorderColor": {
      borderBottom: "transparent !important",
    },

    "& .css-1d1ke0y-MuiDataGrid-root .MuiDataGrid-columnHeader--filledGroup .MuiDataGrid-columnHeaderTitleContainer":
      {
        borderColor: "transparent",
      },

    "& .css-1oudwrl::after": {
      backgroundColor: "transparent",
    },
    "&  .MuiDataGrid-columnHeader": {
      padding: "0",
    },
    "& .css-1jhlys9-MuiTablePagination-displayedRows": {
      color: "text.dark",
    },
    "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root.Mui-disabled": {
      color: "text.secondary",
    },
    "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root": {
      color: "text.dark",
    },
    "& .css-1b9e9gy": {
      display: "none",
    },
    "& .css-1w53k9d-MuiDataGrid-overlay": {
      backgroundColor: "transparent",
    },
    "& .MuiDataGrid-filler": {
      backgroundColor: "primary.main",
    },
    "& .css-1rtad1": {
      position: "relative",
    },
    "& .MuiDataGrid-columnHeaderDraggableContainer": {
      backgroundColor: "primary.main",
    },
    "& .css-6w2epi-MuiButtonBase-root-MuiCheckbox-root.Mui-checked": {
      color: "text.dark",
    },
    "& .MuiDataGrid-cell": {
      borderColor: "text.dark",
    },
    "& .MuiDataGrid-footerContainer": {
      borderColor: "text.dark",
      borderTop: "1px solid #000000",
    },
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

export const editModal = {
  modalContainer: {
    height: 789,
    width: 784,
    backgroundColor: "#ffffff",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
  },
  modalHeader: {
    width: "100%",
    height: 88,
    borderBottom: "2px solid #EAEAEA",
    paddingTop: "30px",
  },
  closeIcon: {
    position: "absolute",
    left: "725px",
    top: "10px",
    width: "24px",
    height: "24px",
    color: "text.dark",
  },
  inputField: {
    width: "100%",
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
      height: "45px",
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
  editButton: {
    borderRadius: "5px",
    backgroundColor: "primary.main",
    color: "text.light",
    height: 36,
    width: 73,
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.25)",
    fontSize: 12,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "text.light",
      color: "primary.main",
      border: "2px solid",
      borderColor: "primary.main",
      "& .MuiSvgIcon-root": {
        color: "primary.main",
      },
    },
  },
  cancelButton: {
    borderRadius: "5px",
    color: "text.dark",
    border: "1px solid",
    borderColor: "text.neutral",
    height: 36,
    width: 73,
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.25)",
    fontSize: 12,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "text.light",
      color: "primary.main",
      border: "2px solid",
      borderColor: "primary.main",
    },
  },
};
