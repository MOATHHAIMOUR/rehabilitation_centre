import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Box from "../components/ui/Box";

const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-[auto,1fr]">
      <div className="pr-80">
        <Sidebar />
      </div>
      <Box className="">
        <Outlet />
      </Box>
    </div>
  );
};

export default DashboardLayout;
