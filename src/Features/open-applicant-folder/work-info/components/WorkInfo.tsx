import {
  Control,
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import ControlledSelectMenu from "../../../../components/ControlledSelectMenu";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import Box from "../../../../components/ui/Box";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../../../../components/ui/Modal";
import NewCompanyForm from "./NewCompanyForm";

interface WorkInfoProps<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  workPhoneName: Path<T>;
  companyIdName: Path<T>;
  sectorIdName: Path<T>;
  industryFieldName: Path<T>; // ✅ New field for "Industry Field"
}

const WorkInfo = <T extends FieldValues>({
  control,
  register,
  errors,
  workPhoneName,
  companyIdName,
  sectorIdName,
  industryFieldName,
}: WorkInfoProps<T>) => {
  /* ────────────── STATE ────────────── */
  const [isNewCompanyModalOpen, setNewCompanyModal] = useState(false);

  /* ────────────── HANDLERS ────────────── */
  function handleOpenNewCompanyModal() {
    setNewCompanyModal(true);
  }

  function handleCloseNewCompanyModal() {
    setNewCompanyModal(false);
  }

  return (
    <Box className="grid grid-cols-1 gap-4">
      {/* ✅ Work Phone */}
      <CustomTextInput
        isRequired={true}
        {...register(workPhoneName)}
        label="هاتف العمل"
        error={errors?.[workPhoneName]?.message?.toString()}
      />

      {/* ✅ Company Selection */}
      <Box>
        <ControlledSelectMenu
          control={control}
          name={companyIdName}
          options={[]} // Provide company options dynamically
          isMulti={false}
          label="أختر الشركة"
          isRequired={true}
          error={errors?.[companyIdName] as FieldError}
        />
        <p
          onClick={handleOpenNewCompanyModal}
          className="text-xs mt-2 text-blue-700 cursor-pointer"
        >
          لم تجد الشركة؟ أضف واحدة سريعا للنظام
        </p>
      </Box>

      {/* ✅ Sector Selection */}
      <ControlledSelectMenu
        control={control}
        name={sectorIdName}
        options={[]} // Provide sector options dynamically
        isMulti={false}
        label="أختر القطاع"
        isRequired={true}
        error={errors?.[sectorIdName] as FieldError}
      />

      {/* ✅ Industry Field Selection */}
      <ControlledSelectMenu
        control={control}
        name={industryFieldName}
        options={[]} // Provide industry field options dynamically
        isMulti={false}
        label="المجال: مثال صحة, تعليم"
        isRequired={true}
        error={errors?.[industryFieldName] as FieldError}
      />

      {/* Modal for New Company */}
      <AnimatePresence>
        {isNewCompanyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
          >
            <Modal isOpen={isNewCompanyModalOpen} title="أضف شركة جديدة للنظام">
              <NewCompanyForm onCancel={handleCloseNewCompanyModal} />
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default WorkInfo;
