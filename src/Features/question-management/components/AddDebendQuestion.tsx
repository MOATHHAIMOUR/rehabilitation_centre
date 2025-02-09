import { AnimatePresence, motion } from "framer-motion";
import CustomTextArea from "../../../components/ui/CustomTextArea";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useWatch,
} from "react-hook-form";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import { choicesData } from "../../../utils";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import ControlledSelectMenu from "../../../components/ControlledSelectMenu";
import { isAnswerTypeMenu } from "../utils";
import Box from "../../../components/ui/Box";
import {
  hightAnimationProps,
  opacityAnimationProps,
  opcityHightanimationProps,
} from "../animation";
import { WhenToShowDebenAnswerData } from "../data";
import { AddNewQuestionSchemaType } from "../validation";
import { EnumAnswerType } from "../enums";

interface IProps {
  control: Control<AddNewQuestionSchemaType>;
  register: UseFormRegister<AddNewQuestionSchemaType>;
  watch: UseFormWatch<AddNewQuestionSchemaType>;
  answerTypeData:
    | {
        label: string;
        value: number;
      }[]
    | undefined;
  setValue: UseFormSetValue<AddNewQuestionSchemaType>;
  fullErrors: FieldErrors<
    Extract<AddNewQuestionSchemaType, { hasDebenQuestion: true }>
  >;
}

const AddDebendQuestion = ({
  control,
  register,
  answerTypeData,
  watch,
  fullErrors,
}: IProps) => {
  const {
    fields: debendChoicesFields,
    append: appendDebendChoice,
    remove,
  } = useFieldArray({
    control,
    name: "debendQuestion.choices",
  });

  const hadDebendQ = useWatch({ control, name: "hasDebenQuestion" });

  const renderdebendChoicesFields = debendChoicesFields.map((field, index) => (
    <motion.div
      key={field.id}
      {...hightAnimationProps}
      className="flex gap-2 items-center cursor-pointer"
    >
      <div className="relative">
        <CustomTextInput
          className="w-full"
          {...register(`debendQuestion.choices.${index}.value`)}
          label={choicesData[index]}
          error={fullErrors.debendQuestion?.choices?.[index]?.value?.message} // ✅ Correct error handling
        />
      </div>
    </motion.div>
  ));

  const renderDebendQuestion = (
    <motion.div
      {...opcityHightanimationProps}
      className="mb-4 flex flex-col gap-8"
    >
      <CustomTextArea
        {...register("debendQuestion.nameAr")}
        label="السؤال التابع"
        error={fullErrors.debendQuestion?.nameAr?.message} // ✅ Corrected error reference
      />

      <ControlledSelectMenu
        control={control}
        label="نوع إجابة السؤال التابع"
        name="debendQuestion.answerTypeId"
        options={answerTypeData ?? []}
        externalOnChange={(val) => {
          if (val && !Array.isArray(val)) {
            if (isAnswerTypeMenu(val))
              appendDebendChoice({ id: Date.now(), value: "" });
            else remove();
          }
        }}
        error={fullErrors.debendQuestion?.answerTypeId} // ✅ Corrected error handling
      />

      {isAnswerTypeMenu(watch("debendQuestion.answerTypeId")) && (
        <Box className="flex flex-col gap-3 font-semibold">
          {renderdebendChoicesFields}
          <motion.div
            {...opcityHightanimationProps}
            onClick={() => appendDebendChoice({ id: Date.now(), value: "" })}
            className="flex gap-2 items-center cursor-pointer"
          >
            <CiCirclePlus className="text-blue-900 font-bold" size={25} />
            <p className="text-blue-900 text-sm">أضف خياراً جديداً</p>
          </motion.div>
        </Box>
      )}
      {watch("answerTypeId") === EnumAnswerType.Binery && (
        <ControlledSelectMenu
          control={control}
          label="إظهار السؤال الثاني عند إجابة الأول"
          name="debendQuestion.whenToDebShowQuestion"
          options={WhenToShowDebenAnswerData}
          error={fullErrors.debendQuestion?.whenToDebShowQuestion} // ✅ Correct reference
        />
      )}
    </motion.div>
  );

  return (
    <>
      <motion.label
        {...opacityAnimationProps}
        className="mt-8 mb-4 flex gap-2 items-center cursor-pointer"
      >
        <input
          type="checkbox"
          {...register("hasDebenQuestion")}
          className="hidden"
        />
        {hadDebendQ ? (
          <CiCircleMinus size={40} className="text-red-500" />
        ) : (
          <CiCirclePlus size={40} className="text-green-500" />
        )}
        <p className="text-xl font-semibold">
          {hadDebendQ
            ? "إخفاء السؤال التابع"
            : "هل تريد إضافة سؤال يعتمد على السؤال السابق؟"}
        </p>
      </motion.label>

      <AnimatePresence>{hadDebendQ && renderDebendQuestion}</AnimatePresence>
    </>
  );
};

export default AddDebendQuestion;
