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

const MoatherInfoComponent = ({ control, register, errors }: IProps) => {
  return (
    <>
      <p className="text-2xl font-semibold">معلومات الأب</p>
      <hr className="h-px my-8 bg-gray-900 border-0 dark:bg-gray-700" />

      <Box className="grid grid-cols-4 gap-8">
        <CustomTextInput
          {...register("parentsInfo.father.personInfo.nationalIdOrIqama")}
          isRequired={true}
          label="رقم الهوية او الإقامة"
          error={
            errors.parentsInfo?.father?.personInfo?.nationalIdOrIqama?.message
          }
        />
        <CustomTextInput
          {...register("parentsInfo.father.personInfo.fullName")}
          isRequired={true}
          label="الاسم الرباعي "
        />
        <CustomTextInput
          isRequired={true}
          {...register("parentsInfo.father.personInfo.phoneNumber")}
          label="رقم الجوال "
        />

        <BirthComponent
          control={control}
          name="parentsInfo.father.personInfo.dateOfBirthEn"
        />

        <CustomTextInput
          isRequired={false}
          {...register("parentsInfo.father.personInfo.email")}
          label="البريد الالكتروني"
        />

        {/* Work Info */}
        <WorkInfo
          control={control}
          register={register}
          errors={errors}
          companyIdName="parentsInfo.mother.workInfo.companeyId"
          industryFieldName="parentsInfo.mother.workInfo.workFieldId"
          sectorIdName="parentsInfo.mother.workInfo.workSectorType"
          workPhoneName="parentsInfo.mother.workInfo.workPhone"
        />
      </Box>
    </>
  );
};

export default MoatherInfoComponent;
