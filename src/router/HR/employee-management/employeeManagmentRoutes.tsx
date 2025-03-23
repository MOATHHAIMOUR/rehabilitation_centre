import { Route } from "react-router-dom";
import { ROUTES } from "./routeData";
import SaveEmployeePage from "../../../features/hr/employee-management/save-employee/wrapper/SaveEmployeePage";
import PersonalInfoStepPage from "../../../features/hr/employee-management/save-employee/pages/PersonalInfoStepPage";
import ContactInfoPage from "../../../features/hr/employee-management/save-employee/pages/ContactInfoPage";
import JobInfoPage from "../../../features/hr/employee-management/save-employee/pages/JobInfoPage";

export const EmployeeManagmentRoutes = [
  <Route
    key="create-employee"
    path={ROUTES.EMPLOYEE_CREATE}
    element={<SaveEmployeePage />}
  >
    <Route path="personal" element={<PersonalInfoStepPage />} />
    <Route path="contact" element={<ContactInfoPage />} />
    <Route path="job" element={<JobInfoPage />} />
  </Route>,
];

{
  /* Employee List */
}
{
  /* <Route path={ROUTES.EMPLOYEES} element={<EmployeeList />} /> */
}

{
  /* Employee Details */
}
{
  /* <Route path={ROUTES.EMPLOYEE_DETAILS} element={<EmployeeDetails />} /> */
}

{
  /* Create Employee Multi-Step */
}

{
  /* Edit Employee Multi-Step
    <Route path={ROUTES.EMPLOYEE_EDIT} element={<EditEmployeeLayout />}>
      <Route path="personal" element={<PersonalInfoForm />} />
      <Route path="contact" element={<ContactInfoForm />} />
      <Route path="job" element={<JobInfoForm />} />
    </Route> */
}
