export const ROUTES = {
  EMPLOYEES: "/employees", // Employee List
  EMPLOYEE_DETAILS: "/employees/:employeeId", // Employee Details (View or Edit based on permissions)

  EMPLOYEE_CREATE: "/employees/create", // Multi-step Parent Route (Container)
  EMPLOYEE_CREATE_PERSONAL: "/employees/create/personal", // Step 1 - Personal Info
  EMPLOYEE_CREATE_CONTACT: "/employees/create/contact", // Step 2 - Contact Info
  EMPLOYEE_CREATE_JOB: "/employees/create/job", // Step 3 - Job Info

  EMPLOYEE_EDIT: "/employees/:employeeId/edit", // Multi-step Edit Parent Route
  EMPLOYEE_EDIT_PERSONAL: "/employees/:employeeId/edit/personal", // Step 1 Edit
  EMPLOYEE_EDIT_CONTACT: "/employees/:employeeId/edit/contact", // Step 2 Edit
  EMPLOYEE_EDIT_JOB: "/employees/:employeeId/edit/job", // Step 3 Edit
};
