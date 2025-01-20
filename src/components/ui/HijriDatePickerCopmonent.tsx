import DatePicker from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import DateObject from "react-date-object";

interface IProps {
  className?: string;
  label: string;
  isRequired: boolean;
  onChangeExternal?: (Date: DateObject | null) => void; // Optional external change handler
  ExternalValue?: DateObject | null; // Optional external value for the date picker
}

const HijriDatePickerComponent = ({
  isRequired,
  label,
  className,
  onChangeExternal,
  ExternalValue,
}: IProps) => {
  return (
    <div className={className}>
      <label htmlFor={label} className="block text-sm font-medium">
        {isRequired && <span className="ml-1 text-red-500">*</span>}
        {label}
      </label>
      <div className="relative mt-2">
        <DatePicker
          value={ExternalValue || ""} // Controlled value
          onChange={(date: DateObject | null) => {
            onChangeExternal?.(date); // Notify external handler
          }}
          style={{ height: "33px", borderRadius: "8px", width: "100%" }}
          containerStyle={{ width: "100%" }}
          calendar={arabic}
          locale={arabic_ar}
        />
      </div>
    </div>
  );
};

export default HijriDatePickerComponent;
