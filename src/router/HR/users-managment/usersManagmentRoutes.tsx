import { Route } from "react-router-dom";
import UserRoleManagmentPage from "../../../features/hr/users-managment/roles-managment/UserRoleManagmentPage";
import { ROUTES } from "./routeData";

export const usersManagmentRoutes = [
  <Route path={ROUTES.USERS_ROLES} element={<UserRoleManagmentPage />} />,
];
