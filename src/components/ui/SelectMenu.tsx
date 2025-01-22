import Select, { Props as ReactSelectProps } from "react-select";
import Box from "./Box";

interface Option<OT> {
  label: string;
  value: OT;
}

// Extend React-Select props with additional features
interface SelectMenuProps<OT> extends ReactSelectProps<Option<OT>, boolean> {
  label: string;
  isRequired?: boolean;
  options: Option<OT>[]; // Options with generic value type
  error?: string;
  className?: string;
  onChange: (value: OT | null) => void; // Callback for when a value is selected
}

const SelectMenu = <OT,>({
  label,
  isRequired,
  error,
  className,
  options,
  isMulti = false, // Default to single-select
  onChange,
  ...props
}: SelectMenuProps<OT>) => {
  return (
    <Box className={className}>
      {/* Label */}
      <label htmlFor={label} className="text-right block">
        <span className="ml-1 text-red-500">{isRequired ? "*" : ""}</span>
        {label}
      </label>

      {/* Select */}
      <Box className="relative mt-2">
        <Select<Option<OT>, boolean>
          options={options} // Pass options to Select
          isMulti={isMulti} // Dynamically toggle multi-select
          placeholder="إختر خيارا"
          onChange={(selected) => {
            // Handle single or multi-select
            if (isMulti) {
              onChange(
                (selected as Option<OT>[] | null)?.map((opt) => opt.value) ??
                  null
              );
            } else {
              onChange((selected as Option<OT> | null)?.value ?? null);
            }
          }}
          styles={{
            placeholder: (provided) => ({
              ...provided,
              textAlign: "right", // Aligns the placeholder to the right
              direction: "rtl", // Ensures proper text direction for Arabic or right-to-left content
            }),
            control: (provided) => ({
              ...provided,
              height: isMulti ? "auto" : "33.6px", // Adjust height for multi-select
              minHeight: "33.6px",
              borderRadius: "8px",
              display: "flex",
              alignContent: "center",
              padding: "0",
              direction: "rtl",
            }),
            option: (provided) => ({
              ...provided,
              height: "33px",
              display: "flex",
              alignItems: "center",
            }),
          }}
          {...props} // Pass additional props
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </Box>
    </Box>
  );
};

export default SelectMenu;
