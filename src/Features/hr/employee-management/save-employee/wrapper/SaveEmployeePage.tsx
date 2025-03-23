import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Box from "../../../../../components/ui/Box";
import StepperNavigation from "../../../../../components/ui/StepperFormNavigation";
import { employeeManagementSteps } from "../data";

const SaveEmployeePage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/employees/create") {
      navigate("/employees/create/personal", { replace: true });
    }
  }, [pathname, navigate]);

  return (
    <Box className="h-fit flex border rounded-lg border-gray-200">
      {/* Left Sidebar (Profile Picture + Steps) */}
      <Box className="w-[300px] py-8 flex flex-col items-center border-l-[.5px] border-gray-200 gap-4">
        <p className="font-semibold text-lg mb-6">اسم الموظف هنا</p>

        {/* Employee Photo Placeholder */}
        <div className="w-40 h-40 shadow-xl rounded-full bg-gray-300 mb-4"></div>

        {/* Navigation Steps */}
        <StepperNavigation steps={employeeManagementSteps} />
      </Box>
      {/* Right Side - Main Form Container */}
      <Box className="flex-1 ">
        <Outlet />
      </Box>
    </Box>
  );
};

export default SaveEmployeePage;
