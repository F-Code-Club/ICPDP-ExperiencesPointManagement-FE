/* eslint-disable react/prop-types */
import { Modal, Box, Button } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { ManagementFormStyles as styles } from "../../../components/Form/style";
import useExport from "../hooks/useExport";
import { useCallback } from "react";
function ExportForm({ numberOfRow, handleCloseForm, open }) {
  const exportData = useExport();
  const handleExport = useCallback(() => {
    exportData();
  }, [exportData]);

  return (
    <Modal open={open} onClose={handleCloseForm}>
      <Box sx={styles.warningModal}>
        <Box sx={styles.warningHeader}>
          <ImportExportIcon
            sx={{ color: "state.export", width: 40, height: 40 }}
          />
        </Box>
        <Box sx={styles.warningModalContent}>
          <h1 className="text-[16px] font-[700] text-dark-text-color">
            Xuất thông tin
          </h1>
          <h2 className="text-[12px] font-[600] text-second-text-color">
            {numberOfRow === 0
              ? "Bạn có muốn xuất thông tin trang hiện ra file CSV chứ?"
              : `Bạn có muốn xuất thông tin ${numberOfRow} sinh viên ra file CSV chứ?`}
          </h2>
        </Box>
        <Box sx={styles.warningModalButton}>
          <Button onClick={handleCloseForm} sx={styles.cancelDeleteButton}>
            Hủy
          </Button>
          <Button
            sx={{
              ...styles.deleteButton,
              backgroundColor: "state.export",
              color: "text.light",
              borderColor: "state.export",
            }}
            onClick={() => {
              handleExport();
              handleCloseForm();
            }}
          >
            Xuất
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ExportForm;
