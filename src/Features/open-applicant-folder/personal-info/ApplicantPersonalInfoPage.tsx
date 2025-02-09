import { useGetCountriesQuery } from "../../shared/store/SharedApi";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import ControlledSelectMenu from "../../../components/ControlledSelectMenu";
import PersonBirthData from "./components/PersonBirthData";
import LocationInfo from "./components/LocationInfo";
import {
  applicantPersonalInfoSchema,
  defaultValues,
  TapplicantPersonalInfoSchema,
} from "./types/applicantPersonalInfoSchema";
import { Form } from "../form/components/Form";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";

const ApplicantPersonalInfoPage = () => {
  /* ────────────── STATE ────────────── */
  const navigate = useNavigate();

  /* ────────────── REACT-HOOK-FORM  ────────────── */
  function handleSubmit() {
    console.log("errors");
    navigate("/add-applicant/classification-info");
  }
  /* ────────────── Submit Handler ────────────── */

  const onError = (errors: any) => {
    console.error("Form Validation Errors:", errors);

    // Optional: Log each error field separately
    Object.keys(errors).forEach((field) => {
      console.error(`❌ Error in "${field}":`, errors[field].message);
    });
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        schema={applicantPersonalInfoSchema}
        onError={onError}
      >
        {/* ✅ Moved Form Fields Inside `FormContent` */}
        <FormContent />
      </Form>
    </>
  );
};

export default ApplicantPersonalInfoPage;

/* ────────────── ✅ New Component: FormContent ────────────── */
const FormContent = () => {
  /* ────────────── STORE ────────────── */
  const { data: countriesResponse } = useGetCountriesQuery();
  const countries =
    countriesResponse?.data?.map((c) => ({
      label: c.nameAr,
      value: c.countryId.toString(),
    })) || [];
  /* ────────────── REACT-HOOK-FORM  ────────────── */
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TapplicantPersonalInfoSchema>(); // ✅ Now inside `FormProvider`

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* National NO */}
      <CustomTextInput
        {...register("nationalNumber")}
        error={errors.nationalNumber?.message}
        label={"الهوية الوطنية أو الإقامة"}
        isRequired={true}
        className="lg:col-span-4 lg:w-80"
      />

      {/* Person Names */}
      <CustomTextInput
        {...register("firstName")}
        error={errors.firstName?.message}
        label={"الإسم الأول"}
        isRequired={true}
      />
      <CustomTextInput
        {...register("secondName")}
        error={errors.secondName?.message}
        label={"الإسم الثاني"}
        isRequired={true}
      />
      <CustomTextInput
        {...register("thirdName")}
        error={errors.thirdName?.message}
        label={"الإسم الثالث"}
        isRequired={true}
      />
      <CustomTextInput
        {...register("lastName")}
        error={errors.lastName?.message}
        label={"الإسم الرابع"}
        isRequired={true}
      />

      {/* Person Birth Data */}
      <PersonBirthData />

      {/* Contact Info */}
      <CustomTextInput
        {...register("phoneNumber")}
        label={"رقم الهاتف"}
        isRequired={true}
        error={errors.phoneNumber?.message}
      />
      <CustomTextInput
        {...register("phoneNumber2")}
        label={"رقم الهاتف (الثاني)"}
        isRequired={false}
        error={errors.phoneNumber2?.message}
      />
      <CustomTextInput
        {...register("email")}
        label={"الإيميل"}
        isRequired={false}
        error={errors.email?.message}
      />

      {/* Gender Info */}
      <ControlledSelectMenu
        control={control}
        label="الجنس"
        name="gender"
        options={[]}
      />

      {/* Nationality */}
      <ControlledSelectMenu
        control={control}
        label="الجنسية"
        name="nationality"
        options={countries}
        error={errors.nationalNumber}
      />

      {/* Location Info */}
      <LocationInfo />
    </div>
  );
};
