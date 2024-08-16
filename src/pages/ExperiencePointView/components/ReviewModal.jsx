import { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ManagementFormStyles as styles } from "./pointViewStyle";
import DoneIcon from "@mui/icons-material/Done";
import useReview from "../hooks/useReview";
import { toastError } from "../../../utils/toast";
// eslint-disable-next-line react/prop-types
function ReviewModal({ open, handleClose, eventID }) {
  const [isApproved, setIsApproved] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    note: "",
    status: isApproved,
  });
  useEffect(() => {
    if (!open) {
      setFormData({});  
      setIsError(false);
    }
  }, [setFormData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const { handleReview } = useReview(formData, eventID);
  const handleDenied = async () => {
    setIsApproved(false);
    if (formData.note === "") {
      setIsError(true);
      toastError("Please input your note to deny the event");
      return;
    }
    await handleReview();
    handleClose();
  };
  const handleApproved = async () => {
    setIsApproved(true);
    await handleReview();
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles.managementModal}>
        <Box sx={styles.formHeader}>
          <Button onClick={handleClose}>
            <ClearIcon
              sx={{
                position: "absolute",
                left: "500px",
                top: "0px",
                width: "24px",
                height: "24px",
                color: "text.dark",
              }}
            />
          </Button>
          <Typography
            variant="h5"
            align="center"
            sx={{ mt: 3, mb: 2, fontWeight: 600 }}
          >
            Duyệt sự kiện
          </Typography>
        </Box>
        <Box
          sx={{
            ...styles.formContainer,
            width: 550,
            height: 200,
            display: "flex",
          }}
        >
          <TextField
            sx={{
              ...styles.inputField,
              width: "100%",
              margin: "0px 24px 0px 24px",
            }}
            multiline
            onChange={handleChange}
            autoComplete="off"
            variant="outlined"
            label="Lí do"
            name="note"
            error={isError}
            value={formData.note}
          />
        </Box>
        <Box sx={styles.buttonContainer}>
          <Button onClick={handleDenied} sx={styles.rejectButton}>
            Từ chối
            <ClearIcon sx={styles.clearIcon} />
          </Button>
          <Button sx={styles.approveButton} onClick={handleApproved}>
            Chấp nhận
            <DoneIcon sx={styles.addIcon} />
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ReviewModal;
