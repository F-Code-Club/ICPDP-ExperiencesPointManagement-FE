import { DashboardProvider } from "./context/dashboardContext";
import DashboardTable from "./components/DashboardTable";
import columnsSchema from "./columns";
const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardTable columnsSchema={columnsSchema} />
    </DashboardProvider>
  );
};

export default Dashboard;
