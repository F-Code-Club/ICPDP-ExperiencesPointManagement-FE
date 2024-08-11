/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import useFetchRole from "../hooks/useFetchRole";
import StudentForm from "../../../components/Form/StudentForm";
import { toastError, toastSuccess } from "../../../utils/toast";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { PAGE_SIZE } from "../../../constant/core";
import useAuth from "../../../hooks/useAuth";
import { decodeToken } from "react-jwt";
import AddModal from "./AddModal";
import theme from "../../../theme";
import { styles } from "../components/pointViewStyle";
const AddToolbar = ({
  setRows,
  setOriginalRows,
  rows,
  title,
  API_ENDPOINTS,
  tables,
  setTables,
  currentTable,
  currentPage,
}) => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? decodeToken(auth.accessToken) : undefined;
  const role = decoded?.role || "";

  const { config, participantRole } = useFetchRole(
    API_ENDPOINTS,
    auth?.accessToken,
    role
  );
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const axios = useAxiosPrivate();
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleSave = async (formData) => {
    if (!auth?.accessToken) {
      return;
    }

    const studentID = formData.studentID.toUpperCase().trim();
    if (rows.some((val) => val.studentID === studentID)) {
      toastError("Student is existed in this event");
      return;
    }
    const selectedRole = formData.role;
    const roleData = participantRole.find((role) => role.role === selectedRole);
    const point = roleData?.point;

    const newRow = {
      ...formData,
      studentID,
      point,
      eventID: currentTable,
      id:
        currentPage !== 0
          ? rows.length + 1 + currentPage * PAGE_SIZE
          : rows.length + 1,
    };

    try {
      const response = await axios.post(
        `${API_ENDPOINTS.EVENTS_POINT.ADD}/${currentTable}`,
        {
          studentID,
          role: formData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": `application/json`,
          },
        }
      );
      const data = response.data.data;
      const updatedRow = {
        ...newRow,
        name: data.studentName,
        point: data.point,
        role: data.role,
      };

      setRows((prevRows) => [...prevRows, updatedRow]);
      setOriginalRows((prevRows) => [...prevRows, updatedRow]);

      const updatedTables = tables.map((table) =>
        table.eventID === currentTable
          ? { ...table, rows: [...table.rows, updatedRow] }
          : table
      );

      setTables(updatedTables);
      setShowForm(false);
      toastSuccess("Add student successfully");
    } catch (error) {
      toastError("Saving failed");
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
                color: ` ${theme.palette.primary.main}`,
                background: "white",
              },
              "&:active": {
                borderLeft: `2px solid ${theme.palette.primary.main}`,
                color: ` ${theme.palette.primary.main}`,
                background: "white",
              },
            }}
          >
            Thêm từ excel
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
                color: ` ${theme.palette.primary.main}`,
                background: "white",
              },
              "&:active": {
                borderLeft: `2px solid ${theme.palette.primary.main}`,
                color: ` ${theme.palette.primary.main}`,
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
        handleSave={handleSave}
        title={title}
        accessToken={auth?.accessToken}
        func={"Thêm"}
        formConfig={config}
      />
    </>
  );
};

export default AddToolbar;
