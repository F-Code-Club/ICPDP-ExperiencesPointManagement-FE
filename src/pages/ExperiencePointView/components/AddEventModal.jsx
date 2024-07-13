import { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { ManagementFormStyles as styles } from "../../../components/Form/style";

function AddEventModal({ open, handleClose, title, handleAddTable, func }) {
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (!open) {
      setInfo({});
    }
  }, [setInfo, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTable(info);
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
            {title}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
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
              label="Tên sự kiện"
              name="eventName"
              value={info.eventName}
            />
          </Box>
          <Box sx={styles.buttonContainer}>
            <Button onClick={handleClose} sx={styles.cancelButton}>
              Hủy
            </Button>
            <Button type="submit" sx={styles.addButton}>
              {func}
              <AddIcon sx={styles.addIcon} />
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AddEventModal;
