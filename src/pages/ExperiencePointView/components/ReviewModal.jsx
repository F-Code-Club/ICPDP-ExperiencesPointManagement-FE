import { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ManagementFormStyles as styles } from "./pointViewStyle";
import DoneIcon from "@mui/icons-material/Done";
// eslint-disable-next-line react/prop-types
function ReviewModal({ open, handleClose, handleReject }) {
  const [info, setInfo] = useState({});
  const [isApproved, setIsApproved] = useState(false);
  useEffect(() => {
    if (!open) {
      setInfo({});
    }
  }, [setInfo, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };
  console.log(info);

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
            onChange={handleChange}
            autoComplete="off"
            variant="outlined"
            label="Lí do"
            name="reason"
            value={info.reason}
          />
        </Box>
        <Box sx={styles.buttonContainer}>
          <Button onClick={() => setIsApproved(false)} sx={styles.rejectButton}>
            Từ chối
            <ClearIcon sx={styles.clearIcon} />
          </Button>
          <Button sx={styles.approveButton} onClick={() => setIsApproved(true)}>
            Chấp nhận
            <DoneIcon sx={styles.addIcon} />
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ReviewModal;
