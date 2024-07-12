import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import StudentForm from "../../../components/Form/StudentForm";
import { toastError, toastWarning } from "../../../utils/toast";

const AddToolbar = ({
  setRows,
  setOriginalRows,
  rows,
  title,
  API_ENDPOINTS,
  accessToken,
  tables,
  setTables,
  currentTable,
  currentPage,
  role,
}) => {
  const axios = useAxiosPrivate();
  const [showForm, setShowForm] = useState(false);
  const [participantRole, setParticipantRole] = useState([]);
  const [config, setConfig] = useState({
    fields: [{ name: "studentID", label: "MSSV", type: "text" }],
    selectFields: [],
  });

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  useEffect(() => {
    const entryRole = role.toUpperCase() + "S";
    const fetchRole = async () => {
      try {
        const response = await axios.get(
          API_ENDPOINTS[`ROLE_${entryRole}`].GET_ALL,
          {
            params: {
              page: 1,
              take: 0,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = response.data.data;
        console.log(data);

        setParticipantRole([...data]);
        setConfig((prevConfig) => ({
          ...prevConfig,
          selectFields: [
            {
              name: "role",
              label: "Tư cách tham gia",
              options: data.map((element) => ({
                value: element.role,
                label: element.role,
              })),
            },
          ],
        }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchRole();
  }, [role]);

  const handleSave = async (formData) => {
    if (!accessToken) {
      console.log("No access token");
      return;
    }

    const studentID = formData?.studentID.toUpperCase().trim();
    const selectedRole = formData?.role;
    const roleData = participantRole.find((role) => role.role === selectedRole);
    const point = roleData?.point;

    if (rows.some((row) => row.studentID === studentID)) {
      toastWarning("Student ID already exists.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_ENDPOINTS.EVENTS_POINT.ADD}/${currentTable}`,
        { ...formData, studentID, point },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = response.data.data;
      const newRow = {
        ...data,
        name: data?.studentName,
        point: data?.point,
        role: data?.role,
        eventID: currentTable,
        id:
          currentPage !== 0
            ? rows.length + 1 + currentPage * 10
            : rows.length + 1,
      };

      setRows((prevRows) => [...prevRows, newRow]);
      setOriginalRows((prevRows) => [...prevRows, newRow]);

      const updatedTables = tables.map((table) =>
        table?.eventID === currentTable
          ? { ...table, rows: [...table.rows, newRow] }
          : table
      );

      setTables(updatedTables);
      setShowForm(false);
    } catch (error) {
      toastError("Saving failed.");
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenForm}
        sx={{
          borderRadius: 1,
          backgroundColor: "primary.main",
          color: "text.light",
          height: 36,
          width: 73,
          padding: "10px",
          fontSize: 12,
          textTransform: "none",
        }}
      >
        Thêm
        <AddIcon sx={{ color: "text.light", width: 15, height: 15 }} />
      </Button>

      <StudentForm
        open={showForm}
        handleClose={handleCloseForm}
        handleSave={handleSave}
        title={title}
        accessToken={accessToken}
        func={"Thêm"}
        formConfig={config}
      />
    </>
  );
};

export default AddToolbar;
