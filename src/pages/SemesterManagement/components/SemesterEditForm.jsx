import { memo } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

import FormDatePicker from "../../../components/Form/FormDatePicker";
import CircularIndeterminate from "../../../components/CircularIndeterminate";
import { ManagementFormStyles as styles } from "../../../components/Form/style";
import useEditSemester from "../hooks/useEditSemester";

/* eslint-disable react/prop-types */
const EditForm = ({ editedRowId, open, handleClose }) => {
  const [handleSubmit, control, isSubmitting, watch] = useEditSemester(
    editedRowId,
    handleClose
  );
  const startDate = watch("startDate");
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles.managementModal}>
        <Box sx={styles.formHeader}>
          <Button
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 0,
              top: "16px",
              width: "24px",
              height: "24px",
              color: "text.dark",
            }}
          >
            <ClearIcon />
          </Button>
          <Typography
            variant="h5"
            align="center"
            sx={{ mt: 3, fontWeight: 600 }}
          >
            Sửa thông tin
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} className="border-t-2">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 5,
              gap: 1.5,
            }}
          >
            <FormDatePicker
              control={control}
              name="startDate"
              label="Ngày bắt đầu"
              sx={{ ...styles.inputField, width: "100%" }}
            />
            <FormDatePicker
              control={control}
              name="endDate"
              minDate={startDate}
              label="Ngày kết thúc"
              sx={{ ...styles.inputField, width: "100%" }}
            />
          </Box>
          <Box sx={styles.buttonContainer}>
            <Button onClick={handleClose} sx={styles.cancelButton}>
              Hủy
            </Button>
            <Button type="submit" sx={styles.addButton} disabled={isSubmitting}>
              Sửa
              <AddIcon sx={styles.addIcon} />
            </Button>
            {isSubmitting && <CircularIndeterminate />}
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

const SememsterEditForm = memo(EditForm);

export default SememsterEditForm;
