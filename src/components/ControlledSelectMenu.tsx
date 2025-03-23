import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface Option<TValue extends string | number> {
  label: string;
  value: TValue;
}

interface ControlledSelectMenuProps<
  TFieldValues extends FieldValues,
  TValue extends string | number = string
> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  options: Option<TValue>[];
  label?: string;
  placeholder?: string;
  className?: string;
  direction?: "rtl" | "ltr";
  width?: string;
  height?: string;
  disabled?: boolean;
  filterRef?: React.RefObject<HTMLDivElement>; // Add filterRef prop
}

export const ControlledSelectMenu = <
  TFieldValues extends FieldValues,
  TValue extends string | number = string
>({
  name,
  control,
  options,
  label,
  placeholder = "اختر خيارا",
  className = "",
  direction = "rtl",
  width = "w-full",
  height = "h-[32px]",
  disabled = false,
}: ControlledSelectMenuProps<TFieldValues, TValue>) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div
          data-select-portal="true"
          className={`space-y-1 ${className}`}
          dir={direction}
        >
          {label && (
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
          )}

          <Select
            disabled={disabled}
            onValueChange={(val) => field.onChange(val as TValue)}
            value={field.value === undefined ? "" : String(field.value)}
          >
            <SelectTrigger
              className={`${width} ${height} rounded-md border border-gray-300 !bg-white text-black px-3 py-1 text-sm flex ${
                direction === "rtl" ? "flex-row-reverse" : ""
              }`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            {/* Use Portal to render SelectContent inside filterRef */}

            <SelectContent
              className="z-[1000] bg-white rounded-md shadow-lg border border-gray-200"
              sideOffset={5}
              data-select-portal="true" // Add data-select-portal attribute
            >
              {/* Search Input */}
              <div
                className={`flex items-center px-2 py-2 border-b border-gray-200 gap-2 ${
                  direction === "rtl" ? "flex-row-reverse text-right" : ""
                }`}
                data-select-portal="true" // Add data-select-portal attribute
              >
                <FiSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder={direction === "rtl" ? "ابحث..." : "Search..."}
                  className={`w-full text-sm border-none outline-none placeholder-gray-400 bg-transparent ${
                    direction === "rtl" ? "text-right" : ""
                  }`}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                  data-select-portal="true" // Add data-select-portal attribute
                />
              </div>

              {/* Options */}
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <SelectItem
                    key={String(option.value)}
                    value={String(option.value)}
                    className="px-3 h-[30px] py-1.5 text-sm cursor-pointer hover:bg-teal-100 hover:text-teal-900 transition rounded"
                    data-select-portal="true" // Add data-select-portal attribute
                  >
                    {option.label}
                  </SelectItem>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  {direction === "rtl" ? "لا توجد نتائج" : "No results found"}
                </div>
              )}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
};
