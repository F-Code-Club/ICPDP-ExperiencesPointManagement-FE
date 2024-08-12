import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import EditFinalPointForm from "./EditFinalPointForm";
import ClearIcon from "@mui/icons-material/Clear";
import useEditPoint from "../hooks/useEditPoint";
import { editModal as styles } from "./finalPointViewStyle";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
const EditFinalPointModal = ({ open, handleClose, rowToEdit }) => {
  const [updatedData, setUpdatedData] = useState({});
  const { updateRow } = useEditPoint(rowToEdit);

  const handleFormData = (formData) => {
    setUpdatedData(formData);
  };

  const handleSubmit = () => {
    updateRow(updatedData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles.modalContainer}>
        <Box sx={styles.modalHeader}>
          <IconButton sx={styles.closeIcon} onClick={handleClose}>
            <ClearIcon />
          </IconButton>
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ color: "text.dark", fontWeight: "bold" }}
          >
            Chỉnh sửa điểm cộng
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 608,
            padding: "40px 24px",
          }}
        >
          <EditFinalPointForm
            rowToEdit={rowToEdit}
            handleFormData={handleFormData}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 88,
            justifyContent: "flex-end",
            display: "flex",
            gap: 1,
            padding: "0 24px",
          }}
        >
          <Button sx={styles.cancelButton} onClick={handleClose}>
            Hủy
          </Button>
          <Button sx={styles.editButton} type="submit" onClick={handleSubmit}>
            Sửa
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditFinalPointModal;
