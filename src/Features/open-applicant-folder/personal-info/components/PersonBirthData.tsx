import { useFormContext, Controller } from "react-hook-form";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import EnglishDatePickerCopmonent from "../../../../components/ui/EnglishDatePickerCopmonent";
import HijriDatePickerCopmonent from "../../../../components/ui/HijriDatePickerCopmonent";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import DateObject from "react-date-object";
import { useState } from "react";
import { getAgeInArabic } from "../../../../utils";
import { TapplicantPersonalInfoSchema } from "../types/applicantPersonalInfoSchema";

const PersonBirthData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TapplicantPersonalInfoSchema>(); // ✅ Ensure type inference from useFormContext

  const [date, setDate] = useState<{
    arDate: DateObject | null;
    enDate: DateObject | null;
  }>({
    arDate: null,
    enDate: null,
  });

  const calcualtedAge = getAgeInArabic(date.enDate!);

  function EnDateConverter(selectedDate: DateObject | null) {
    if (!selectedDate) return;
    setDate({
      arDate: new DateObject({
        date: selectedDate,
        calendar: arabic,
        locale: arabic_ar,
      }),
      enDate: selectedDate,
    });
  }

  function ArDateConverter(selectedDate: DateObject | null) {
    if (!selectedDate) return;
    setDate({
      arDate: selectedDate,
      enDate: new DateObject({
        date: selectedDate,
        calendar: gregorian,
        locale: gregorian_ar,
      }),
    });
  }

  return (
    <>
      {/* Gregorian Date Picker */}
      <Controller
        name={"birthDate"}
        control={control}
        render={({ field: { onChange, value } }) => {
          const dateValue =
            typeof value === "string"
              ? new DateObject(value)
              : date.enDate || value;
          return (
            <EnglishDatePickerCopmonent
              isRequired
              error={errors.birthDate?.message}
              label="تاريخ الولادة الميلادي"
              onChangeExternal={(selectedDate) => {
                onChange(selectedDate);
                EnDateConverter(selectedDate);
              }}
              ExternalValue={date.enDate || new DateObject(dateValue)}
            />
          );
        }}
      />

      {/* Hijri Date Picker */}
      <HijriDatePickerCopmonent
        isRequired
        label="تاريخ الولادة الهجري"
        onChangeExternal={ArDateConverter}
        ExternalValue={date.arDate}
      />

      {/* Calculated Age */}
      <CustomTextInput
        name={`${name}.age`}
        externalVal={calcualtedAge}
        label="حساب العمر بالميلادي تلقائيا"
      />
    </>
  );
};

export default PersonBirthData;
