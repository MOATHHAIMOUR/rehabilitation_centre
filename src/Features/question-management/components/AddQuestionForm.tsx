import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { IAddNewQuestion } from "../interfaces";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";
import { useAddNewQuestionMutation } from "../../shared/store/questionApiSlice";
import { useGetAllAnswerTypesQuery } from "../store/answerTypeApiSlice";
import AddDebendQuestion from "./AddDebendQuestion";
import AddMainQuestion from "./AddMainQuestion";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddNewQuestionSchema, AddNewQuestionSchemaType } from "../validation";

interface IPops {
  onCancel: () => void;
  StageId: number;
  StageCategoryId: number;
}

const AddQuestionForm = ({ onCancel, StageCategoryId, StageId }: IPops) => {
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
  } = useForm<AddNewQuestionSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(AddNewQuestionSchema),
    defaultValues: {
      hasDebenQuestion: false,
    },
    shouldUnregister: true,
  });

  const fullErrors: FieldErrors<
    Extract<AddNewQuestionSchemaType, { hasDebenQuestion: true }>
  > = errors;

  /* ────────────── HANDLERS  ────────────── */
  const onSubmit: SubmitHandler<AddNewQuestionSchemaType> = async (data) => {
    console.log("sumited");
    try {
      let debendQ: IAddNewQuestion | null = null;
      console.log("debendQName: " + Object.entries(data));
      if (data?.hasDebenQuestion) {
        debendQ = {
          stageId: StageId,
          nameAr: data.debendQuestion.nameAr.trim(),
          answerTypeId: data.debendQuestion.answerTypeId,
          choices:
            data.debendQuestion.choices?.map((p) => p.value.trim()) ?? null,
          parentQuestionId: null,
          stageCategoryId: StageCategoryId,
          debendQuestion: null,
          whenToShowQuestion: data.debendQuestion.whenToDebShowQuestion ?? null,
        };
      }
      const addNewQ: IAddNewQuestion = {
        stageId: StageId,
        nameAr: data.nameAr.trim(),
        answerTypeId: data.answerTypeId,
        choices: data.choices?.map((p) => p.value.trim()) ?? null,
        parentQuestionId: 0,
        stageCategoryId: StageCategoryId,
        debendQuestion: debendQ,
        whenToShowQuestion: null,
      };

      await addNewQuestionTrigger(addNewQ).unwrap();
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
          errors={fullErrors}
          setValue={setValue}
        />
        <AddDebendQuestion
          answerTypeData={answerTypeData}
          control={control}
          register={register}
          setValue={setValue}
          watch={watch}
          fullErrors={fullErrors}
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
