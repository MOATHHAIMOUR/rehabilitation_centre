import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ApplicantFolderWrapper from "../features/open-applicant-folder/wrapper/ApplicantFolderWrapper";
import ApplicantPersonalInfoPage from "../features/open-applicant-folder/personal-info/ApplicantPersonalInfoPage";

function Router() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route element={<ApplicantFolderWrapper />}>
          <Route
            path="/add-applicant/personal-info"
            element={<ApplicantPersonalInfoPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
