import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Box from "../components/ui/Box";

const MainLayout = () => {
  return (
    <Box className="grid grid-cols-[auto,1fr]">
      {/* <Box className="w-80">
        <Sidebar />
      </Box> */}
      <Box className="">
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
