import Select, { Props as ReactSelectProps } from "react-select";
import Box from "./Box";

// Custom option component
// Custom option component with hover effect

// Extend React-Select props with additional features
interface SelectMenuProps<T> extends ReactSelectProps<T, boolean> {
  label: string;
  isRequired?: boolean;
  error?: string;
  className?: string;
}

const SelectMenu = <T,>({
  label,
  isRequired,
  error,
  className,
  isMulti = false, // Default to single-select
  ...props
}: SelectMenuProps<T>) => {
  return (
    <Box className={className}>
      {/* Label */}
      <label htmlFor={label} className="text-right block">
        <span className="ml-1 text-red-500">{isRequired ? "*" : ""}</span>
        {label}
      </label>

      {/* Select */}
      <Box className="relative mt-2">
        <Select<T, boolean>
          {...props} // Pass all props dynamically
          isMulti={isMulti} // Dynamically toggle multi-select
          styles={{
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
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </Box>
    </Box>
  );
};

export default SelectMenu;
