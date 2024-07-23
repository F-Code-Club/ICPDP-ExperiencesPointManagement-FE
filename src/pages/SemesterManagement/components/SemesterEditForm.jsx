import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

import { ManagementFormStyles as styles } from "../../../components/Form/style";

/* eslint-disable react/prop-types */
const SememsterEditForm = ({ open, handleClose, title, func }) => {
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
        {/* <form onSubmit={handleSubmit}>
          <Box sx={styles.formContainer}>
            <Box sx={styles.formColumn}>
              {fields.map((field) => (
                <TextField
                  key={field.name}
                  error={isEmpty[field.name]}
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  autoComplete="off"
                  variant="outlined"
                  margin="dense"
                  onChange={handleChange}
                  value={info[field.name]}
                  sx={styles.inputField}
                />
              ))}
            </Box>
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
        </form> */}
      </Box>
    </Modal>
  );
};

export default SememsterEditForm;
