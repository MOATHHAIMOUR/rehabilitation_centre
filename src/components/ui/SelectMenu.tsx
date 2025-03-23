import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import Box from "./Box";
export interface Option<OT> {
  label: string;
  value: OT;
}

interface SelectMenuProps<OT> {
  label: string;
  isRequired?: boolean;
  options: Option<OT>[];
  error?: string;
  value?: OT | null;
  onChange: (value: OT | null) => void;
  className?: string;
  disabled?: boolean;
}

const SelectMenu = <OT extends string | number>({
  label,
  isRequired,
  options,
  error,
  value,
  onChange,
  className,
  disabled = false,
}: SelectMenuProps<OT>) => {
  return (
    <Box className="w-full">
      <Label className="mb-1 block text-sm text-right font-medium text-gray-700">
        {isRequired && <span className="text-red-500 ml-1">*</span>}
        {label}
      </Label>

      <Select
        value={value?.toString()}
        onValueChange={(val) => {
          const selected = options.find((opt) => opt.value.toString() === val);
          onChange(selected?.value ?? null);
        }}
        disabled={disabled}
      >
        <SelectTrigger
          className={`w-full h-[40px] rounded border border-gray-300 bg-white text-black text-sm text-right shadow-sm transition focus:border-teal-600 focus:ring-teal-500 ${className}`}
        >
          <SelectValue placeholder="إختر خيارا" />
        </SelectTrigger>

        <SelectContent dir="rtl">
          {options.map((option) => (
            <SelectItem
              key={option.value.toString()}
              value={option.value.toString()}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </Box>
  );
};

export default SelectMenu;
