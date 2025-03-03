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
import Button from "../ui/Button";
import { motion } from "framer-motion";
import InfoIcon from "../InfoIcon";

type FormProps<T extends FieldValues> = {
  children: ReactNode;
  schema: ZodSchema<T>;
  title?: string;
  onSubmit: SubmitHandler<T>;
  onPrev?: (data: T) => void;
  IsFirstForm?: boolean;
  IsLastForm?: boolean;
  onError?: SubmitErrorHandler<T>;
  showResetButton?: boolean;
  mode?: UseFormProps<T>["mode"];
  submitButtonText?: string;
  values?: UseFormProps<T>["values"];
  defaultValues?: DefaultValues<T>;
  readOnly?: boolean;
  isMultiForm?: boolean;
  buttonText?: string;
  className?: string;
};

const Form = <T extends FieldValues>({
  children,
  schema,
  onSubmit,
  onPrev,
  IsFirstForm,
  IsLastForm,
  isMultiForm,
  onError,
  mode = "all",
  buttonText,
  values,
  defaultValues,
  className,
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

  const handlePrev = () => {
    onPrev?.(form.getValues());
  };
  return (
    <FormProvider {...form}>
      {/* Info message */}
      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md flex items-center gap-2 w-fit mb-4">
        <InfoIcon />
        <p className="text-sm font-medium">
          الحقول المميزة بعلامة{" "}
          <span className="text-red-500 font-bold">*</span> مطلوبة، يرجى تعبئتها
          بعناية لضمان إكمال البيانات بشكل صحيح.
        </p>
      </div>
      <form
        className={className}
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        {children}

        <motion.div layout className="flex justify-between my-10 gap-4">
          {isMultiForm ? (
            <>
              <Button
                disabled={IsFirstForm}
                onClick={handlePrev}
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
            </>
          ) : (
            <>
              <Button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-bg-primary  focus:outline-none"
              >
                {buttonText}
              </Button>
            </>
          )}
        </motion.div>
      </form>
    </FormProvider>
  );
};

export { Form };
