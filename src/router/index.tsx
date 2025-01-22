import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import QuestionManagementPage from "../pages/QuestionManagementPage";

function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* <Route index element={<OpenApplicantFolderPage />} /> */}
        <Route index element={<QuestionManagementPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
