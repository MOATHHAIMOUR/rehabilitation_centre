// import { useForm, SubmitHandler } from "react-hook-form";
// import CustomTextInput from "../../../components/ui/CustomTextInput";
// import ControlledSelectMenu from "../../../components/ControlledSelectMenu";
// import { INewCompanyInfo } from "../interface";

// interface IPops {
//   onCancel: () => void;
// }
// const NewCompanyForm = ({ onCancel }: IPops) => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<INewCompanyInfo>();

//   const onSubmit: SubmitHandler<INewCompanyInfo> = (data) => {
//     console.log("New Company Data:", data);
//     alert("Company added successfully!");
//     // Handle API call or further processing here
//   };

//   return (
//     <form
//       className="mt-10 flex flex-col gap-4"
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       {/* Work Sector Type */}
//       <div className="mb-4">
//         <ControlledSelectMenu
//           control={control}
//           name="workSectorType"
//           options={[]}
//           isRequired={true}
//           label="نوع القطاع"
//         />
//         {errors.workSectorType && (
//           <p className="text-red-500 text-sm">
//             {errors.workSectorType?.message}
//           </p>
//         )}
//       </div>

//       {/* Work Field */}
//       <div className="mb-4">
//         <ControlledSelectMenu
//           control={control}
//           name="workFieldId"
//           options={[]}
//           isRequired={true}
//           label="مجال الخدمة"
//         />
//         {errors.workSectorType && (
//           <p className="text-red-500 text-sm">
//             {errors.workSectorType?.message}
//           </p>
//         )}
//       </div>

//       {/* Company Name */}
//       <div className="mb-4">
//         <CustomTextInput
//           isRequired={true}
//           label="اسم الشركة"
//           {...register("companeyName", {
//             required: "Company Name is required",
//           })}
//         />
//         {errors.companeyName && (
//           <p className="text-red-500 text-sm">{errors.companeyName?.message}</p>
//         )}
//       </div>

//       {/* Job Title */}
//       <div className="mb-4">
//         <CustomTextInput
//           isRequired={true}
//           label="عنوان الوظيفة"
//           {...register("companeyName", {
//             required: "Job Title is required",
//           })}
//         />
//         {errors.companeyName && (
//           <p className="text-red-500 text-sm">{errors.companeyName?.message}</p>
//         )}
//       </div>

//       {/* Submit Button */}
//       <div className="flex gap-4">
//         <button
//           onClick={onCancel}
//           type="button"
//           className="mt-4 w-full bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//         >
//           إلغاء
//         </button>
//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="mt-4 w-full bg-bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//         >
//           تأكيد
//         </button>
//       </div>
//     </form>
//   );
// };

// export default NewCompanyForm;
