import { useFormContext, useWatch } from "react-hook-form";
import { TJobInfoForm } from "../types/jobInfoSchema";
import { DocumentsArrayField } from "../../../../../components/DocumentsArrayField";
import ControlledEnglishDatePickerComponent from "../../../../../components/ui/ControlledEnglishDatePickerComponent";
import { useEffect } from "react";
import { ControlledSelectMenu } from "../../../../../components/ControlledSelectMenu";

const JobInfoFormContent = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<TJobInfoForm>();

  const startWorkDate = useWatch({ control, name: "startDate" });
  const endWorkDate = useWatch({ control, name: "endDate" });

  const minDate = startWorkDate ? startWorkDate : undefined;

  const contractTypeOptions = [
    { label: "دوام كامل", value: 1 },
    { label: "دوام جزئي", value: 2 },
    { label: "تدريب", value: 3 },
  ];

  // Reset or validate endDate whenever startDate changes
  useEffect(() => {
    if (startWorkDate && endWorkDate) {
      const startDate = new Date(startWorkDate);
      const endDate = new Date(endWorkDate);

      // If endDate is before the new startDate, reset endDate
      if (endDate < startDate) {
        setValue("endDate", null, { shouldValidate: true });
      }
    }
  }, [startWorkDate, endWorkDate, setValue]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        <ControlledSelectMenu
          control={control}
          name="departmentJobTitleId"
          label="الوظيفة"
          options={[]} // Populate from API later
          isRequired
          error={errors.departmentJobTitleId}
        />

        <ControlledSelectMenu
          control={control}
          name="contractType"
          label="نوع العقد"
          options={contractTypeOptions}
          isRequired
          error={errors.contractType}
        />

        <ControlledSelectMenu
          control={control}
          name="supervisorId"
          label="المشرف"
          options={[]} // Populate from API later
          isRequired
          error={errors.supervisorId}
        />

        <ControlledEnglishDatePickerComponent
          control={control}
          name="startDate"
          label="تاريخ البدء"
          isRequired
        />

        <ControlledEnglishDatePickerComponent
          name="endDate"
          isRequired
          control={control}
          minDate={minDate}
          label="تاريخ الانتهاء"
        />
      </div>
      <div className="border-t-2 mt-8">
        <h2 className="text-lg font-semibold py-2">إضافة الوثائق</h2>
        <DocumentsArrayField />
      </div>
    </>
  );
};

export default JobInfoFormContent;
