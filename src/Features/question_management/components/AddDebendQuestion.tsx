import { useEffect, useState } from "react";
import { EnumAnswerType } from "../enums";
import { AnimatePresence, motion } from "framer-motion";
import CustomTextArea from "../../../components/ui/CustomTextArea";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import { choicesData } from "../../../utils";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { IFormAddNewQuestion } from "../interfaces";
import ControlledSelectMenu from "../../../components/ControlledSelectMenu";
import { isAnswerTypeMenu } from "../utils";
import Box from "../../../components/ui/Box";
import {
  hightAnimationProps,
  opacityAnimationProps,
  opcityHightanimationProps,
} from "../animation";
import { WhenToShowDebenAnswerData } from "../data";

interface IProps {
  control: Control<IFormAddNewQuestion>;
  register: UseFormRegister<IFormAddNewQuestion>;
  watch: UseFormWatch<IFormAddNewQuestion>;
  answerTypeData:
    | {
        label: string;
        value: number;
      }[]
    | undefined;
  setValue: UseFormSetValue<IFormAddNewQuestion>;
  errors: FieldErrors<IFormAddNewQuestion>;
}

/* ────────────── STATE  ────────────── */
const AddDebendQuestion = ({
  control,
  register,
  answerTypeData,
  watch,
  setValue,
  errors,
}: IProps) => {
  const [debendQF, setDebendQF] = useState<{
    flag: boolean;
    anwerType: EnumAnswerType | null;
  }>({
    anwerType: null,
    flag: false,
  });

  console.log("debendQF.flag: " + debendQF.flag);
  /* ────────────── FORM  ────────────── */
  const { fields: debendChoicesFields, append: appendDebendChoice } =
    useFieldArray({
      control,
      name: "debendQuestion.choices",
    });

  /* ────────────── HANDLERS  ────────────── */
  function HandleOnAddDebendQ() {
    setDebendQF({
      flag: true,
      anwerType: null,
    });
  }

  function HandleOnRemoveDebendQ() {
    setDebendQF({
      flag: false,
      anwerType: null,
    });
    setValue("debendQuestion", null);
  }

  useEffect(() => {
    setValue("debendQuestion", null);
  }, []);
  /* ────────────── RENDER  ────────────── */
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
        />
      </div>
    </motion.div>
  ));

  console.log("debendQF.flag: " + debendQF.flag);
  const renderDebendQuestion = debendQF.flag && (
    <motion.div
      {...opcityHightanimationProps}
      className="mb-4 flex flex-col gap-8"
    >
      <CustomTextArea
        {...register("debendQuestion.nameAr")}
        label="السؤال التابع"
        error={errors.debendQuestion?.nameAr?.message}
      />
      <ControlledSelectMenu
        control={control}
        label="نوع إجابة السؤال التابع"
        name="debendQuestion.answerTypeId"
        options={answerTypeData ?? []}
        externalOnChange={(val) => {
          if (val && !Array.isArray(val)) {
            setDebendQF((prev) => ({ ...prev, anwerType: val }));
            if (isAnswerTypeMenu(val))
              appendDebendChoice({ id: Date.now(), value: "" });
          }
        }}
        error={errors.debendQuestion?.answerTypeId}
      />
      {isAnswerTypeMenu(watch("debendQuestion.answerTypeId")) && (
        <Box className="flex flex-col gap-3 font-semibold">
          {renderdebendChoicesFields}
          <motion.div
            {...opcityHightanimationProps}
            onClick={() => appendDebendChoice({ id: Date.now(), value: "" })}
            className=" flex gap-2 items-center cursor-pointer"
          >
            <CiCirclePlus className="text-blue-900 font-bold" size={25} />
            <p className="text-blue-900 text-sm ">أضف خياراً جديداً</p>
          </motion.div>

          <ControlledSelectMenu
            control={control}
            label="إظهار السؤال الثاني عند إجابة الأول "
            name="debendQuestion.whenToDebShowQuestion"
            options={WhenToShowDebenAnswerData}
            error={errors.debendQuestion?.whenToDebShowQuestion}
          />
        </Box>
      )}
    </motion.div>
  );

  return (
    <>
      <motion.div
        {...opacityAnimationProps}
        onClick={debendQF.flag ? HandleOnRemoveDebendQ : HandleOnAddDebendQ}
        className="mt-8 mb-4 flex gap-2 items-center cursor-pointer"
      >
        {debendQF.flag ? (
          <CiCircleMinus size={40} />
        ) : (
          <CiCirclePlus size={40} />
        )}
        <p className="text-xl font-semibold">
          {debendQF.flag
            ? "إخفاء السؤال التابع"
            : "هل تريد إضافة سؤال يعتمد على السؤال السابق؟"}
        </p>
      </motion.div>

      <AnimatePresence>{renderDebendQuestion}</AnimatePresence>
    </>
  );
};

export default AddDebendQuestion;
