import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { IOpenApplicantFolder } from "../../interface";
import { useGetCountriesQuery } from "../../../shared/store/SharedApi";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import PersonBirthData from "../PersonBirthData";
import LocationInfo from "../LocationInfo";
import SelectMenu from "../../../../components/ui/SelectMenu";

interface IProps {
  register: UseFormRegister<IOpenApplicantFolder>;
  errors: FieldErrors<IOpenApplicantFolder>;
  control: Control<IOpenApplicantFolder>;
  setValue: UseFormSetValue<IOpenApplicantFolder>;
  clearErrors: UseFormClearErrors<IOpenApplicantFolder>;
}
const PersonalInfoFields = ({
  register,
  errors,
  control,
  setValue,
  clearErrors,
}: IProps) => {
  const { data: countriesResponse } = useGetCountriesQuery();
  const countries =
    countriesResponse?.data?.map((c) => ({
      label: c.nameAr,
      value: c.countryId.toString(),
    })) || [];

  console.log("errors.gender?.message: " + errors.personInfo?.gender?.message);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* National NO */}
      <CustomTextInput
        {...register("personInfo.nationalIdOrIqama")}
        label={"الهوية الوطنية أو الإقامة"}
        isRequired={true}
        className="  lg:col-span-4 lg:w-80"
        error={errors.personInfo?.nationalIdOrIqama?.message}
      />
      {/* Person Names */}
      <CustomTextInput
        {...register("personInfo.firstName")}
        label={"الإسم الأول"}
        isRequired={true}
        error={errors.personInfo?.firstName?.message}
      />
      <CustomTextInput
        {...register("personInfo.secondName")}
        label={"الإسم الثاني"}
        isRequired={true}
        error={errors.personInfo?.secondName?.message}
      />
      <CustomTextInput
        {...register("personInfo.thirdName")}
        error={errors.personInfo?.thirdName?.message}
        label={"الإسم الثالث"}
        isRequired={true}
      />
      <CustomTextInput
        {...register("personInfo.fourthName")}
        label={"الإسم الرابع"}
        isRequired={true}
        error={errors.personInfo?.fourthName?.message}
      />
      {/* Person Birth Data */}
      <PersonBirthData
        clearErrors={clearErrors}
        setValue={setValue}
        errors={errors}
        control={control}
      />
      {/* Contact Info */}
      <CustomTextInput
        {...register("personInfo.phoneNumber")}
        label={"رقم الهاتف"}
        isRequired={true}
        error={errors.personInfo?.phoneNumber?.message}
      />
      <CustomTextInput
        {...register("personInfo.secondaryPhoneNumber")}
        label={"رقم الهاتف (الثاني)"}
        isRequired={false}
        error={errors.personInfo?.secondaryPhoneNumber?.message}
      />
      <CustomTextInput
        {...register("personInfo.email")}
        label={"الإيميل"}
        isRequired={false}
        error={errors.personInfo?.email?.message}
      />
      {/* Gender Info */}

      <Controller
        name="personInfo.gender"
        control={control}
        render={({ field }) => (
          <SelectMenu
            isRequired={true}
            error={errors.personInfo?.gender?.message ?? ""} // Display validation error
            label="الجنس"
            options={[
              { value: 1, label: "ذكر" },
              { value: 2, label: "أنثى" },
            ]}
            value={
              field.value
                ? {
                    value: field.value,
                    label: field.value === 1 ? "ذكر" : "أنثى",
                  }
                : null
            } // Map the value to react-select's format
            onChange={(selected) => {
              if (selected && "value" in selected) {
                field.onChange(selected.value); // Handle single value
              } else {
                field.onChange(null); // Handle no selection
              }
            }}
          />
        )}
      />
      {/* Nationallity Info */}
      <Controller
        name="personInfo.nationality"
        control={control}
        render={({ field }) => (
          <SelectMenu
            isRequired={true}
            {...field} // Binds React Hook Form's field state and event handlers
            error={errors.personInfo?.nationality?.message ?? ""} // Display Zod error message
            label="الجنسية"
            onChange={(selected) => {
              if (selected && "value" in selected) {
                field.onChange(selected.value); // Handle single value
              } else {
                field.onChange(null); // Handle no selection
              }
            }}
            value={
              countries.find((option) => option.value === field.value) || null
            } // Map the field value to the matching option
            options={countries} // Pass options to the dropdown
          />
        )}
      />
      {/* Location Info */}
      <LocationInfo errors={errors} control={control} />
    </div>
  );
};
export default PersonalInfoFields;
