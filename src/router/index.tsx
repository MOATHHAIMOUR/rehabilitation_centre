import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import OpenApplicantFolderPage from "../pages/OpenApplicantFolderPage";

function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<OpenApplicantFolderPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
