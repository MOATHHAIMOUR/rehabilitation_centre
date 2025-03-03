/* eslint-disable @typescript-eslint/no-unused-vars */
import Select, {
  Props as ReactSelectProps,
  SingleValue,
  MultiValue,
  ActionMeta,
} from "react-select";
import Box from "./Box";

export interface Option<OT> {
  label: string;
  value: OT;
}

// Extend React-Select props with additional features
interface SelectMenuProps<OT>
  extends Omit<ReactSelectProps<Option<OT>, boolean>, "onChange"> {
  label: string;
  isRequired?: boolean;
  options: Option<OT>[]; // Options with generic value type
  error?: string;
  className?: string;
  onChange: (value: OT | OT[] | null) => void; // Transform the value to a simplified format
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
      <Box className=" relative mt-2  ">
        <Select<Option<OT>, boolean>
          options={options} // Pass options to Select
          isMulti={isMulti} // Dynamically toggle multi-select
          placeholder="إختر خيارا"
          onChange={(newValue, _actionMeta: ActionMeta<Option<OT>>) => {
            // Transform the value before calling the parent onChange
            if (isMulti) {
              const values =
                (newValue as MultiValue<Option<OT>>)?.map(
                  (option) => option.value
                ) ?? [];
              onChange(values);
            } else {
              const value =
                (newValue as SingleValue<Option<OT>>)?.value ?? null;

              onChange(value);
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
