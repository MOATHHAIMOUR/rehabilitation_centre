import { ROUTES } from "../../../../../router/HR/employee-management/routeData";

export const employeeManagementSteps = [
  { label: "المعلومات الشخصية", href: ROUTES.EMPLOYEE_CREATE_PERSONAL },
  { label: "معلومات التواصل", href: ROUTES.EMPLOYEE_CREATE_CONTACT },
  { label: "المعلومات الوظيفية", href: ROUTES.EMPLOYEE_CREATE_JOB },
  { label: "مراجعة", href: `${ROUTES.EMPLOYEE_CREATE}/review` }, // Optional Review Step
];
