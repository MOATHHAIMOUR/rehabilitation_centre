import { useFormContext } from "react-hook-form";
import { TContactInfoForm } from "../types/contactInfoSchema";
import CustomTextInput from "../../../../../components/ui/CustomTextInput";
import { ControlledSelectMenu } from "../../../../../components/ControlledSelectMenu";

const ContactInfoFormContent = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TContactInfoForm>();

  const contactTypeOptions = [
    { label: "جوال", value: 1 },
    { label: "هاتف ثابت", value: 2 },
    { label: "البريد الإلكتروني", value: 3 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Contact Type */}
      <ControlledSelectMenu
        control={control}
        name="contactType"
        label="نوع جهة الاتصال"
        options={contactTypeOptions}
        isRequired
        error={errors.contactType}
      />

      {/* Contact Value */}
      <CustomTextInput
        {...register("contactValue")}
        label="قيمة جهة الاتصال"
        isRequired
        error={errors.contactValue?.message}
      />

      {/* Contact Name */}
      <CustomTextInput
        {...register("contactName")}
        label="اسم جهة الاتصال (اختياري)"
        error={errors.contactName?.message}
      />

      {/* Is Primary */}
      <div className="col-span-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("isPrimary")} />
          <span>هل هو جهة الاتصال الأساسية؟</span>
        </label>
      </div>
    </div>
  );
};

export default ContactInfoFormContent;
