import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface Option<T> {
  label: string;
  value: T;
}

interface ControlledRadioButtonProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options?: Option<string>[];
  textClassName: string;
}

const defaultOptions: Option<string>[] = [
  { label: "نعم", value: "yes" },
  { label: "لا", value: "no" },
  { label: "غير مطايق", value: "none" },
];

const ControlledRadioButton = <T extends FieldValues>({
  control,
  name,
  label,
  textClassName,
  options = defaultOptions,
}: ControlledRadioButtonProps<T>) => {
  return (
    <div className="mb-4">
      <label className={`block font-semibold text-gray-700  ${textClassName}`}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex gap-4 mt-2">
            {options.map((option) => (
              <label
                key={option.value}
                className={`flex text-sm items-center cursor-pointer px-4  w-fit p-2 border rounded-lg transition-all duration-300 ease-in-out  
                  ${
                    field.value === option.value
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <input
                  type="radio"
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  className="hidden"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default ControlledRadioButton;
