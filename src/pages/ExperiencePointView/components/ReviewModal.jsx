import { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ManagementFormStyles as styles } from "./pointViewStyle";
import DoneIcon from "@mui/icons-material/Done";
import useReview from "../hooks/useReview";
import { toastError } from "../../../utils/toast";
// eslint-disable-next-line react/prop-types
function ReviewModal({ open, handleClose, eventID }) {
  const [isError, setIsError] = useState(false);
  const [note, setNote] = useState("");
  useEffect(() => {
    if (!open) {
      setNote({});
      setIsError(false);
    }
  }, [setNote, open]);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const { handleReview } = useReview(eventID);
  const handleDenied = async () => {
    const isApproved = false;
    if (note === "") {
      setIsError(true);
      toastError("Please input your note to deny the event");
      return;
    }
    await handleReview(isApproved, note);
    handleClose();
  };
  const handleApproved = async () => {
    const isApproved = true;
    await handleReview(isApproved, note);
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
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "478px",
            }}
            color="primary"
            multiline
            rows={4}
            onChange={handleChange}
            autoComplete="off"
            variant="outlined"
            label="Lí do"
            name="note"
            error={isError}
            value={note}
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
