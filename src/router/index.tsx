import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../features/Auth/login/LoginPage";
import RegisterPage from "../features/Auth/sign-up/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
import ApplicantPersonalInfoPage from "../features/open-applicant-folder/personal-info/ApplicantPersonalInfoPage";
import EducationInfoFormPage from "../features/open-applicant-folder/education-info/ApplicantEducationInfoPage";
import ApplicantComplaintInfoPage from "../features/open-applicant-folder/complaint-info/ComplaintInfoFormPage";
import WorkInfoFormPage from "../features/open-applicant-folder/work-info/ApplicantWorkInfoFormPage";
import ApplicantParentsInfoFormPage from "../features/open-applicant-folder/parents-info/ApplicantParentsInfoFormPage";
import ApplicantRelativeInfoPage from "../features/open-applicant-folder/relative-info/RelativeInfoFormPage";
import ApplicantInsuranceInfoFormPage from "../features/open-applicant-folder/insurance-info/InsuranceInfoFormPage";
import SaveApplicantFolderPage from "../features/open-applicant-folder/wrapper/SaveApplicantFolderPage";
import ApplicantClassificationInfoPage from "../features/open-applicant-folder/classification-info/ApplicantClassificationInfoPage";
import ConductNewResearchPage from "../features/first-research/ConductNewResearchPage";
import ResearshPage from "../features/first-research/ResearshPage";
import ResearchQuestionManagmentPage from "../features/question-management/ResearchQuestionManagmentPage";

function Router() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/sign-up" element={<RegisterPage />} />

      <Route element={<DashboardLayout />}>
        <Route index path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<></>} />
        {/* Applicant Folder Parent Route */}
        <Route path="/applicant-folder" element={<SaveApplicantFolderPage />}>
          {/* Redirect index route to personal info */}
          <Route
            index
            element={
              <Navigate to="/applicant-folder/save-applicant/personal-info" />
            }
          />

          {/* Subroutes */}
          <Route
            path="save-applicant/personal-info"
            element={<ApplicantPersonalInfoPage />}
          />
          <Route
            path="save-applicant/classification-info"
            element={<ApplicantClassificationInfoPage />}
          />
          <Route
            path="save-applicant/education-info"
            element={<EducationInfoFormPage />}
          />
          <Route
            path="save-applicant/complaints-info"
            element={<ApplicantComplaintInfoPage />}
          />
          <Route
            path="save-applicant/work-info"
            element={<WorkInfoFormPage />}
          />
          <Route
            path="save-applicant/parents-info"
            element={<ApplicantParentsInfoFormPage />}
          />
          <Route
            path="save-applicant/relatives-info"
            element={<ApplicantRelativeInfoPage />}
          />
          <Route
            path="save-applicant/insurance-info"
            element={<ApplicantInsuranceInfoFormPage />}
          />
        </Route>
        {/* Base Reaserch Route */}
        <Route path="/research">
          <Route index element={<Navigate to="/research/management" />} />

          <Route path=":researchType" element={<ConductNewResearchPage />}>
            <Route path=":researchCategory" element={<ResearshPage />} />
          </Route>

          <Route
            path="management"
            element={<ResearchQuestionManagmentPage />}
          />
        </Route>

        <Route path="*" element={<p>الصفحة غير موجوده</p>} />
      </Route>
    </Routes>
  );
}

export default Router;

{
  /* <Route element={<DashboardLayout />}>
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

        <Route
          path="/add-applicant/ComplaintInfoPage"
          element={<ApplicantComplaintInfoPage />}
        />

        <Route path="/first-researsh" element={<FirstResearshPage />}>
          <Route
            path=":category"
            element={<DynamicFirstResearchCategoryForm />}
          />
        </Route>

        <Route
          path="/question-managment"
          element={<QuestionManagementPage />}
        />
      </Route> */
}
