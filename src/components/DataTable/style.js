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
    width: "100%",
    borderColor: "text.dark",
    overflowX: "auto",
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
    },
  },
  avatar: {
    width: 32,
    height: 32,
    color: "text.light",
    backgroundColor: "text.dark",
  },
};
