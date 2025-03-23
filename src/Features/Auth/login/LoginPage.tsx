import { NavLink } from "react-router-dom";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-100 shadow-2xl overflow-hidden px-6">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-teal-700 opacity-20 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-teal-600 opacity-30 rounded-full animate-pulse"></div>
      <div className="absolute top-20 right-20 w-40 h-40 bg-teal-900 opacity-25 rounded-lg"></div>

      <div className="relative w-full max-w-md shadow-lg rounded-lg bg-white p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          تسجيل دخول
        </h2>

        <LoginForm />
        <p className="text-sm text-gray-600 text-center mt-4">
          ليس لديك حساب؟{" "}
          <NavLink to="/auth/sign-up" className="text-teal-600 font-semibold">
            إنشاء حساب جديد
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
