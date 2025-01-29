import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { IFormAddNewQuestion } from "../interfaces";
import CustomTextArea from "../../../components/ui/CustomTextArea";
import ControlledSelectMenu from "../../../components/ControlledSelectMenu";
import { isAnswerTypeMenu } from "../utils";
import Box from "../../../components/ui/Box";
import { CiCirclePlus } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import { choicesData } from "../../../utils";
import { hightAnimationProps, opacityAnimationProps } from "../animation";

interface IProps {
  control: Control<IFormAddNewQuestion>;
  register: UseFormRegister<IFormAddNewQuestion>;
  watch: UseFormWatch<IFormAddNewQuestion>;
  setValue: UseFormSetValue<IFormAddNewQuestion>;
  answerTypeData:
    | {
        label: string;
        value: number;
      }[]
    | undefined;
  errors: FieldErrors<IFormAddNewQuestion>;
}

const AddMainQuestion = ({
  answerTypeData,
  control,
  register,
  watch,
  setValue,
  errors,
}: IProps) => {
  /* ────────────── REACT-HOOK-FROM  ────────────── */
  const {
    fields: choicesFields,
    append: appendChoice,
    remove: deleteChoice,
  } = useFieldArray({
    control,
    name: "choices",
  });
  const answerTypeId = watch("answerTypeId");

  function removeFieldHandler(index: number) {
    deleteChoice(index);
  }
  /* ────────────── RENDER  ────────────── */
  const renderChoicesFields = (
    <AnimatePresence>
      {choicesFields.map((field, index) => (
        <motion.div
          key={field.id}
          {...hightAnimationProps}
          className="relative flex gap-2 items-center cursor-pointer"
        >
          <CustomTextInput
            isFieldDeleted={true}
            onDelete={() => removeFieldHandler(index)}
            className="w-full"
            {...register(`choices.${index}.value`)}
            label={choicesData[index]}
            error={errors?.choices?.[index]?.value?.message}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );

  return (
    <Box className="mb-4 flex flex-col gap-8">
      {/* Main Question */}
      <CustomTextArea
        {...register("nameAr")}
        label="السؤال"
        error={errors.nameAr?.message}
      />

      <ControlledSelectMenu
        control={control}
        label="نوع إجابة السؤال"
        name="answerTypeId"
        options={answerTypeData ?? []}
        externalOnChange={(val) => {
          if (val && !Array.isArray(val)) {
            if (isAnswerTypeMenu(val))
              appendChoice({
                id: Date.now(),
                value: "",
              });
            else setValue("choices", null);
          }
        }}
        error={errors.answerTypeId}
      />

      {/* Choices */}
      {isAnswerTypeMenu(answerTypeId) && (
        <Box className="flex flex-col gap-3 font-semibold">
          {renderChoicesFields}
          <motion.div
            {...opacityAnimationProps}
            onClick={() => appendChoice({ id: Date.now(), value: "" })}
            className="flex  w-fit gap-2 items-center cursor-pointer"
          >
            <CiCirclePlus className="text-blue-900 font-bold" size={25} />
            <p className="text-blue-900 text-sm">أضف خياراً جديداً</p>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default AddMainQuestion;
