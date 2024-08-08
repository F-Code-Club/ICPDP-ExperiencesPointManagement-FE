import { useEffect, useContext } from "react";
import axios from "axios";
import { FinalPointContext } from "../context/FinalPointContext";

const init = [
  
];
const useFetchStudentData = () => {
  const { setRows, setOriginalRows, rows, originalRows } =
    useContext(FinalPointContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   "https://6672cb866ca902ae11b1d2c9.mockapi.io/api/v1/feedbacks/finalPoint"
        // );
        const data = [...init];
        data.map((item, index) => {
          item.id = index + 1;
          return item;
        });
        setRows(data);
        setOriginalRows(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [axios, setRows, setOriginalRows]);
  return { rows, originalRows };
};

export default useFetchStudentData;
