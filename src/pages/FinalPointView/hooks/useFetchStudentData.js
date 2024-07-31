import { useEffect, useContext } from "react";
import axios from "axios";
import { FinalPointContext } from "../context/FinalPointContext";

const init = [
  {
    studentID: "2024-06-07",
    name: "Carolyn Lamb",
    learningPoint: 21197,
    learningComment:
      "Attention arm account play tax. Me child relate product economic strategy.",
    finalLearningPoint: 83256,
    politicalPoint1: 32730,
    politicalPoint2: 13422,
    politicalPoint3: 83340,
    politicalPoint4: 32225,
    politicalPoint5: 50518,
    finalPoliticalPoint: 817,
    activityPoint: 27183,
    activityComment:
      "Leave set prove bed record. Reveal body computer dinner institution across process.",
    finalActivityPoint: 26930,
    finalPoint: 12501,
    ranking: "may",
  },
  {
    studentID: "2024-06-13",
    name: "Lucas Newton",
    learningPoint: 51290,
    learningComment:
      "After cultural fight traditional partner price significant.",
    finalLearningPoint: 87738,
    politicalPoint1: 8369,
    politicalPoint2: 61286,
    politicalPoint3: 11074,
    politicalPoint4: 98777,
    politicalPoint5: 81581,
    finalPoliticalPoint: 17387,
    activityPoint: 92946,
    activityComment: "Forget machine final method poor clearly argue.",
    finalActivityPoint: 84462,
    finalPoint: 26119,
    ranking: "watch",
  },
  {
    studentID: "2024-04-15",
    name: "David Johnson",
    learningPoint: 35834,
    learningComment:
      "Executive positive long opportunity theory. Truth kid nice leave west matter entire. It create industry stage.",
    finalLearningPoint: 63310,
    politicalPoint1: 92097,
    politicalPoint2: 75093,
    politicalPoint3: 71787,
    politicalPoint4: 80390,
    politicalPoint5: 44401,
    finalPoliticalPoint: 2126,
    activityPoint: 63754,
    activityComment:
      "Check base often history newspaper. Face kitchen officer evidence although both student book.",
    finalActivityPoint: 65006,
    finalPoint: 57499,
    ranking: "go",
  },
  {
    studentID: "2024-04-12",
    name: "Anthony Stout",
    learningPoint: 15408,
    learningComment:
      "Quite cell of somebody. Build really hotel significant loss.",
    finalLearningPoint: 81149,
    politicalPoint1: 54594,
    politicalPoint2: 66936,
    politicalPoint3: 12664,
    politicalPoint4: 98205,
    politicalPoint5: 97974,
    finalPoliticalPoint: 98264,
    activityPoint: 64649,
    activityComment: "Environment partner really woman knowledge service.",
    finalActivityPoint: 7331,
    finalPoint: 35407,
    ranking: "happen",
  },
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
