import ApplicationLogo from "../../../components/ApplicationLogo";
import RegisterForm from "./components/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <div className="bg-gray-50 ">
      <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4">
        <div className="max-w-2xl w-full">
          <ApplicationLogo />
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
