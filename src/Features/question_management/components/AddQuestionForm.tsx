import { useForm, SubmitHandler } from "react-hook-form";
import { IAddNewQuestion, IFormAddNewQuestion } from "../interfaces";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";
import { useAddNewQuestionMutation } from "../store/questionApiSlice";
import { useGetAllAnswerTypesQuery } from "../store/answerTypeApiSlice";
import AddDebendQuestion from "./AddDebendQuestion";
import AddMainQuestion from "./AddMainQuestion";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddNewQSchema } from "../validation";
import { EnumAnswerType } from "../enums";
import { useEffect } from "react";

interface IPops {
  onCancel: () => void;
  StageCategoryId: number;
}

const AddQuestionForm = ({ onCancel, StageCategoryId }: IPops) => {
  /* ────────────── STORE ────────────── */
  const { data: AnswerTypeResponse } = useGetAllAnswerTypesQuery();
  const answerTypeData = AnswerTypeResponse?.data.map((a) => ({
    label: a.type,
    value: a.answerTypeId,
  }));

  const [addNewQuestionTrigger, { isLoading }] = useAddNewQuestionMutation();

  /* ────────────── FORM  ────────────── */
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormAddNewQuestion>({
    defaultValues: {
      debendQuestion: null, // Initialize as null
    },
    resolver: zodResolver(AddNewQSchema),
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Validation Errors:");
      Object.entries(errors).forEach(([key, value]) => {
        console.log(`${key}: ${value.message}`);
      });
    }
  }, [errors]);

  /* ────────────── HANDLERS  ────────────── */
  const onSubmit: SubmitHandler<IFormAddNewQuestion> = async (data) => {
    console.log("sumited");
    try {
      let debendQ: IAddNewQuestion | null = null;
      if (data?.debendQuestion) {
        debendQ = {
          nameAr: data.debendQuestion.nameAr,
          answerTypeId: data.debendQuestion.answerTypeId,
          choices: data.debendQuestion.choices?.map((p) => p.value) ?? null,
          parentQuestionId: null,
          stageCategoryId: StageCategoryId,
          debendQuestion: null,
        };
      }
      const addNewQ: IAddNewQuestion = {
        nameAr: data.nameAr,
        answerTypeId: data.answerTypeId,
        choices: data.choices?.map((p) => p.value) ?? null,
        parentQuestionId: 0,
        stageCategoryId: StageCategoryId,
        debendQuestion: debendQ,
      };

      // await addNewQuestionTrigger(addNewQ).unwrap();
      toast.success("تم إضافة السؤال بنجاح", {
        hideProgressBar: true,
        autoClose: 3000,
        position: "top-right",
      });
    } catch {
      toast.error("تعذر إكمال العملية. حاول مجدداً.");
    }
  };

  return (
    <form
      className="h-[100%] flex flex-col justify-between gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <AddMainQuestion
          answerTypeData={answerTypeData}
          control={control}
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
        />
        <AddDebendQuestion
          answerTypeData={answerTypeData}
          control={control}
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex bottom-0 gap-4">
        <button
          onClick={onCancel}
          type="button"
          className="mt-4 w-full bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          إغلاق
        </button>
        <Button
          isLoading={isLoading}
          type="submit"
          className="mt-4 w-full bg-bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          تأكيد
        </Button>
      </div>
    </form>
  );
};

export default AddQuestionForm;
