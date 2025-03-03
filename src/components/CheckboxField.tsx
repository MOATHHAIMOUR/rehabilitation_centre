import { useController, Control, FieldValues, Path } from "react-hook-form";

interface CheckboxFieldProps<T extends FieldValues> {
  name: Path<T>; // Supports any form field key
  label: string; // Label for the checkbox
  control: Control<T>; // Generic control tied to specific form type
  className?: string; // Optional for styling
}

export const CheckboxField = <T extends FieldValues>({
  name,
  label,
  control,
  className = "",
}: CheckboxFieldProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  return (
    <div className={`flex items-center mr-2 gap-4 ${className}`}>
      <input
        type="checkbox"
        id={name}
        checked={value ?? false}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 cursor-pointer"
      />
      <label htmlFor={name} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
};
