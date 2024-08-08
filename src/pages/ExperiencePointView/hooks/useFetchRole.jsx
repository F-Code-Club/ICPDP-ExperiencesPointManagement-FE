import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toastError } from "../../../utils/toast";

const useFetchRole = (API_ENDPOINTS, accessToken, role) => {
  const axios = useAxiosPrivate();
  const [config, setConfig] = useState({
    fields: [{ name: "studentID", label: "MSSV", type: "text" }],
    selectFields: [],
  });
  const [participantRole, setParticipantRole] = useState([]);
  const [hasError, setHasError] = useState(false);

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

        setHasError(false);
      } catch (err) {
        if (!hasError) {
          toastError("Failed to fetch roles. Please try again later.");
          setHasError(true);
        }
      }
    };
    fetchRole();
  }, [role, API_ENDPOINTS, accessToken, axios, hasError]);

  return { config, participantRole };
};

export default useFetchRole;
