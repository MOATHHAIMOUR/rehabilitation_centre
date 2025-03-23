import { useFormContext } from "react-hook-form";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import { useGetCountriesQuery } from "../../../../store/services/SharedApi";
import { TapplicantPersonalInfoSchema } from "../types/applicantPersonalInfoSchema";
import LocationInfo from "./LocationInfo";
import PersonBirthData from "./PersonBirthData";
import { ControlledSelectMenu } from "../../../../components/ControlledSelectMenu";

const ApplicantPersonalInfoFormContent = () => {
  /* ────────────── STORE ────────────── */
  const { data: countriesResponse } = useGetCountriesQuery();
  const countries =
    countriesResponse?.data?.map((c) => ({
      label: c.nameAr,
      value: c.countryId,
    })) || [];

  /* ────────────── REACT-HOOK-FORM  ────────────── */
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TapplicantPersonalInfoSchema>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6  bg-white rounded-lg ">
      {/* 🟢 القسم 1: المعلومات الشخصية الأساسية */}
      <div className="col-span-full border-b border-gray-300 pb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          المعلومات الشخصية
        </h2>
      </div>

      <CustomTextInput
        {...register("nationalNumber")}
        error={errors.nationalNumber?.message}
        label="الهوية الوطنية أو الإقامة"
        isRequired
        className="col-span-2"
      />

      <CustomTextInput
        {...register("firstName")}
        error={errors.firstName?.message}
        label="الإسم الأول"
        isRequired
      />
      <CustomTextInput
        {...register("secondName")}
        error={errors.secondName?.message}
        label="الإسم الثاني"
        isRequired
      />
      <CustomTextInput
        {...register("thirdName")}
        error={errors.thirdName?.message}
        label="الإسم الثالث"
        isRequired
      />
      <CustomTextInput
        {...register("lastName")}
        error={errors.lastName?.message}
        label="الإسم الرابع"
        isRequired
      />

      {/* 🟢 القسم 2: معلومات العمر */}
      <div className="col-span-full border-b border-gray-300 pb-4">
        <h2 className="text-lg font-semibold text-gray-800">معلومات العمر</h2>
      </div>

      <PersonBirthData control={control} name="birthDate" />

      {/* 🟢 القسم 3: معلومات الاتصال */}
      <div className="col-span-full border-b border-gray-300 pb-4">
        <h2 className="text-lg font-semibold text-gray-800">معلومات الاتصال</h2>
      </div>

      <CustomTextInput
        {...register("phoneNumber")}
        label="رقم الهاتف"
        isRequired
        error={errors.phoneNumber?.message}
        className="col-span-1"
      />

      <CustomTextInput
        {...register("email")}
        label="الإيميل"
        error={errors.email?.message}
        className="col-span-1"
      />

      {/* 🟢 القسم 4: معلومات إضافية */}
      <div className="col-span-full border-b border-gray-300 pb-4">
        <h2 className="text-lg font-semibold text-gray-800">معلومات إضافية</h2>
      </div>

      <ControlledSelectMenu
        control={control}
        label="الجنس"
        name="gender"
        options={[
          { label: "ذكر", value: 1 },
          { label: "أنثى", value: 0 },
        ]}
      />

      <ControlledSelectMenu
        control={control}
        label="الجنسية"
        name="nationality"
        options={countries ?? []}
        error={errors.nationality}
      />

      {/* 🟢 القسم 5: معلومات السكن */}
      <div className="col-span-full border-b border-gray-300 pb-4">
        <h2 className="text-lg font-semibold text-gray-800">معلومات السكن</h2>
      </div>

      <LocationInfo />
    </div>
  );
};

export default ApplicantPersonalInfoFormContent;
