import DatePicker from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import DateObject from "react-date-object";
import { useController, FieldValues, Path, Control } from "react-hook-form";

interface IProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>; // type can be Control<T> if you import Control from react-hook-form
  label: string;
  isRequired?: boolean;
  minDate?: Date | undefined;
  className?: string;
}

// Generic component supporting React Hook Form
const ControlledEnglishDatePickerComponent = <T extends FieldValues>({
  name,
  control,
  label,
  isRequired,
  minDate,
  className,
}: IProps<T>) => {
  const {
    field: { value, onChange },

    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium">
        {isRequired && <span className="ml-1 text-red-500">*</span>}
        {label}
      </label>
      <div className="relative mt-2">
        <DatePicker
          value={value ? new DateObject(value) : null} // if value is null, datepicker will be empty
          onChange={(date) => onChange(date?.isValid ? date.toDate() : null)} // Convert DateObject to Date
          minDate={minDate ? new DateObject(minDate) : undefined} // Convert minDate to DateObject
          style={{
            height: "33px",
            borderRadius: "8px",
            width: "100%",
          }}
          calendarPosition="bottom-right"
          containerStyle={{ width: "100%" }}
          calendar={gregorian}
          locale={gregorian_ar}
        />
        {error && <p className="text-sm text-red-600">{error.message}</p>}
      </div>
    </div>
  );
};

export default ControlledEnglishDatePickerComponent;
