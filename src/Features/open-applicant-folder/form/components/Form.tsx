import { zodResolver } from "@hookform/resolvers/zod";

import { ReactNode } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";
import { ZodSchema } from "zod";
import Button from "../../../../components/ui/Button";
import { motion } from "framer-motion";

type FormProps<T extends FieldValues> = {
  children: ReactNode;
  schema: ZodSchema<T>;
  title?: string;
  onSubmit: SubmitHandler<T>;
  onPrev: () => void;
  IsFirstForm: boolean;
  IsLastForm: boolean;
  onError?: SubmitErrorHandler<T>;
  showResetButton?: boolean;
  mode?: UseFormProps<T>["mode"];
  submitButtonText?: string;
  values?: UseFormProps<T>["values"];
  defaultValues?: DefaultValues<T>;
  readOnly?: boolean;
};

const Form = <T extends FieldValues>({
  children,
  schema,
  onSubmit,
  onPrev,
  IsFirstForm,
  IsLastForm,
  onError,
  mode = "all",
  values,
  defaultValues,
}: FormProps<T>) => {
  const form = useForm<T>({
    mode,
    values,
    defaultValues,
    resolver: zodResolver(schema),
    shouldUnregister: true,
  });

  // const handleConfirm = () => {
  //   form.reset(defaultValues);
  // };

  //   const handleResetFormClick = async () => {
  //     await confirm({
  //       onConfirm: handleConfirm,
  //     });
  //   };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        {children}

        <motion.div layout className="flex justify-between my-10 gap-4">
          <Button
            disabled={IsFirstForm}
            onClick={onPrev}
            type="button"
            className="mt-4 bg-bg-primary hover:bg-slate-950 text-white py-2 px-10 rounded"
          >
            السابق
          </Button>

          <Button
            type="submit"
            className="mt-4 bg-bg-primary hover:bg-slate-950 text-white py-2 px-10 rounded"
          >
            {IsLastForm ? "إرسال" : "حفظ و متابعة"}
          </Button>
        </motion.div>
      </form>
    </FormProvider>
  );
};

export { Form };
