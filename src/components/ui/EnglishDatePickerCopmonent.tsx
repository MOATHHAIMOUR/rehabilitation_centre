import DatePicker from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import DateObject from "react-date-object";

interface IProps {
  key?: number | string;
  className?: string;
  label: string;
  isRequired: boolean;
  minDate?: Date;
  error?: string;
  onChangeExternal?: (Date: Date | null) => void;
  ExternalValue?: Date;
}

const EnglishDatePickerComponent = ({
  isRequired,
  key,
  label,
  error,
  className,
  minDate,
  onChangeExternal,
  ExternalValue,
}: IProps) => {
  return (
    <div key={key} className={className}>
      <label htmlFor={label} className="block text-sm font-medium">
        {isRequired && <span className="ml-1 text-red-500">*</span>}
        {label}
      </label>
      <div className="relative mt-2">
        <DatePicker
          value={ExternalValue}
          minDate={minDate}
          onChange={(date: DateObject | null) => {
            onChangeExternal?.(date?.isValid ? date.toDate() : null);
          }}
          style={{
            height: "33px",
            borderRadius: "8px",
            width: "100%",
          }}
          calendarPosition="bottom-right"
          containerStyle={{ width: "100%" }}
          calendar={gregorian} // Use Gregorian calendar
          locale={gregorian_ar} // Use Arabic Gregorian locale
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default EnglishDatePickerComponent;
