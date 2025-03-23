import { useFormContext } from "react-hook-form";
import CustomTextInput from "../../../../../components/ui/CustomTextInput";
import { TPersonalInfoForm } from "../types/personalInfoSchema";
import { DocumentsArrayField } from "../../../../../components/DocumentsArrayField";
import BirthComponent from "../../../../open-applicant-folder/personal-info/components/PersonBirthData";
import { ControlledSelectMenu } from "../../../../../components/ControlledSelectMenu";

const PersonalInfoFormContent = () => {
  const { control } = useFormContext<TPersonalInfoForm>();

  return (
    <>
      {/* Header */}

      <h2 className="text-lg font-semibold pb-2">البيانات الشخصية</h2>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p">
        {/* National No */}
        <CustomTextInput
          className="col-span-4 w-[40%]"
          name="nationalNo"
          label="رقم الهوية"
          placeholder="أدخل رقم الهوية"
          isRequired={true}
        />

        {/* First Name */}
        <CustomTextInput
          name="firstName"
          label="الاسم الأول"
          placeholder="أدخل الاسم الأول"
          isRequired={true}
        />
        {/* Second Name */}
        <CustomTextInput
          name="secondName"
          label="الاسم الثاني"
          placeholder="أدخل الاسم الثاني"
          isRequired={true}
        />
        {/* Third Name (Optional) */}
        <CustomTextInput
          name="thirdName"
          label="الاسم الثالث"
          placeholder="أدخل الاسم الثالث"
        />
        {/* Last Name */}
        <CustomTextInput
          name="lastName"
          label="اسم العائلة"
          placeholder="أدخل اسم العائلة"
          isRequired={true}
        />

        {/* Date of Birth */}
        <BirthComponent control={control} name="dateOfBirth" />
        {/* Nationality */}
        <ControlledSelectMenu
          control={control}
          name="nationalityId"
          label="الجنسية"
          isRequired={true}
          options={[]}
        />
        {/* Gender */}
        <ControlledSelectMenu
          name="gender"
          label="الجنس"
          options={[]}
          control={control}
          isRequired={true}
        />
      </div>
      <div className="border-t-2 mt-8">
        <h2 className="text-lg font-semibold py-2">إضافة الوثائق</h2>
        <DocumentsArrayField />
      </div>
    </>
  );
};

export default PersonalInfoFormContent;
