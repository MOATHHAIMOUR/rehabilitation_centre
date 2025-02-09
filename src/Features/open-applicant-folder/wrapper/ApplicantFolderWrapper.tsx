import { Outlet } from "react-router-dom";
import ApplicantFolderStepper from "./components/stepper";
import Box from "../../../components/ui/Box";

const ApplicantFolderWrapper = () => {
  return (
    <Box className="px-10 pt-10 flex flex-col ">
      <Box className="flex  items-center gap-4">
        <img className="w-20" src="/src/assets/images/add-file.png" />
        <h1 className="text-4xl font-semibold">إستمارة فتح ملف</h1>
      </Box>
      <ApplicantFolderStepper />
      <Outlet />
    </Box>
  );
};

export default ApplicantFolderWrapper;
