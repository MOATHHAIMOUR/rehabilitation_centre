import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import Box from "../../../../components/ui/Box";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import { TApplicantParentsInfoSchema } from "../types/ApplicantParentsSchema";
import BirthComponent from "../../personal-info/components/PersonBirthData";
import WorkInfo from "../../work-info/components/WorkInfo";

interface IProps {
  control: Control<TApplicantParentsInfoSchema>;
  register: UseFormRegister<TApplicantParentsInfoSchema>;
  errors: FieldErrors<TApplicantParentsInfoSchema>;
}

const FatherInfoComponent = ({ control, register, errors }: IProps) => {
  return (
    <>
      <p className="mt-12 text-2xl font-semibold">معلومات الأم</p>
      <hr className="h-px my-8 bg-gray-900 border-0 dark:bg-gray-700" />

      <Box className="grid grid-cols-4 gap-8">
        <CustomTextInput
          {...register("parentsInfo.mother.personInfo.nationalIdOrIqama")}
          isRequired={true}
          label="رقم الهوية او الإقامة"
        />
        <CustomTextInput
          {...register("parentsInfo.mother.personInfo.fullName")}
          isRequired={true}
          label="الاسم الرباعي "
        />
        <CustomTextInput
          isRequired={true}
          {...register("parentsInfo.mother.personInfo.phoneNumber")}
          label="رقم الجوال"
        />

        <BirthComponent
          name="parentsInfo.mother.personInfo.dateOfBirthEn"
          control={control}
        />

        <CustomTextInput
          isRequired={false}
          {...register("parentsInfo.mother.personInfo.email")}
          label="البريد الالكتروني"
        />

        {/* Work Info */}
        <WorkInfo
          control={control}
          register={register}
          errors={errors}
          companyIdName="parentsInfo.father.workInfo.companeyId"
          industryFieldName="parentsInfo.father.workInfo.workFieldId"
          sectorIdName="parentsInfo.father.workInfo.workSectorType"
          workPhoneName="parentsInfo.father.workInfo.workPhone"
        />
      </Box>
    </>
  );
};

export default FatherInfoComponent;
