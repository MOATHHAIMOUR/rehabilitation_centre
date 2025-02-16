// import { useFormContext, useWatch } from "react-hook-form";
// import Box from "../../../components/ui/Box";
// import { useGetQuestionByStageCategoryIdQuery } from "../../../store/questionApiSlice";
// import QuestionRenderer from "./QuestionRenderer";

// const ParentQuestions = () => {
//   /* ────────────── STORE  ────────────── */
//   const { data: parentQuestionsReponse } = useGetQuestionByStageCategoryIdQuery(
//     EnumStageCategoryType.FirstResearsh_Parents
//   );

//   /* ────────────── REACT-HOOK-FORM  ────────────── */
//   const { register, control } = useFormContext();

//   const watchedValues = useWatch({ control, name: "Answers" }); // ✅ Watch all parent answers at once

//   /* ────────────── RENDER  ────────────── */
//   const renderParentQuestions = parentQuestionsReponse?.data.map((q, index) => {
//     const watchedValue = watchedValues?.[q.questionId]; // ✅ Access specific question's value

//     console.log("watchedValue: " + watchedValue?.id);
//     return (
//       <QuestionRenderer
//         register={register}
//         control={control}
//         namePrefix={`Answers.${q.questionId}`}
//         index={index}
//         q={q}
//       />
//     );
//   });

//   return (
//     <Box className="mt-10 grid grid-cols-1 bg-gray-100">
//       {renderParentQuestions}
//     </Box>
//   );
// };

// export default ParentQuestions;
