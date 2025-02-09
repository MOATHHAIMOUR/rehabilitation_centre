// import {
//   Control,
//   Controller,
//   FieldErrors,
//   UseFormRegister,
// } from "react-hook-form";
// import Box from "../../../../components/ui/Box";
// import SelectMenu from "../../../../components/ui/SelectMenu";
// import { IOpenApplicantFolder } from "../../interface";
// import { findOption } from "../../../../utils";
// import CustomTextArea from "../../../../components/ui/CustomTextArea";
// import {
//   useGetMinistryEducationsQuery,
//   useLazyGetMinistryEducationLevelsByIdQuery,
// } from "../../store/ministryEducationApi";

// interface IProps {
//   control: Control<IOpenApplicantFolder>;
//   register: UseFormRegister<IOpenApplicantFolder>;
//   errors: FieldErrors<IOpenApplicantFolder>;
// }

// const EducationInfo = ({ control, errors, register }: IProps) => {
//   /* ────────────── STATE  ────────────── */
//   const { data: MinistryEducationsResponse } = useGetMinistryEducationsQuery();
//   const ministryEducations =
//     MinistryEducationsResponse?.data.map((m) => ({
//       label: m.nameAr,
//       value: m.ministryEducationId,
//     })) || [];

//   const [
//     ministryEducationLevelTrigger,
//     {
//       data: MinistryEducationLevelsResponse,
//       isLoading: MinistryEducationLevelsLoading,
//     },
//   ] = useLazyGetMinistryEducationLevelsByIdQuery();
//   const ministryEducationLevels =
//     MinistryEducationLevelsResponse?.data?.map((m) => ({
//       label: m.levelAr,
//       value: m.ministryEducationLevelId,
//     })) || [];

//   /* ────────────── HANDLERS  ────────────── */
//   function onChangeMinistryEducationHandler(val: number) {
//     try {
//       ministryEducationLevelTrigger(val);
//     } catch {
//       //
//     }
//   }

//   return (
//     <Box className="flex  flex-col gap-8">
//       <Controller
//         name="applicantEducationInfo.MinstryEducationTypeId" // The form field name
//         control={control} // Pass the control from react-hook-form
//         render={({ field }) => {
//           return (
//             <SelectMenu
//               {...field}
//               value={findOption(ministryEducations, field.value)} // Pass both options and current value
//               onChange={(selected) => {
//                 if (selected && "value" in selected) {
//                   field.onChange(selected.value); // Handle single value
//                   onChangeMinistryEducationHandler(selected.value);
//                 } else {
//                   field.onChange(null); // Handle no selection
//                 }
//               }}
//               isRequired={true}
//               label="نوع الوزارة"
//               options={ministryEducations}
//               error={
//                 errors.applicantEducationInfo?.MinstryEducationTypeId
//                   ?.message ?? ""
//               } // Display validation error
//             />
//           );
//         }}
//       />

//       <Controller
//         name="applicantEducationInfo.MinstryEducationTLevelId" // The form field name
//         control={control} // Pass the control from react-hook-form
//         render={({ field }) => {
//           return (
//             <SelectMenu
//               {...field}
//               label="المستوى التعليمي"
//               isLoading={MinistryEducationLevelsLoading}
//               options={ministryEducationLevels}
//               value={findOption(
//                 ministryEducationLevels,
//                 field.value // Directly use the number
//               )}
//               onChange={(selected) => {
//                 if (selected && "value" in selected) {
//                   field.onChange(selected.value); // Handle single value
//                 } else {
//                   field.onChange(null); // Handle no selection
//                 }
//               }}
//             />
//           );
//         }}
//       />

//       <CustomTextArea
//         {...register("applicantClassfication.note")}
//         label="ملاحظات"
//         name="notes"
//       />
//     </Box>
//   );
// };

// export default EducationInfo;
