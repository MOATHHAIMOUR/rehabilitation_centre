import CustomTextInput from "../../../components/ui/CustomTextInput";
import EnglishDatePickerCopmonent from "../../../components/ui/EnglishDatePickerCopmonent";
import HijriDatePickerCopmonent from "../../../components/ui/HijriDatePickerCopmonent";

import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";

import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";

import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";
import DateObject from "react-date-object";
import { useEffect, useState } from "react";
import { getAgeInArabic } from "../../../utils";
import { IOpenApplicantFolder } from "../interface";

interface IProps {
  control: Control<IOpenApplicantFolder>;
  errors: FieldErrors<IOpenApplicantFolder>;
  setValue: UseFormSetValue<IOpenApplicantFolder>;
  clearErrors: UseFormClearErrors<IOpenApplicantFolder>;
}

const PersonBirthData = ({
  control,
  errors,
  setValue,
  clearErrors,
}: IProps) => {
  const [date, setDate] = useState<{
    arDate: DateObject | null;
    enDate: DateObject | null;
  }>({
    arDate: null,
    enDate: null,
  });

  const calcualtedAge = getAgeInArabic(date.enDate!);

  // Handles Gregorian to Hijri Conversion
  function EnDate(selectedDate: DateObject | null) {
    if (!selectedDate) return;

    const hijriDate = new DateObject({
      date: selectedDate,
      calendar: arabic,
      locale: arabic_ar,
    });

    setDate({
      arDate: hijriDate,
      enDate: selectedDate,
    });
  }

  // Handles Hijri to Gregorian Conversion
  function ArDate(selectedDate: DateObject | null) {
    if (!selectedDate) return;

    const gregorianDate = new DateObject({
      date: selectedDate,
      calendar: gregorian, // Convert to Gregorian
      locale: gregorian_ar, // Arabic Gregorian localization
    });

    setDate({
      arDate: selectedDate,
      enDate: gregorianDate,
    });
  }

  // Synchronize the external `date.enDate` with the `Controller` value
  useEffect(() => {
    console.log("date.enDate: " + date.enDate);
    if (date.enDate) {
      clearErrors("personInfo.dateOfBirthEn");
    }
  }, [date.enDate]);
  return (
    <>
      {/* Gregorian Date Picker */}
      <Controller
        name="personInfo.dateOfBirthEn"
        control={control}
        render={({ field: { onChange, value } }) => {
          const dateValue =
            typeof value === "string"
              ? new DateObject(value)
              : date.enDate || value;

          return (
            <EnglishDatePickerCopmonent
              isRequired={true}
              error={errors.personInfo?.dateOfBirthEn?.message ?? ""}
              label="تاريخ الولادة الميلادي"
              onChangeExternal={(selectedDate: DateObject | null) => {
                onChange(selectedDate);
                EnDate(selectedDate);
              }}
              ExternalValue={date.enDate || dateValue}
            />
          );
        }}
      />

      {/* Hijri Date Picker */}

      <HijriDatePickerCopmonent
        isRequired={true}
        label="تاريخ الولادة الهجري"
        onChangeExternal={(selectedDate: DateObject | null) => {
          ArDate(selectedDate);
        }}
        ExternalValue={date.arDate}
      />

      <CustomTextInput
        name="EnBirth"
        externalVal={calcualtedAge}
        label="حساب العمر الحالي بالميلادي"
      />
    </>
  );
};

export default PersonBirthData;
