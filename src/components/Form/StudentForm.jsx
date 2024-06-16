import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { StudentFormStyles as styles } from "./style";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toastError } from "../../utils/toast";

// Import formConfig with fields definition
import { formConfig } from "../../pages/StudentManagement/formConfig";

function StudentForm({
  open,
  handleClose,
  title,
  handleSave,
  func,
  isEdit,
  editedRow,
  API_ENDPOINTS,
  accessToken,
}) {
  const { fields } = formConfig;

  // Initialize state dynamically based on formConfig
  const initState = () => {
    const initState = {};
    fields.forEach((field) => (initState[field.name] = ""));
    return initState;
  };

  // Initialize errors dynamically based on formConfig
  const initializeErrors = () => {
    const errors = {};
    fields.forEach((field) => (errors[field.name] = false));
    return errors;
  };

  const [info, setInfo] = useState(initState);
  const [isEmpty, setIsEmpty] = useState(initializeErrors);
  const [img, setImg] = useState(null);
  const axios = useAxiosPrivate();

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form when the modal is closed or a new row is being edited
  useEffect(() => {
    if (!open || (isEdit && !editedRow)) {
      setInfo(initState);
      setIsEmpty(initializeErrors);
    } else if (isEdit && editedRow) {
      setInfo(editedRow);
    }
  }, [open, isEdit, editedRow]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = fields.reduce((acc, field) => {
      acc[field.name] = !info[field.name].trim();
      return acc;
    }, {});
    setIsEmpty(errors);

    if (Object.values(errors).some((error) => error)) {
      if (errors.username) toastError("Vui lòng điền đầy đủ thông tin.");
      if (errors.name) toastError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    let finalInfo = { ...info };

    try {
      const response = await axios.post(API_ENDPOINTS.STUDENTS.ADD, finalInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toastSuccess("Thêm sinh viên thành công!");
      handleSave(response.data);
      handleClose();
    } catch (error) {
      toastError("Error saving student");
      return;
    }
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
        </form>
      </Box>
    </Modal>
  );
}

export default StudentForm;
