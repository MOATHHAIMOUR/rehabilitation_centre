import DatePicker from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import DateObject from "react-date-object";

interface IProps {
  className?: string;
  label: string;
  isRequired: boolean;
  onChangeExternal?: (date: DateObject | null) => void; // Optional external change handler
  ExternalValue?: DateObject | null; // Optional external value for the date picker
}

const HijriDatePickerComponent = ({
  isRequired,
  label,
  onChangeExternal,
  ExternalValue,
}: IProps) => {
  return (
    <div className="w-full">
      <label
        htmlFor={label}
        className="block text-[14px] font-medium text-gray-700 text-right mb-1"
      >
        {isRequired && <span className="ml-1 text-red-500">*</span>}
        {label}
      </label>
      <div className="relative">
        <div className="relative flex items-center">
          <DatePicker
            value={ExternalValue || ""} // Controlled value
            onChange={(date: DateObject | null) => {
              onChangeExternal?.(date); // Notify external handler
            }}
            style={{ width: "100%" }}
            containerStyle={{ width: "100%", padding: "0", margin: "0" }}
            calendar={arabic}
            locale={arabic_ar}
            inputClass="w-full h-[34px] px-4 py-0 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default HijriDatePickerComponent;
