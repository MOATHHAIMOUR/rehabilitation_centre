import { Control, FieldValues, UseFormRegister } from "react-hook-form";
import ControlledSelectMenu from "../../../components/ControlledSelectMenu";
import ControlledRadioButton from "../../../components/ControlledRadioButton";
import Box from "../../../components/ui/Box";
import { EnumAnswerType } from "../../question_management/enums";
import CustomTextInput from "../../../components/ui/CustomTextInput";

interface QuestionRendererProps<T extends FieldValues> {
  q: {
    questionId: number;
    nameAr: string;
    answerTypeId: EnumAnswerType;
    questionsChoices?: { choiceName: string; questionChoiceId: number }[];
  };
  control: Control<T>;
  register: UseFormRegister<FieldValues>;
  namePrefix: string;
  index?: number;
}

const QuestionRenderer = <T extends FieldValues>({
  q,
  control,
  namePrefix,
  index,
  register,
}: QuestionRendererProps<T>) => {
  return (
    <Box key={q.questionId} className="mb-4 p-6 rounded-md shadow-md bg-white">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{q.nameAr}</h3>
      {(() => {
        switch (q.answerTypeId) {
          case EnumAnswerType.SelecetMenuWithOneAnswer:
            return (
              <>
                <ControlledSelectMenu
                  control={control as Control<FieldValues>} // ✅ Fix by enforcing FieldValues compatibility
                  name={namePrefix}
                  options={
                    q.questionsChoices?.map((qc) => ({
                      label: qc.choiceName,
                      value: qc.questionChoiceId,
                    })) ?? []
                  }
                  label={q.nameAr}
                />
                <input
                  type="hidden"
                  {...register(`Answers.${q.questionId}.id`)}
                  value={q.questionId}
                />
              </>
            );

          case EnumAnswerType.TextAnswer:
            return (
              <CustomTextInput
                label=""
                placeholder="أدخل إجابتك هنا"
                name={namePrefix}
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
                  control={control as Control<FieldValues>} // ✅ Fix compatibility
                  name={namePrefix}
                  label={q.nameAr}
                  textClassName=""
                />
                <input
                  type="hidden"
                  {...register(`${namePrefix}.AValue`)}
                  value={q.questionId}
                />
              </div>
            );

          case EnumAnswerType.MultiSelecetMenuWithMultibleAnswer:
            return (
              <ControlledSelectMenu
                control={control as Control<FieldValues>} // ✅ Fix compatibility
                isMulti={true}
                name={namePrefix}
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
      })()}
    </Box>
  );
};

export default QuestionRenderer;
