import { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
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
}) {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    avatar: "",
  });

  const [isEmpty, setIsEmpty] = useState({
    name: false,
    email: false,
    username: false,
    password: false,
  });

  const [img, setImg] = useState(null);
  const [hovered, setHovered] = useState(false);
  const axios = useAxiosPrivate();

  // Handle img selection and preview
  const handleImage = (event) => {
    const file = event.target.files[0];
    setImg(file);
    if (file) {
      if (info.avatar) {
        URL.revokeObjectURL(info.avatar.preview);
      }
      setInfo((prevInfo) => ({
        ...prevInfo,
        avatar: URL.createObjectURL(file),
      }));
    }
  };

  // Handle input changes for text fields
  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Reset form when the modal is closed or a new row is being edited
  useEffect(() => {
    const resetForm = () => {
      setInfo({
        name: "",
        email: "",
        username: "",
        password: "",
        avatar: "",
      });
      setIsEmpty({
        name: false,
        email: false,
        username: false,
        password: false,
      });
    };

    if (!open || (isEdit && !editedRow)) {
      resetForm();
    } else if (isEdit && editedRow) {
      setInfo(editedRow);
    }
  }, [open, isEdit, editedRow]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      name: !info.name.trim(),
      email: !info.email.trim(),
      username: !info.username.trim() || info.username.length < 6,
      password: !info.password.trim(),
    };
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
        const response = await axios.post(
          API_ENDPOINTS.UPLOAD,
          uploadFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const imageUrl = await response.data.data.avatarURL;
        finalInfo.avatar = imageUrl;
        handleSave(finalInfo);
        handleClose();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      handleSave(finalInfo);
      resetForm();
      handleClose();
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
              <TextField
                error={isEmpty.name}
                id="name"
                name="name"
                label="Tên"
                autoComplete="off"
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={info.name}
                sx={styles.inputField}
              />
              <TextField
                error={isEmpty.email}
                id="email"
                label="Email"
                name="email"
                variant="outlined"
                autoComplete="off"
                margin="dense"
                onChange={handleChange}
                value={info.email}
                sx={styles.inputField}
              />
              <TextField
                error={isEmpty.username}
                id="username"
                label="Mã định danh"
                name="username"
                variant="outlined"
                margin="dense"
                autoComplete="off"
                onChange={handleChange}
                value={info.username}
                sx={styles.inputField}
              />
              <PasswordField
                error={isEmpty.password}
                margin="dense"
                autoComplete="off"
                onChange={handleChange}
                sx={styles.inputField}
                value={info.password}
                name="password"
              />
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
