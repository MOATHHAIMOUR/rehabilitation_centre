// import {
//   Control,
//   FieldErrors,
//   UseFormClearErrors,
//   UseFormRegister,
//   UseFormSetValue,
// } from "react-hook-form";
// import { IOpenApplicantFolder } from "../../interface";
// import Box from "../../../../components/ui/Box";
// import CustomTextInput from "../../../../components/ui/CustomTextInput";
// import PersonBirthData from "../PersonBirthData";
// import WorkInfo from "./WorkInfo";

// interface IProps {
//   control: Control<IOpenApplicantFolder>;
//   register: UseFormRegister<IOpenApplicantFolder>;
//   errors: FieldErrors<IOpenApplicantFolder>;
//   setValue: UseFormSetValue<IOpenApplicantFolder>;
//   clearErrors: UseFormClearErrors<IOpenApplicantFolder>;
// }
// const ApplicantParentInfo = ({
//   control,
//   errors,
//   register,
//   clearErrors,
//   setValue,
// }: IProps) => {
//   return (
//     <Box className="mt-10">
//       {/* Father info */}
//       <p className="text-2xl font-semibold">معلومات الأب</p>
//       <hr className="h-px my-8 bg-gray-900 border-0 dark:bg-gray-700" />
//       <Box className="grid grid-cols-4 gap-8">
//         <CustomTextInput
//           {...register("applicantFatherInfo.personInfo.nationalIdOrIqama")}
//           isRequired={true}
//           name="fatherName"
//           label="رقم الهوية او الإقامة"
//         />
//         <CustomTextInput
//           {...register("applicantFatherInfo.personInfo.fullName")}
//           isRequired={true}
//           name="fatherName"
//           label="الاسم الرباعي "
//         />

//         <CustomTextInput
//           isRequired={true}
//           {...register(
//             "applicantFatherInfo.personInfo.contactInfo.phoneNumber"
//           )}
//           label="رقم الجوال "
//         />

//         <PersonBirthData
//           name="applicatnPersonInfo.dateOfBirthEn"
//           control={control}
//           error={errors.applicantFatherInfo?.personInfo?.dateOfBirthEn}
//           setValue={setValue}
//           clearErrors={clearErrors}
//         />

//         <CustomTextInput
//           isRequired={false}
//           {...register("applicantFatherInfo.personInfo.contactInfo.email")}
//           label="البريد الالكتروني"
//         />

//         {/* Work Info */}
//         <WorkInfo
//           control={control}
//           register={register}
//           name={[
//             "applicantFatherInfo.workInfo.workPhone",
//             "applicantFatherInfo.workInfo.companeyId",
//             "applicantFatherInfo.workInfo.workSectorType",
//             "applicantFatherInfo.workInfo.workFieldId",
//           ]}
//           error={[
//             errors.applicantFatherInfo?.workInfo?.workPhone,
//             errors.applicantFatherInfo?.workInfo?.companeyId,
//             errors.applicantFatherInfo?.workInfo?.workSectorType,
//             errors.applicantFatherInfo?.workInfo?.workFieldId,
//           ]}
//         />
//       </Box>
//       {/* Mother info */}
//       <p className="mt-12 text-2xl font-semibold">معلومات الأم</p>
//       <hr className="h-px my-8 bg-gray-900 border-0 dark:bg-gray-700" />
//       <Box className="grid grid-cols-4 gap-8">
//         <CustomTextInput
//           {...register("applicantMotherInfo.personInfo.nationalIdOrIqama")}
//           isRequired={true}
//           name="fatherName"
//           label="رقم الهوية او الإقامة"
//         />
//         <CustomTextInput
//           {...register("applicantMotherInfo.personInfo.fullName")}
//           isRequired={true}
//           name="fatherName"
//           label="الاسم الرباعي "
//         />

//         <CustomTextInput
//           isRequired={true}
//           {...register(
//             "applicantMotherInfo.personInfo.contactInfo.phoneNumber"
//           )}
//           label="رقم الجوال "
//         />

//         <PersonBirthData
//           control={control}
//           error={errors.applicantMotherInfo?.personInfo?.dateOfBirthEn}
//           setValue={setValue}
//           clearErrors={clearErrors}
//           name="applicatnPersonInfo.dateOfBirthEn"
//         />

//         <CustomTextInput
//           isRequired={false}
//           {...register("applicantMotherInfo.personInfo.contactInfo.email")}
//           label="البريد الالكتروني"
//         />

//         {/* Work Info */}
//         <WorkInfo
//           control={control}
//           register={register}
//           name={[
//             "applicantMotherInfo.workInfo.workPhone",
//             "applicantMotherInfo.workInfo.companeyId",
//             "applicantMotherInfo.workInfo.workSectorType",
//             "applicantMotherInfo.workInfo.workFieldId",
//           ]}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default ApplicantParentInfo;
