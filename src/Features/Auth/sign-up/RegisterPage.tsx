import { NavLink } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="relative py-20 flex min-h-screen items-center justify-center bg-gray-100 shadow-2xl overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-teal-700 opacity-20 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-teal-600 opacity-30 rounded-full animate-pulse"></div>
      <div className="absolute top-20 right-20 w-60 h-60 bg-teal-900 opacity-25 rounded-lg "></div>

      <div className="relative flex w-full max-w-5xl shadow-lg rounded-lg overflow-hidden">
        {/* Registration Form Section */}
        <div className="bg-white p-10 flex flex-col justify-center w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            إنشاء حساب جديد
          </h2>
          <RegisterForm />
        </div>

        {/* Welcome Section */}
        <div className="w-1/2 bg-gradient-to-r from-teal-800 to-teal-600 p-10 flex flex-col justify-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            مرحبًا بك في مركز التأهيل والإرشاد الأسري!
          </h2>
          <p className="mb-6 text-lg">
            انضم إلينا وابدأ رحلتك في بيئة داعمة توفر لك خدمات تأهيلية وإرشادية
            متخصصة لتعزيز جودة حياتك وحياة أسرتك.
          </p>
          <NavLink
            to={"/auth/login"}
            className="bg-white text-center text-teal-800 px-6 py-3 rounded shadow-md font-semibold hover:bg-gray-200"
          >
            تسجيل دخول
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
