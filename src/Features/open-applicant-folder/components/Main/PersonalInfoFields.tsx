// import { Controller, useFormContext } from "react-hook-form";
// import { useGetCountriesQuery } from "../../../shared/store/SharedApi";
// import CustomTextInput from "../../../../components/ui/CustomTextInput";
// import LocationInfo from "../LocationInfo";
// import SelectMenu from "../../../../components/ui/SelectMenu";
// import PersonBirthData from "../PersonBirthData";

// const PersonalInfoFields = () => {
//   /* ────────────── STORE  ────────────── */
//   const { data: countriesResponse } = useGetCountriesQuery();
//   const countries =
//     countriesResponse?.data?.map((c) => ({
//       label: c.nameAr,
//       value: c.countryId.toString(),
//     })) || [];

//   /* ────────────── REACT-HOOK-FORM  ────────────── */
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//       {/* National NO */}
//       <CustomTextInput
//         {...register("applicatnPersonInfo.nationalIdOrIqama")}
//         label={"الهوية الوطنية أو الإقامة"}
//         isRequired={true}
//         className="  lg:col-span-4 lg:w-80"
//         error={errors.applicatnPersonInfo?.nationalIdOrIqama?.message}
//       />
//       {/* Person Names */}
//       <CustomTextInput
//         {...register("applicatnPersonInfo.firstName")}
//         label={"الإسم الأول"}
//         isRequired={true}
//         error={errors.applicatnPersonInfo?.firstName?.message}
//       />
//       <CustomTextInput
//         {...register("applicatnPersonInfo.secondName")}
//         label={"الإسم الثاني"}
//         isRequired={true}
//         error={errors.applicatnPersonInfo?.secondName?.message}
//       />
//       <CustomTextInput
//         {...register("applicatnPersonInfo.thirdName")}
//         error={errors.applicatnPersonInfo?.thirdName?.message}
//         label={"الإسم الثالث"}
//         isRequired={true}
//       />
//       <CustomTextInput
//         {...register("applicatnPersonInfo.fourthName")}
//         label={"الإسم الرابع"}
//         isRequired={true}
//         error={errors.applicatnPersonInfo?.fourthName?.message}
//       />
//       {/* Person Birth Data */}
//       <PersonBirthData
//         control={control}
//         clearErrors={clearErrors}
//         setValue={setValue}
//         name="applicatnPersonInfo.dateOfBirthEn"
//         error={errors.applicatnPersonInfo?.dateOfBirthEn}
//       />
//       {/* Contact Info */}
//       <CustomTextInput
//         {...register("applicatnPersonInfo.contactInfo.phoneNumber")}
//         label={"رقم الهاتف"}
//         isRequired={true}
//         error={errors.applicatnPersonInfo?.contactInfo?.phoneNumber?.message}
//       />
//       <CustomTextInput
//         {...register("applicatnPersonInfo.contactInfo.phoneNumber2")}
//         label={"رقم الهاتف (الثاني)"}
//         isRequired={false}
//         error={errors.applicatnPersonInfo?.contactInfo?.phoneNumber2?.message}
//       />
//       <CustomTextInput
//         {...register("applicatnPersonInfo.contactInfo.email")}
//         label={"الإيميل"}
//         isRequired={false}
//         error={errors.applicatnPersonInfo?.contactInfo?.email?.message}
//       />
//       {/* Gender Info */}

//       <Controller
//         name="applicatnPersonInfo.gender"
//         control={control}
//         render={({ field }) => (
//           <SelectMenu
//             isRequired={true}
//             error={errors.applicatnPersonInfo?.gender?.message ?? ""} // Display validation error
//             label="الجنس"
//             options={[
//               { value: 1, label: "ذكر" },
//               { value: 2, label: "أنثى" },
//             ]}
//             value={
//               field.value
//                 ? {
//                     value: field.value,
//                     label: field.value === 1 ? "ذكر" : "أنثى",
//                   }
//                 : null
//             } // Map the value to react-select's format
//             onChange={(selected) => {
//               if (selected && "value" in selected) {
//                 field.onChange(selected.value); // Handle single value
//               } else {
//                 field.onChange(null); // Handle no selection
//               }
//             }}
//           />
//         )}
//       />
//       {/* Nationallity Info */}
//       <Controller
//         name="applicatnPersonInfo.nationality"
//         control={control}
//         render={({ field }) => (
//           <SelectMenu
//             isRequired={true}
//             {...field} // Binds React Hook Form's field state and event handlers
//             error={errors.applicatnPersonInfo?.nationality?.message ?? ""} // Display Zod error message
//             label="الجنسية"
//             onChange={(selected) => {
//               if (selected && "value" in selected) {
//                 field.onChange(selected.value); // Handle single value
//               } else {
//                 field.onChange(null); // Handle no selection
//               }
//             }}
//             value={
//               countries.find((option) => option.value === field.value) || null
//             } // Map the field value to the matching option
//             options={countries} // Pass options to the dropdown
//           />
//         )}
//       />
//       {/* Location Info */}
//       <LocationInfo errors={errors} control={control} />
//     </div>
//   );
// };
// export default PersonalInfoFields;
