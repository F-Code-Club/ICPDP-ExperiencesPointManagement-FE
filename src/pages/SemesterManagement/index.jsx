import SemesterDataTable from "./components/SemesterDataTable";
import semesterColumnsSchema from "./columns";
import { SemesterProvider } from "./semester.context";

const SemesterManagement = () => {
  return (
    <SemesterProvider>
      <SemesterDataTable
        title="kì học"
        columnsSchema={semesterColumnsSchema}
        role={"semester"}
      />
    </SemesterProvider>
  );
};

export default SemesterManagement;
