import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import PasswordField from "../PasswordField";
import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { ManagementFromStyles as styles } from "./style";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toastError } from "../../utils/toast";

function ManagementForm({
  open,
  handleClose,
  title,
  handleSave,
  func,
  isEdit,
  editedRow,
  API_ENDPOINTS,
  accessToken,
  formConfig,
}) {
  const { fields, selectFields } = formConfig;

  // Initialize state dynamically based on formConfig
  const initState = () => {
    const initState = {};
    fields.forEach((field) => (initState[field.name] = ""));
    selectFields.forEach(
      (selectField) =>
        (initState[selectField.name] = selectField.options[0].value) //selectField.options[0].value is default value
    );
    initState.avatar = "";
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
  const [hovered, setHovered] = useState(false);
  const axios = useAxiosPrivate();

  // Handle img selection and preview
  const handleImage = (event) => {
    const file = event.target.files[0];
    setImg(file);
    if (file) {
      if (info.avatar) {
        URL.revokeObjectURL(info.avatar);
      }
      setInfo((prevInfo) => ({
        ...prevInfo,
        avatar: URL.createObjectURL(file),
      }));
    }
  };

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
    errors.username = !info.username.trim() || info.username.length < 6;
    setIsEmpty(errors);

    if (Object.values(errors).some((error) => error)) {
      if (errors.name) toastError("Tên không được để trống");
      if (errors.email) toastError("Email không được để trống");
      if (errors.username) toastError("Mã định danh phải có ít nhất 6 ký tự");
      if (errors.password) toastError("Mật khẩu không được để trống");
      return;
    }

    let finalInfo = { ...info };

    if (img) {
      const uploadFile = new FormData();
      uploadFile.append("file", img);

      try {
        const response = await axios.post(API_ENDPOINTS.UPLOAD, uploadFile, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const imageUrl = response.data.data.avatarURL;
        finalInfo.avatar = imageUrl;
      } catch (error) {
        toastError("Error uploading image");
        return;
      }
    }

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
                left: "702px",
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
              {fields.map((field) =>
                field.type === "password" ? (
                  <PasswordField
                    key={field.name}
                    error={isEmpty[field.name]}
                    margin="dense"
                    autoComplete="off"
                    onChange={handleChange}
                    sx={styles.inputField}
                    value={info[field.name]}
                    name={field.name}
                  />
                ) : (
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
                )
              )}
              {isEdit &&
                selectFields.map((selectField) => (
                  <Select
                    key={selectField.name}
                    labelId={selectField.name}
                    id={selectField.name}
                    value={info[selectField.name]}
                    label={selectField.label}
                    name={selectField.name}
                    onChange={handleChange}
                    sx={styles.inputField}
                  >
                    {selectField.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                ))}
            </Box>
            <Box sx={styles.imageContainer}>
              <label htmlFor="imageInput">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  style={{ display: "none" }}
                  id="imageInput"
                />
                <Box sx={styles.imagePreview}>
                  {info.avatar ? (
                    <>
                      <img
                        src={info.avatar}
                        alt="avatar"
                        className={`object-cover w-full h-full ${
                          hovered ? "opacity-50" : "opacity-100"
                        }`}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          textAlign: "center",
                          opacity: hovered ? 1 : 0,
                        }}
                      >
                        <ImageIcon sx={{ color: "text.dark" }} />
                        <Typography variant="body1" className="ml-3">
                          Thêm ảnh
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <>
                      <ImageIcon sx={{ color: "text.dark" }} />
                      <Typography variant="body1" className="ml-3">
                        Thêm ảnh
                      </Typography>
                    </>
                  )}
                </Box>
              </label>
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

export default ManagementForm;
