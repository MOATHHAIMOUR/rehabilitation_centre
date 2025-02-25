import Button from "../../../components/ui/Button";
import CustomTextInput from "../../../components/ui/CustomTextInput";

const LoginPage = () => {
  return (
    <div className="bg-gray-50 font-[sans-serif] py-8">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md w-full">
          <a
            className="py-8  flex flex-col justify-center items-center"
            href="#"
          >
            <img
              src="/src/assets/images/MainSubLogo.png"
              alt="الشعار"
              className="w-40 mx-auto block"
            />
            <p className="mt-2 font-semibold mx-auto">
              مركز التأهيل والإرشاد الأسري
            </p>
          </a>

          <div className="p-8 rounded-2xl bg-white shadow-xl border border-solid border-black border-opacity-30">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              تسجيل الدخول
            </h2>
            <form className="mt-8 space-y-4">
              <div>
                <CustomTextInput label="البريد الإلكتروني" name="" />
              </div>

              <div>
                <CustomTextInput label="كلمة المرور" name="" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="mr-3 block text-sm text-gray-800"
                  >
                    تذكرني
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    نسيت كلمة المرور ؟
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <Button
                  type="button"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-bg-primary focus:outline-none"
                >
                  تسجيل الدخول
                </Button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                ليس لديك حساب؟
                <a
                  href="javascript:void(0);"
                  className="mr-1 text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  سجل هنا
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
