import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Box from "../components/ui/Box";
import UserActions from "../components/UserAction";
import { useState } from "react";
import { GiOpenPalm } from "react-icons/gi";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Box className="grid grid-cols-[auto,1fr]  min-h-screen">
      {isSidebarOpen ? (
        <Box className="pr-80">
          <Sidebar />
        </Box>
      ) : (
        <>
          <GiOpenPalm />
        </>
      )}

      <Box className="flex flex-col">
        <UserActions />
        <Box className="py-6 pl-4 pr-8 flex-1 ">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
