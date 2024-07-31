import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import EditFinalPointForm from "./EditFinalPointForm";
import ClearIcon from "@mui/icons-material/Clear";

import { editModal as styles } from "./finalPointViewStyle";

// eslint-disable-next-line react/prop-types
const EditFinalPointModal = ({ open, handleClose }) => {
  return (
    <Modal open={open}>
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
          <EditFinalPointForm />
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
          <Button sx={styles.editButton}>Sửa</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditFinalPointModal;
