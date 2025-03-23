import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Box from "../../../components/ui/Box";
import ApplicantFolderStepper from "./components/stepper";
import { setActiveForm } from "./store/SaveApplicantSlice";
import { useAppDispatch } from "../../../store";
import { hrefToKeyMap } from "./utils";
import StepperNavigation from "../../../components/ui/StepperFormNavigation";
import { OPEN_APPLICANT_FOLDER_STEPPS_DATA } from "./data";
import { FaUserCircle } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { RiUserAddLine } from "react-icons/ri";

const SaveApplicantFolderPage = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /* ────────────── EFFECTS  ────────────── */
  useEffect(() => {
    if (pathname === "/applicant-folder") {
      navigate("/applicant-folder/save-applicant/personal-info", {
        replace: true,
      });
    } else {
      dispatch(setActiveForm(hrefToKeyMap[pathname]));
    }
  }, [dispatch, pathname, navigate]);

  // <aside className="fixed top-0 rtl:right-0 ltr:left-0 z-40 w-80 h-screen bg-gradient-to-b from-teal-950 to-teal-800 text-white shadow-2xl overflow-hidden">
  // {/* Background Shapes (Darker & Overflow Hidden) */}
  // <div className="absolute top-[-40px] left-[-40px] w-32 h-32 bg-teal-700 opacity-25 rounded-full animate-spin-slow overflow-hidden"></div>
  // <div className="absolute bottom-10 right-10 w-28 h-28 bg-teal-600 opacity-30 rounded-full animate-pulse overflow-hidden"></div>
  // <div className="absolute top-20 right-20 w-24 h-24 bg-teal-900 opacity-20 rounded-lg overflow-hidden"></div>

  return (
    <Box className=" overflow-hidden flex border-2  rounded-lg border-gray-200 shadow-2xl ">
      {/* Left Sidebar (Profile Picture + Steps) */}
      <Box className="relative w-[300px] py-12 px-1  bg-gradient-to-b from-teal-800 to-teal-500 text-white shadow-2xl overflow-hidden">
        {/* Background Shapes - Matching Sidebar */}
        <div className="z-0  absolute top-[-40px] left-[-40px] w-32 h-32 bg-teal-700 opacity-25 rounded-full animate-spin-slow overflow-hidden"></div>
        <div className="z-0  absolute bottom-10 right-10 w-28 h-28 bg-teal-600 opacity-30 rounded-full animate-pulse overflow-hidden"></div>
        <div className="z-0  absolute top-20  w-24 h-24 bg-teal-900 opacity-20 rounded-lg overflow-hidden"></div>{" "}
        {/* Applicant Photo Placeholder - Styled */}
        <div className="relative z-40 mx-auto w-40 h-40 shadow-xl bg-white border border-gray-300 rounded-full flex items-center justify-center mb-6">
          <RiUserAddLine className="text-gray-500 text-6xl" />
        </div>
        {/* Navigation Steps - Clean UI */}
        <StepperNavigation steps={OPEN_APPLICANT_FOLDER_STEPPS_DATA} />
      </Box>

      {/* Right Side - Main Form Container */}
      <Box className="flex-1 p-10 bg-white">
        <Outlet />
      </Box>
    </Box>
  );
};

export default SaveApplicantFolderPage;
