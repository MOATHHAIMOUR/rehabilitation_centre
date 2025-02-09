// import {
//   Control,
//   FieldError,
//   FieldValues,
//   Path,
//   UseFormRegister,
// } from "react-hook-form";
// import ControlledSelectMenu from "../../../../components/ControlledSelectMenu";
// import Box from "../../../../components/ui/Box";
// import CustomTextInput from "../../../../components/ui/CustomTextInput";
// import { AnimatePresence, motion } from "framer-motion";
// import { useState } from "react";
// import Modal from "../../../../components/ui/Modal";
// import NewCompanyForm from "../NewCompanyForm";

// interface IProps<T extends FieldValues> {
//   register: UseFormRegister<T>;
//   name: Path<T>[];
//   error?: Array<FieldError | undefined>;
//   control: Control<T>;
// }
// const WorkInfo = <T extends FieldValues>({
//   control,
//   error,
//   name,
//   register,
// }: IProps<T>) => {
//   /* ────────────── STATE  ────────────── */
//   const [isNewCompaneyModalOpend, setNewCompaneyModal] = useState(false);
//   /* ────────────── HANDLERS  ────────────── */
//   function HandleOpenNewCompaneyModal() {
//     setNewCompaneyModal(true);
//   }
//   function HandleCloseNewCompaneyModal() {
//     setNewCompaneyModal(false);
//   }

//   return (
//     <>
//       <CustomTextInput
//         isRequired={true}
//         {...register(name[0])}
//         label="هاتف العمل"
//       />
//       <Box>
//         <ControlledSelectMenu
//           control={control}
//           name={name[1]}
//           options={[]}
//           isMulti={false}
//           label="أختر الشركة"
//           isRequired={true}
//           error={error?.[0]}
//         />
//         <p
//           onClick={HandleOpenNewCompaneyModal}
//           className="text-xs mt-2 text-blue-700 cursor-pointer"
//         >
//           لم تجد الشركة ؟ أضف واحده سريعا للنظام
//         </p>
//       </Box>
//       <ControlledSelectMenu
//         control={control}
//         name={name[2]}
//         options={[]}
//         isMulti={false}
//         label="أختر القطاع"
//         isRequired={true}
//         error={error?.[1]}
//       />
//       <ControlledSelectMenu
//         control={control}
//         name={name[3]}
//         options={[]}
//         isMulti={false}
//         label="المجال: مثال صحة,تعليم"
//         isRequired={true}
//         error={error?.[2]}
//       />

//       <AnimatePresence>
//         {isNewCompaneyModalOpend && (
//           <motion.div
//             initial={{
//               opacity: 0,
//             }}
//             animate={{
//               opacity: 1,
//             }}
//             transition={{
//               duration: 0.2,
//             }}
//             exit={{
//               opacity: 0,
//             }}
//           >
//             <Modal
//               isOpen={isNewCompaneyModalOpend}
//               title="أضف شركة جديده للنظام"
//             >
//               <NewCompanyForm onCancel={HandleCloseNewCompaneyModal} />
//             </Modal>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default WorkInfo;
