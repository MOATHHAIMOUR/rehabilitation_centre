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
import Box from "../../../../components/ui/Box";
import Button from "../../../../components/ui/Button";

type FormProps<T extends FieldValues> = {
  children: ReactNode;
  schema: ZodSchema<T>;
  title?: string;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  slotProps?: {
    submitButtonProps?: ButtonProps;
    resetButtonProps?: Partial<IconButtonProps>;
    formContainerProps?: Partial<typeof Grid>;
  };
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
  title,
  onSubmit,
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
  });

  const handleConfirm = () => {
    form.reset(defaultValues);
  };

  //   const handleResetFormClick = async () => {
  //     await confirm({
  //       onConfirm: handleConfirm,
  //     });
  //   };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        {children}

        <Box className="flex justify-between my-10 gap-4">
          <Button
            type="button"
            className="mt-4 bg-bg-primary hover:bg-slate-950 text-white py-2 px-10 rounded"
          >
            السابق
          </Button>

          <Button
            type="submit"
            className="mt-4 bg-bg-primary hover:bg-slate-950 text-white py-2 px-10 rounded"
          >
            حفظ و متابعة
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export { Form };
