import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { StudentFormStyles as styles } from "./style";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toastError } from "../../utils/toast";

function StudentForm({
  open,
  handleClose,
  title,
  handleSave,
  func,
  isEdit,
  editedRow,
  formConfig,
}) {
  const { fields, selectFields } = formConfig;
  // Initialize state dynamically based on formConfig
  const initState = () => {
    const initState = {};
    fields.forEach((field) => {
      initState[field.name] = "";
    });
    if (selectFields) {
      selectFields.forEach((selectField) => {
        initState[selectField.name] = selectField.options[0].value; // selectField.options[0].value is the default value
      });
    }
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
      if (errors.studentID || errors.name)
        toastError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    let finalInfo = { ...info };

    handleSave(finalInfo);
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
              {selectFields &&
                selectFields.map((selectField) => (
                  <FormControl
                    variant="outlined"
                    sx={styles.inputField}
                    key={selectField.name}
                  >
                    <InputLabel id={`${selectField.name}-label`}>
                      {selectField.label}
                    </InputLabel>
                    <Select
                      labelId={`${selectField.name}-label`}
                      id={selectField.name}
                      value={info[selectField.name]}
                      label={selectField.label}
                      name={selectField.name}
                      onChange={handleChange}
                    >
                      {selectField.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
