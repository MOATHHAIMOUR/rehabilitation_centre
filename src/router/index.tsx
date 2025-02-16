import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ApplicantFolderWrapper from "../features/open-applicant-folder/wrapper/ApplicantFolderWrapper";
import ApplicantPersonalInfoPage from "../features/open-applicant-folder/personal-info/ApplicantPersonalInfoPage";
import FirstResearshPage from "../features/first-research/FirstResearshPage";
import DynamicFirstResearchCategoryForm from "../features/first-research/components/DynamicFirstResearchCategoryForm";

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
        <Route
          path="/add-applicant/personal-info"
          element={<ApplicantPersonalInfoPage />}
        />

        <Route path="/first-researsh" element={<FirstResearshPage />}>
          <Route
            path=":category"
            element={<DynamicFirstResearchCategoryForm />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
