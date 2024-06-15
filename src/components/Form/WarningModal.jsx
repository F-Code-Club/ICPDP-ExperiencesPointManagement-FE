import { Modal, Box, Button } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { ManagementFormStyles as styles } from "./style";

function WarningForm({ open, handleClose, handleDelete, rowId }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles.warningModal}>
        <Box sx={styles.warningHeader}>
          <WarningIcon sx={{ color: "state.warning", width: 40, height: 40 }} />
        </Box>
        <Box sx={styles.warningModalContent}>
          <h1 className="text-[16px] font-[700] text-dark-text-color">
            Xóa thông tin
          </h1>
          <h2 className="text-[12px] font-[600] text-second-text-color">
            Bạn có chắc muốn xóa thông tin chứ
          </h2>
        </Box>
        <Box sx={styles.warningModalButton}>
          <Button onClick={handleClose} sx={styles.cancelDeleteButton}>
            Hủy
          </Button>
          <Button sx={styles.deleteButton} onClick={() => handleDelete(rowId)}>
            Xóa
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default WarningForm;
