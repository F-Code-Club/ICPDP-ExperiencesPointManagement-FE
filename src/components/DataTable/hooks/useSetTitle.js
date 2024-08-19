import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_TITLE } from "../../../constant/core";
const useSetTitle = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  useEffect(() => {
    const path = location.pathname;
    if (
      path === "/" ||
      path.startsWith("/admin") ||
      path.startsWith("/club") ||
      path.startsWith("/department")
    ) {
      setPageTitle(PAGE_TITLE.HOME);
    }
    if (path.endsWith("/experience-point")) {
      setPageTitle(PAGE_TITLE.EXPERIENCE_POINT);
    }
    if (path.endsWith("/final-point")) {
      setPageTitle(PAGE_TITLE.FINAL_POINT);
    }
    if (path.endsWith("/clubs")) {
      setPageTitle(PAGE_TITLE.CLUBS);
    }
    if (path.endsWith("/departments")) {
      setPageTitle(PAGE_TITLE.DEPARTMENTS);
    }
    if (path.endsWith("/semesters")) {
      setPageTitle(PAGE_TITLE.SEMESTERS);
    }
    if (path.endsWith("/students")) {
      setPageTitle(PAGE_TITLE.STUDENTS);
    }
  }, [location, setPageTitle, pageTitle]);
  return { pageTitle };
};

export default useSetTitle;
