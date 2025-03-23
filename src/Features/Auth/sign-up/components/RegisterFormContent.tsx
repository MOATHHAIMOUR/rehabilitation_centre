import { useFormContext, useWatch } from "react-hook-form";
import { useSendOTP } from "../hooks/useSendOTP";
import { TRegisterFormSchema } from "../types/registerSchema";
import { useEffect } from "react";
import validator from "validator";
import Box from "../../../../components/ui/Box";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import { FaIdCard, FaPhoneAlt, FaUser } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import Button from "../../../../components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useVerifyOTP } from "../hooks/useVerifyOTP";
import TimerComponent from "../../../../components/TimerComponent";
import { hightAnimationProps } from "../../../question-management/animation";
import PasswordInput from "./PasswordInput";
import { RiLockPasswordFill } from "react-icons/ri";

const RegisterFormContent = () => {
  /* ────────────── STORE  ────────────── */
  const { handleSendOTP, isLoading: sendingOTPLoadingFlag } = useSendOTP();
  const { handleVerifyOTP, isLoading: VeryingOTPLoadingFlag } = useVerifyOTP();

  /* ────────────── REACT-HOOK-FORM  ────────────── */
  const {
    register,
    getValues,
    control,
    trigger,
    watch,
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

  const phoneValue = watch("phone"); // ✅ Watch phone input dynamically

  const isOTPSent = useWatch({ control, name: "isOTPSent" });
  const isPhoneValied = useWatch({ control, name: "isPhoneValied" });
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

  function setIsPasswordValid(isValied: boolean) {
    setValue("isPasswordValied", isValied, {
      shouldValidate: false,
      shouldDirty: false,
    });
  }

  useEffect(() => {
    // cheek phone ruels
    if (validator.isMobilePhone(phoneValue, "ar-SA")) {
      setValue("isPhoneValied", true);
      return;
    }
    setValue("isPhoneValied", false);
  }, [getValues, phoneValue, setValue]);

  return (
    <Box className="flex flex-col gap-3">
      <CustomTextInput
        isRequired={true}
        {...register("nationalNo")}
        SuffixIcon={FaIdCard}
        label="الرقم الوطني"
        name="nationalNo"
        placeholder="أدخل الرقم الوطني"
        error={errors.nationalNo?.message}
      />

      {/* FName & LName */}
      <Box className="grid grid-cols-2 gap-4">
        <CustomTextInput
          {...register("firstName")}
          isRequired={true}
          SuffixIcon={FaUser}
          label="الاسم الأول"
          name="firstName"
          placeholder="أدخل الاسم الأول"
          error={errors.firstName?.message}
        />
        <CustomTextInput
          isRequired={true}
          {...register("lastName")}
          SuffixIcon={FaUser}
          label="الاسم الأخير"
          name="lastName"
          placeholder="أدخل الاسم الأخير"
          error={errors.lastName?.message}
        />
      </Box>

      <CustomTextInput
        {...register("email")}
        SuffixIcon={FiMail}
        label="البريد الإلكتروني"
        name="email"
        placeholder="أدخل البريد الإلكتروني"
        error={errors.email?.message}
      />
      <CustomTextInput
        isRequired={true}
        {...register("phone")}
        SuffixIcon={FaPhoneAlt}
        disabled={isOTPSent || isPhoneConfirmed}
        label="رقم الهاتف"
        name="phone"
        placeholder="أدخل رقم الهاتف"
        error={errors.phone?.message}
      />
      <p className="text-red-500 font-semibold">
        {errors.isPhoneConfirmed?.message}
      </p>
      <Button
        isLoading={sendingOTPLoadingFlag}
        type="button"
        disabled={!isPhoneValied}
        onClick={sendOTPCodeHandler}
        className="bg-teal-700 hover:bg-teal-800 text-white px-5 py-1 rounded-md font-semibold transition-all duration-300"
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

      <PasswordInput
        control={control}
        name="password"
        updateStateResult={setIsPasswordValid}
      />
      <CustomTextInput
        isRequired={true}
        {...register("confirmPassword")}
        SuffixIcon={RiLockPasswordFill}
        label="تأكيد المرور"
        name="confirmPassword"
        type="password"
        placeholder="تأكيد كلمة المرور"
        error={errors.confirmPassword?.message}
      />
      <input hidden {...register("isPhoneConfirmed")} />
      <input hidden {...register("isPasswordValied")} />
      <input hidden {...register("isOTPSent")} />
      <input hidden {...register("isPhoneValied")} />
    </Box>
  );
};

export default RegisterFormContent;
