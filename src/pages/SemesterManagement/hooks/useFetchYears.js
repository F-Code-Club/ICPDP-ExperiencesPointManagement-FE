import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { SemesterContext } from "../semester.context";

const useFetchYears = () => {
  const { rows } = useContext(SemesterContext);
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    // Get Years from Existing Semesters
    const years = rows.map((row) => row.year);
    const existedYears = [...new Set(years)];

    // Get Years from 5 years ago to 5 years later
    const currentYear = dayjs().year();
    let availableYears = [];
    for (let i = -5; i <= 5; i++) {
      availableYears.push(currentYear + i);
    }

    // Merge 2 arrays and remove duplicates
    availableYears = availableYears.filter(
      (year) => !existedYears.includes(year)
    );

    setAvailableYears(availableYears);
  }, [rows]);

  return availableYears;
};

export default useFetchYears;
