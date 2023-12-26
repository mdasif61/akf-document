import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white">
      <Outlet />
    </div>
  );
};

export default Dashboard;
