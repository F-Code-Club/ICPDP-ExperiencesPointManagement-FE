import { useEffect, useState, useMemo} from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { decodeToken } from "react-jwt";
import { toastError } from "../../../utils/toast";
import { API_ENDPOINTS } from "../../../utils/api";
const useFetchSemester = (
  selectedSemester,
  selectedYear,
  selectedOrganization,
) => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? decodeToken(auth.accessToken) : undefined;
  const role = decoded?.role || "";
  const axios = useAxiosPrivate();
  const [semesters, setSemesters] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${auth?.accessToken}`,
        };
        let semestersResponse, organizationsResponse;

        if (role === "admin") {
          const [semestersRes, clubsRes, departmentsRes] = await Promise.all([
            axios.get(API_ENDPOINTS.SEMESTERS.GET, {
              params: { page: 1, take: 0 },
              headers,
            }),
            axios.get(API_ENDPOINTS.CLUBS.GET_ALL, {
              params: { page: 1, take: 0 },
              headers,
            }),
            axios.get(API_ENDPOINTS.DEPARTMENTS.GET_ALL, {
              params: { page: 1, take: 0 },
              headers,
            }),
          ]);

          semestersResponse = semestersRes.data.data;
          const clubsData = clubsRes.data.data;
          const departmentsData = departmentsRes.data.data;

          organizationsResponse = [...clubsData, ...departmentsData];
        } else {
          [semestersResponse, organizationsResponse] = await Promise.all([
            axios.get(API_ENDPOINTS.SEMESTERS.GET, {
              params: { page: 1, take: 0 },
              headers,
            }),
            role === "club"
              ? axios.get(
                  `${API_ENDPOINTS.CLUBS.GET}/${decoded?.organizationID}`,
                  {
                    headers,
                  }
                )
              : axios.get(
                  `${API_ENDPOINTS.DEPARTMENTS.GET}/${decoded?.organizationID}`,
                  { headers }
                ),
          ]);

          semestersResponse = semestersResponse.data.data;
          organizationsResponse = [organizationsResponse.data.data];
        }
        setSemesters(semestersResponse);
        setOrganizations(organizationsResponse);
        if (semestersResponse && organizationsResponse) {
          fetchEvents(semestersResponse, organizationsResponse);
        }
      } catch (err) {
        //empty
      }
    };

    const fetchEvents = async (semestersData, organizationData) => {
      if (!semestersData || !organizationData) {
        return;
      }
      setEvents([]);
      try {
        const response = await axios.get(API_ENDPOINTS.EVENTS.GET_ALL, {
          params: {
            organization: selectedOrganization || decoded?.organizationID,
            year: selectedYear,
            semester: selectedSemester,
          },
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });

        const eventData = response.data.data;
        setEvents(eventData);
      } catch (err) {
        toastError("Getting events fail");
      }
    };

    fetchData();
  }, [
    role,
    decoded?.organizationID,
    auth?.accessToken,
    selectedYear,
    selectedSemester,
    selectedOrganization,
    axios,
  ]);
  const years = useMemo(() => {
    return Array.from(
      new Set(
        semesters
          .map((semester) => {
            const year = parseInt(semester?.year, 10);
            return !isNaN(year) ? year : null;
          })
          .filter((year) => year !== null)
      )
    );
  }, [semesters]);
  return { semesters, events, organizations, years};
};

export default useFetchSemester;