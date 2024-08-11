import { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import useAddStudents from "../hooks/useAddStudents";
import StudentForm from "../../../components/Form/StudentForm";

import theme from "../../../theme";
import { styles } from "../../../components/DataTable/style";

// eslint-disable-next-line react/prop-types
const AddStudentToolbar = ({ formConfig }) => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { handleSave, handleFileChange, uploading } = useAddStudents(
    setShowForm,
    setShowModal
  );

  const handleOpenForm = useCallback(() => {
    setShowModal(false);
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => setShowForm(false), []);

  return (
    <>
      <Button
        onClick={() => setShowModal((prev) => !prev)}
        sx={styles.addButton}
        disabled={uploading}
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
      {showForm && (
        <StudentForm
          title="Thêm sinh viên"
          open={showForm}
          handleClose={handleCloseForm}
          handleSave={handleSave}
          func="Thêm"
          formConfig={formConfig}
        />
      )}
    </>
  );
};

export default AddStudentToolbar;
