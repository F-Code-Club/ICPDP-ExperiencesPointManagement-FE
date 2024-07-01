import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { styles } from "./style";
import theme from "../../../../theme";
import { toastError, toastSuccess } from "../../../../utils/toast"; // Giả sử bạn có hàm toastSuccess
import axios from "../../../../config/axios";
import StudentForm from "../../../../components/Form/StudentForm";

const AddStudentToolbar = ({
  setRows,
  setOriginalRows,
  rows,
  title,
  API_ENDPOINTS,
  accessToken,
  role,
  formConfig,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleOpenForm = () => {
    setShowModal(false);
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validMimeTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!validMimeTypes.includes(file.type)) {
      toastError("Vui lòng upload file Excel hợp lệ.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await axios.post(API_ENDPOINTS.UPLOAD, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data.data;
      if (response.status === 200 || response.status === 201) {
        const id =
          rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
        const newRow = {
          ...data,
          id,
        };
        setRows((prevRows) => [...prevRows, newRow]);
        setOriginalRows((prevRows) => [...prevRows, newRow]);
        setShowModal(false);
        toastSuccess("Upload thành công!");
      } else {
        toastError(`Upload failed with status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        toastError(`Error uploading file: ${error.response.data.message}`);
      } else {
        toastError("Error uploading file.");
      }
      console.error("File upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.ADD,
        { ...formData, role },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data.data;
      if (response.status === 200 || response.status === 201) {
        const id =
          rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
        const newRow = {
          ...data,
          id,
        };
        setRows((prevRows) => [...prevRows, newRow]);
        setOriginalRows((prevRows) => [...prevRows, newRow]);
        setShowForm(false);
        toastSuccess("Thêm sinh viên thành công!");
      }
    } catch (error) {
      toastError("Saving Fail..");
      toastError(error.response.data.message);
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowModal((prev) => !prev)}
        sx={styles.addButton}
      >
        Thêm
        <AddIcon sx={{ color: "text.light", width: 15, height: 15 }} />
      </Button>

      {showModal && (
        <div
          style={{
            position: "absolute",
            right: "44px",
            top: "67px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px",
            gap: "6px",
            borderRadius: "5px",
            background: "white",
            boxShadow: "2px 4px 10px 0px rgba(0, 0, 0, 0.40)",
            zIndex: 2,
          }}
        >
          <Button
            component="label"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              color: "text.dark",
              textTransform: "none",
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0.048px",
              borderLeft: "2px solid transparent",
              borderRadius: "0",
              "&:hover": {
                borderLeft: `2px solid ${theme.palette.primary.main}`,
                color: `${theme.palette.primary.main}`,
                background: "white",
              },
              "&:active": {
                borderLeft: `2px solid ${theme.palette.primary.main}`,
                color: `${theme.palette.primary.main}`,
                background: "white",
              },
            }}
          >
            <span>Thêm từ excel</span>
            <input
              id="fileInput"
              onChange={handleFileChange}
              type="file"
              hidden
            />
          </Button>

          <Button
            onClick={handleOpenForm}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              color: "text.dark",
              textTransform: "none",
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0.048px",
              borderLeft: "2px solid transparent",
              borderRadius: "0",
              "&:hover": {
                borderLeft: `2px solid ${theme.palette.primary.main}`,
                color: `${theme.palette.primary.main}`,
                background: "white",
              },
              "&:active": {
                borderLeft: `2px solid ${theme.palette.primary.main}`,
                color: `${theme.palette.primary.main}`,
                background: "white",
              },
            }}
          >
            Thêm sinh viên
          </Button>
        </div>
      )}

      <StudentForm
        open={showForm}
        handleClose={handleCloseForm}
        title={`Thêm ${title}`}
        handleSave={handleSave}
        func={"Thêm"}
        accessToken={accessToken}
        API_ENDPOINTS={API_ENDPOINTS}
        formConfig={formConfig}
      />
    </>
  );
};

export default AddStudentToolbar;
