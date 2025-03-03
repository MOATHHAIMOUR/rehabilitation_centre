import {
  UseFormRegister,
  Path,
  FieldErrors,
  UseFormUnregister,
} from "react-hook-form";
import CustomTextArea from "../../../components/ui/CustomTextArea";
import { TResearchInfoSchema } from "../types/researchInfoSchema";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface NotesFieldProps {
  namePrefix: string;
  register: UseFormRegister<TResearchInfoSchema>;
  unregister: UseFormUnregister<TResearchInfoSchema>;
  errors: FieldErrors<TResearchInfoSchema>;
  index: number;
}

const QuestionNotes = ({
  namePrefix,
  register,
  errors,
  unregister,
  index,
}: NotesFieldProps) => {
  useEffect(() => {
    return () => unregister(`${namePrefix}.notes` as Path<TResearchInfoSchema>);
  }, [namePrefix, unregister]);

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <CustomTextArea
        {...register(`${namePrefix}` as Path<TResearchInfoSchema>)}
        label="ملاحظات"
        error={errors.questions?.[index]?.notes?.message}
      />
    </motion.div>
  );
};

export default QuestionNotes;
