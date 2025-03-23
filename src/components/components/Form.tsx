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
  displayRequiredFieldAlert?: boolean;
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
  displayRequiredFieldAlert,
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

  const handlePrev = () => {
    onPrev?.(form.getValues());
  };
  return (
    <FormProvider {...form}>
      <div className="h-[100%]  flex flex-col">
        {displayRequiredFieldAlert && (
          <div className=" bg-blue-50 border px-8 border-blue-200 text-blue-700  py-3 rounded-md flex items-center gap-2 w-fit ">
            <InfoIcon />
            <p className="text-sm font-medium">
              الحقول المميزة بعلامة{" "}
              <span className="text-red-500 font-bold">*</span> مطلوبة، يرجى
              تعبئتها بعناية لضمان إكمال البيانات بشكل صحيح.
            </p>
          </div>
        )}

        <div className="flex-grow-[1] ">
          <form
            className={"h-[100%]  flex flex-col gap-8"}
            onSubmit={form.handleSubmit(onSubmit, onError)}
          >
            <div>{children}</div>

            <motion.div layout className="flex justify-between gap-4">
              {isMultiForm ? (
                <>
                  <Button
                    disabled={IsFirstForm}
                    onClick={handlePrev}
                    type="button"
                    className="bg-bg-primary hover:bg-slate-950 text-white py-2 px-10 rounded"
                  >
                    السابق
                  </Button>

                  <Button
                    type="submit"
                    className="bg-bg-primary hover:bg-slate-950 text-white py-2 px-10 rounded"
                  >
                    {IsLastForm ? "إرسال" : "حفظ و متابعة"}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="submit"
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white  py-2 rounded-md font-semibold transition-all duration-300"
                  >
                    {buttonText}
                  </Button>
                </>
              )}
            </motion.div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export { Form };
