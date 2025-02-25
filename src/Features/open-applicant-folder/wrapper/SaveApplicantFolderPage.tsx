import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ApplicantFolderStepper from "./components/stepper";
import Box from "../../../components/ui/Box";
import { useEffect } from "react";
import { setActiveForm } from "./store/SaveApplicantSlice";
import { useAppDispatch } from "../../../store";
import { hrefToKeyMap } from "./utils";

const SaveApplicantFolderPage = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  /* ────────────── EFFECTS  ────────────── */
  useEffect(() => {
    if (pathname === "/applicant-folder") return;

    dispatch(setActiveForm(hrefToKeyMap[pathname]));
  }, [dispatch, pathname]);

  useEffect(() => {
    if (pathname === "/applicant-folder") {
      navigate("/applicant-folder/save-applicant/personal-info", {
        replace: true,
      });
    }
  }, [pathname, navigate]);

  return (
    <Box className="flex gap-4">
      <Box className="flex-grow">
        <Outlet />
      </Box>
      <ApplicantFolderStepper />
    </Box>
  );
};

export default SaveApplicantFolderPage;
