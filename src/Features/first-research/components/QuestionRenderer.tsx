import {
  Control,
  UseFormRegister,
  Path,
  FieldErrors,
  UseFormUnregister,
  useWatch,
} from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

import ControlledSelectMenu from "../../../components/ControlledSelectMenu";
import ControlledRadioButton from "../../../components/ControlledRadioButton";
import Box from "../../../components/ui/Box";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import { EnumAnswerType } from "../../question-management/enums";
import { TResearchInfoSchema } from "../types/researchInfoSchema";
import QuestionNotes from "./QuestionNotes";
import { opacityAnimationProps } from "../../question-management/animation";

interface QuestionRendererProps {
  q: TResearchInfoSchema["questions"][0];
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
  const isQHasNotes = useWatch({
    control,
    name: `${namePrefix}.isHasNotes` as Path<TResearchInfoSchema>,
  });

  console.log("isQHasNotes");
  console.log(isQHasNotes);

  return (
    <Box className="mb-10 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
      {/* Question Text */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">{q.questionText}</h3>
      <input
        type="hidden"
        {...register(`${namePrefix}.isRequired` as Path<TResearchInfoSchema>)}
        value={q.isRequired ? "yes" : "no"}
      />{" "}
      <input
        type="hidden"
        {...register(`${namePrefix}.answerType` as Path<TResearchInfoSchema>)}
        value={q.answerType}
      />
      {/* Question Input Area */}
      <div className="mb-6">
        {(() => {
          switch (q.answerType) {
            case EnumAnswerType.SelecetMenuWithOneAnswer:
              return (
                <ControlledSelectMenu
                  control={control}
                  name={`${namePrefix}.answer` as Path<TResearchInfoSchema>}
                  options={q?.questionChoices ?? []}
                  label=""
                />
              );

            case EnumAnswerType.TextAnswer:
              return (
                <CustomTextInput
                  label=""
                  placeholder="أدخل إجابتك هنا"
                  {...register(
                    `${namePrefix}.answer` as Path<TResearchInfoSchema>
                  )}
                />
              );

            case EnumAnswerType.Binery:
              return (
                <div className="flex items-center gap-6">
                  <ControlledRadioButton
                    control={control}
                    name={`${namePrefix}.answer` as Path<TResearchInfoSchema>}
                    label=""
                    textClassName=""
                  />
                </div>
              );

            case EnumAnswerType.MultiSelecetMenuWithMultibleAnswer:
              return (
                <ControlledSelectMenu
                  control={control}
                  isMulti
                  name={`${namePrefix}.answer` as Path<TResearchInfoSchema>}
                  options={q.questionChoices ?? []}
                  label=""
                />
              );

            default:
              return <p className="text-red-600">❌ نوع السؤال غير معروف</p>;
          }
        })()}
      </div>
      {/* Hidden Inputs for Non-Editable Fields */}
      {/* <input
        type="hidden"
        {...register(`${namePrefix}.questionId` as Path<TResearchInfoSchema>)}
        value={q.questionId}
      />
      <input
        type="hidden"
        {...register(`${namePrefix}.questionText` as Path<TResearchInfoSchema>)}
        value={q.questionText}
      />


      <input
        type="hidden"
        {...register(`${namePrefix}.answerType` as Path<TResearchInfoSchema>)}
        value={q.answerType}
      />
      <input
        type="hidden"
        {...register(`${namePrefix}.isRequired` as Path<TResearchInfoSchema>)}
        value={q.isRequired ? "yes" : "no"}
      /> */}
      {/* Notes Toggle */}
      <motion.label
        {...opacityAnimationProps}
        className="mt-6 mb-4 flex items-center gap-3 cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1 transition-all"
      >
        <input
          type="checkbox"
          {...register(`${namePrefix}.isHasNotes` as Path<TResearchInfoSchema>)}
          className="hidden"
        />
        {isQHasNotes ? (
          <CiCircleMinus size={36} className="text-red-500" />
        ) : (
          <CiCirclePlus size={36} className="text-green-500" />
        )}
        <p className="text-lg font-medium">
          {isQHasNotes ? "إلغاء الملاحظات" : "إضافة ملاحظات"}
        </p>
      </motion.label>
      {/* Notes Section */}
      <AnimatePresence>
        {isQHasNotes && (
          <div className="mt-4">
            <QuestionNotes
              register={register}
              errors={errors}
              namePrefix={`${namePrefix}.notes`}
              unregister={unregister}
              index={index}
            />
          </div>
        )}
      </AnimatePresence>
      {/* Error Message */}
      {errors.questions?.[index]?.answer && (
        <p className="mt-4 text-red-600 font-medium">
          {errors.questions[index].answer.message}
        </p>
      )}
    </Box>
  );
};

export default QuestionRenderer;
