import { AdminDashboardProvider } from "./context/adminDashboardContext";
import AdminDashboardTable from "./components/AdminDashboardTable";
import columnsSchema from "./columns";
const AdminDashboard = () => {
  return (
    <AdminDashboardProvider>
      <AdminDashboardTable columnsSchema={columnsSchema} />
    </AdminDashboardProvider>
  );
};

export default AdminDashboard;
