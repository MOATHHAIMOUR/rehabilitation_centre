import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import EnglishDatePickerComponent from "../../../../components/ui/EnglishDatePickerCopmonent";
import HijriDatePickerComponent from "../../../../components/ui/HijriDatePickerCopmonent";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import DateObject from "react-date-object";
import { useState } from "react";
import { getAgeInArabic } from "../../../../utils";

interface BirthComponentProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
}

const BirthComponent = <T extends FieldValues>({
  control,
  name,
}: BirthComponentProps<T>) => {
  const [date, setDate] = useState<{
    arDate: DateObject | null;
    enDate: DateObject | null;
  }>({
    arDate: null,
    enDate: null,
  });

  const calculatedAge = getAgeInArabic(date.enDate!);

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
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          const dateValue =
            typeof value === "string"
              ? new DateObject(value)
              : date.enDate || value;
          return (
            <EnglishDatePickerComponent
              isRequired
              error={error?.message}
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
      <HijriDatePickerComponent
        isRequired
        label="تاريخ الولادة الهجري"
        onChangeExternal={ArDateConverter}
        ExternalValue={date.arDate}
      />

      {/* Calculated Age */}
      <CustomTextInput
        name={"ageField"}
        externalVal={calculatedAge}
        label="حساب العمر بالميلادي تلقائيا"
      />
    </>
  );
};

export default BirthComponent;
