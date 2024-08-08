/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

import useAuth from "../../hooks/useAuth";

import { StudentFormStyles as styles } from "./style";
import { toastError } from "../../utils/toast";
import { ROLE } from "../../constant/core";

function StudentForm({
  open,
  handleClose,
  handleSave,
  func,
  isEdit,
  editedRow,
  formConfig,
  title,
}) {
  const { fields } = formConfig;
  const { role } = useAuth();
  const isAdmin = useMemo(() => role === ROLE.ADMIN, [role]);

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
      // Show error based on role
      if (errors.studentID || (isAdmin && errors?.name))
        toastError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    handleSave({ ...info });
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
