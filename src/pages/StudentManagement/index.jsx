import StudentDataTable from "./components/StudentDataTable";
import columnsSchema from "./columns";
import { exportOptions } from "./exportOptions";
import { formConfig } from "./formConfig";
import { StudentProvider } from "./student.context";

const StudentManagement = () => {
  return (
    <StudentProvider>
      <StudentDataTable
        columnsSchema={columnsSchema}
        exportOptions={exportOptions}
        formConfig={formConfig}
      />
    </StudentProvider>
  );
};

export default StudentManagement;
