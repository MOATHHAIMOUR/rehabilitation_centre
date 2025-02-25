import {
  Control,
  UseFormRegister,
  Path,
  FieldErrors,
  UseFormUnregister,
  useWatch,
} from "react-hook-form";
import ControlledSelectMenu from "../../../components/ControlledSelectMenu";
import ControlledRadioButton from "../../../components/ControlledRadioButton";
import Box from "../../../components/ui/Box";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import { EnumAnswerType } from "../../question-management/enums";
import { TResearchInfoSchema } from "../types/researchInfoSchema";
import QuestionNotes from "./QuestionNotes";
import { AnimatePresence, motion } from "framer-motion";
import { opacityAnimationProps } from "../../question-management/animation";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

interface QuestionRendererProps {
  q: {
    questionId: number;
    nameAr: string;
    isRequired: boolean;
    answerTypeId: EnumAnswerType;
    questionsChoices?: { choiceName: string; questionChoiceId: number }[];
  };
  control: Control<TResearchInfoSchema>;
  errors: FieldErrors<TResearchInfoSchema>;
  register: UseFormRegister<TResearchInfoSchema>;
  unregister: UseFormUnregister<TResearchInfoSchema>;
  namePrefix: string;
  index: number;
}

const QuestionRenderer = ({
  q,
  control,
  namePrefix,
  errors,
  index,
  register,
  unregister,
}: QuestionRendererProps) => {
  /* ────────────── REACT-HOOk-FORM  ────────────── */

  const isQHasNotes = useWatch({
    control,
    name: `${namePrefix}.isHasNotes` as Path<TResearchInfoSchema>,
  });

  return (
    <Box
      key={q.questionId}
      className="mb-8 p-6 rounded-md shadow-md bg-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{q.nameAr}</h3>
      {(() => {
        // Question Render
        switch (q.answerTypeId) {
          case EnumAnswerType.SelecetMenuWithOneAnswer:
            return (
              <ControlledSelectMenu
                control={control}
                name={`${namePrefix}.answer` as Path<TResearchInfoSchema>}
                options={
                  q.questionsChoices?.map((qc) => ({
                    label: qc.choiceName,
                    value: qc.questionChoiceId,
                  })) ?? []
                }
                label={q.nameAr}
              />
            );

          case EnumAnswerType.TextAnswer:
            return (
              <CustomTextInput
                label=""
                placeholder="أدخل إجابتك هنا"
                {...register(
                  `${namePrefix}.answer` as Path<TResearchInfoSchema>
                )} // ✅ Fix: Register answer field
              />
            );

          case EnumAnswerType.Binery:
            return (
              <div className="flex items-center gap-4">
                {index !== undefined && (
                  <span className="text-white border-2 p-2 border-white h-10 w-10 rounded-full text-xl font-semibold bg-neutral-950 flex justify-center items-center ">
                    {index + 1}
                  </span>
                )}
                <ControlledRadioButton
                  control={control}
                  name={`${namePrefix}.answer` as Path<TResearchInfoSchema>}
                  label={q.nameAr}
                  textClassName=""
                />
              </div>
            );

          case EnumAnswerType.MultiSelecetMenuWithMultibleAnswer:
            return (
              <ControlledSelectMenu
                control={control}
                isMulti={true}
                name={`${namePrefix}.answer` as Path<TResearchInfoSchema>}
                options={
                  q.questionsChoices?.map((qc) => ({
                    label: qc.choiceName,
                    value: qc.questionChoiceId,
                  })) ?? []
                }
                label={q.nameAr}
              />
            );

          default:
            return <p className="text-red-500">❌ نوع السؤال غير معروف</p>;
        }
        //Other hidden prop
      })()}
      {/* ✅ Hidden Inputs for Non-Editable Fields */}
      <>
        <input
          type="hidden"
          {...register(`${namePrefix}.questionId` as Path<TResearchInfoSchema>)}
          value={q.questionId}
        />
        <input
          type="hidden"
          {...register(`${namePrefix}.answerType` as Path<TResearchInfoSchema>)}
          value={q.answerTypeId}
        />
        <input
          type="hidden"
          {...register(`${namePrefix}.isRequired` as Path<TResearchInfoSchema>)}
          value={q.isRequired ? "yes" : "no"}
        />
      </>

      {/* Notes  */}
      <motion.label
        {...opacityAnimationProps}
        className="mt-8 mb-4 flex gap-2 items-center cursor-pointer"
      >
        <input
          type="checkbox"
          {...register(`${namePrefix}.isHasNotes` as Path<TResearchInfoSchema>)}
          className="hidden"
        />
        {isQHasNotes ? (
          <CiCircleMinus size={40} className="text-red-500" />
        ) : (
          <CiCirclePlus size={40} className="text-green-500" />
        )}
        <p
          className={`text-xl font-semibold transition-all duration-300 ${
            isQHasNotes
              ? "text-red-500 hover:text-red-700"
              : "text-green-500 hover:text-green-700"
          } cursor-pointer`}
        >
          {isQHasNotes ? "❌ إلغاء الملاحظات" : "📝 إضافة ملاحظات"}
        </p>
      </motion.label>
      <AnimatePresence>
        {isQHasNotes && (
          <QuestionNotes
            register={register}
            errors={errors}
            namePrefix={`${namePrefix}.notes`}
            unregister={unregister}
            index={index}
          />
        )}
      </AnimatePresence>
      {errors.questionsAnswers?.[index]?.answer && (
        <p className="text-red-500">
          {errors.questionsAnswers[index].answer.message}
        </p>
      )}
    </Box>
  );
};

export default QuestionRenderer;
