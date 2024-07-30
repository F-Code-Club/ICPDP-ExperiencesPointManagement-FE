import SemesterDataTable from "./components/SemesterDataTable";
import semesterColumnsSchema from "./columns";
import { SemesterProvider } from "./semester.context";

const SemesterManagement = () => {
  return (
    <SemesterProvider>
      <SemesterDataTable columnsSchema={semesterColumnsSchema} />
    </SemesterProvider>
  );
};

export default SemesterManagement;
