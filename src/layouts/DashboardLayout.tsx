import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Box from "../components/ui/Box";
import UserActions from "../components/UserAction";

const DashboardLayout = () => {
  return (
    <Box className="grid grid-cols-[auto,1fr]">
      <Box className="pr-80">
        <Sidebar />
      </Box>
      <Box>
        <UserActions />
        <Box className="pt-6 pl-4 pr-8">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
