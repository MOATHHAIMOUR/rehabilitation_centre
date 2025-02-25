import { FaIdCard, FaPhoneAlt, FaUser } from "react-icons/fa";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Form } from "../../../../components/components/Form";
import {
  registerFormSchemaDefaultValues,
  registerSchema,
  TRegisterFormSchema,
} from "../types/registerSchema";
import { SubmitHandler, useFormContext, useWatch } from "react-hook-form";
import Button from "../../../../components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { hightAnimationProps } from "../../../question-management/animation";
import { useSendOTP } from "../hooks/useSendOTP";
import { useVerifyOTP } from "../hooks/useVerifyOTP";
import { useEffect } from "react";
import TimerComponent from "../../../../components/TimerComponent";

const RegisterForm = () => {
  const handleSubmit: SubmitHandler<TRegisterFormSchema> = (data) => {
    console.log("submitted");
  };

  const onError = (errors: any) => {
    console.log("❌ Zod Validation Errors:", errors);
  };
  return (
    <div className="p-8 rounded-2xl bg-white shadow-xl border border-solid border-black border-opacity-30">
      <h2 className="text-black text-center text-2xl font-bold">إنشاء حساب</h2>
      <Form
        onSubmit={handleSubmit}
        schema={registerSchema}
        defaultValues={registerFormSchemaDefaultValues}
        className="mt-8 space-y-4"
        isMultiForm={false}
        buttonText="إنشاء حساب"
        onError={onError}
      >
        <FormContent />
      </Form>
      <p className="text-gray-800 text-sm !mt-8 text-center">
        لديك حساب بالفعل؟
        <a
          href="#"
          className="mr-2 text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
        >
          سجل الدخول هنا
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;

const FormContent = () => {
  /* ────────────── STORE  ────────────── */
  const {
    handleSendOTP,
    isSuccess,
    isLoading: sendingOTPLoadingFlag,
  } = useSendOTP();
  const { handleVerifyOTP, isLoading: VeryingOTPLoadingFlag } = useVerifyOTP();

  /* ────────────── REACT-HOOK-FORM  ────────────── */
  const {
    register,
    getValues,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<TRegisterFormSchema>();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Validation Errors:");
      Object.entries(errors).forEach(([key, value]) => {
        console.log(`${key}: ${value.message}`);
      });
    }
  }, [errors]);

  const isOTPSent = useWatch({ control, name: "isOTPSent" });
  const isPhoneConfirmed = useWatch({ control, name: "isPhoneConfirmed" });

  /* ────────────── HANDLERS  ────────────── */
  async function sendOTPCodeHandler() {
    const isValid = await trigger("phone");
    if (!isValid) return;
    const res = await handleSendOTP(getValues("phone"));
    if (res.statusCode === 200) {
      console.log("here");
      setValue("isOTPSent", true);
    }
  }

  async function verifyOTPCodeHandler() {
    const phoneConfirmationFieldIsValid = await trigger(
      "phoneConfirmationField"
    );
    const phoenIsValid = await trigger("phone");

    if (!phoneConfirmationFieldIsValid || !phoenIsValid) {
      return;
    }

    const res = await handleVerifyOTP(
      getValues("phone"),
      getValues("phoneConfirmationField")!
    );
    if (res.statusCode === 200) setValue("isPhoneConfirmed", true);
  }

  function onTimerComplete() {
    // cheek if phone is succsesfully confiremd
    const isPhoneConfirmed = getValues("isPhoneConfirmed");
    if (!isPhoneConfirmed) {
      setValue("isOTPSent", false);
    }
  }

  return (
    <>
      <CustomTextInput
        {...register("nationalNo")}
        SuffixIcon={FaIdCard}
        label="الرقم الوطني"
        name="nationalNo"
        placeholder="أدخل الرقم الوطني"
        error={errors.nationalNo?.message}
      />
      <div className="grid grid-cols-2 gap-4">
        <CustomTextInput
          {...register("firstName")}
          SuffixIcon={FaUser}
          label="الاسم الأول"
          name="firstName"
          placeholder="أدخل الاسم الأول"
          error={errors.firstName?.message}
        />
        <CustomTextInput
          {...register("lastName")}
          SuffixIcon={FaUser}
          label="الاسم الأخير"
          name="lastName"
          placeholder="أدخل الاسم الأخير"
          error={errors.lastName?.message}
        />
      </div>

      <CustomTextInput
        {...register("email")}
        SuffixIcon={FiMail}
        label="البريد الإلكتروني"
        name="email"
        placeholder="أدخل البريد الإلكتروني"
        error={errors.email?.message}
      />
      <CustomTextInput
        {...register("phone")}
        SuffixIcon={FaPhoneAlt}
        disabled={isOTPSent || isPhoneConfirmed}
        label="رقم الهاتف"
        name="phone"
        placeholder="أدخل رقم الهاتف"
        error={errors.phone?.message}
      />
      <Button
        isLoading={sendingOTPLoadingFlag}
        type="button"
        disabled={isOTPSent}
        onClick={sendOTPCodeHandler}
        className="w-[150px]  py-2 px-2 text-sm tracking-wide rounded-lg text-white bg-bg-primary  focus:outline-none"
      >
        إرسال رمز التحقق
      </Button>

      <AnimatePresence>
        {!isPhoneConfirmed && isOTPSent && (
          <motion.div
            layout
            className="flex flex-col gap-4"
            {...hightAnimationProps}
          >
            <TimerComponent initialSeconds={70} onComplete={onTimerComplete} />
            <CustomTextInput
              label="رمز التحقق"
              {...register("phoneConfirmationField")}
              placeholder="أدخل رمز التحقق المرسل إلى الهاتف"
              error={errors.phoneConfirmationField?.message}
            />
            <Button
              isLoading={VeryingOTPLoadingFlag}
              type="button"
              onClick={verifyOTPCodeHandler}
              className="w-[150px]  py-2 px-2 text-sm tracking-wide rounded-lg text-white bg-bg-primary  focus:outline-none"
            >
              التحقق من الرمز
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <CustomTextInput
        {...register("password")}
        SuffixIcon={RiLockPasswordFill}
        label="كلمة المرور"
        name="password"
        type="password"
        placeholder="أدخل كلمة المرور"
        error={errors.password?.message}
      />
      <CustomTextInput
        {...register("confirmPassword")}
        SuffixIcon={RiLockPasswordFill}
        label="تأكيد المرور"
        name="confirmPassword"
        type="password"
        placeholder="تأكيد كلمة المرور"
        error={errors.confirmPassword?.message}
      />
    </>
  );
};
