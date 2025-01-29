import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { MultiValue } from "react-select";
import SelectMenu, { Option } from "./ui/SelectMenu";

interface IProps<T extends FieldValues, OT> {
  name: Path<T>;
  control: Control<T>;
  options: Option<OT>[]; // Options with generic value type
  label: string;
  error?: FieldError | undefined;
  isRequired?: boolean;
  isMulti?: boolean; // Optional prop for multi-select mode
  externalOnChange?: (val: OT | OT[] | null) => void; // Support multi-select change events
}

const ControlledSelectMenu = <T extends FieldValues, OT>({
  name,
  control,
  options,
  label,
  error,
  isRequired = false,
  isMulti = false,
  externalOnChange,
}: IProps<T, OT>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectMenu<OT>
          {...field}
          isMulti={isMulti}
          value={
            isMulti
              ? options.filter((option) =>
                  Array.isArray(field.value)
                    ? field.value.includes(option.value)
                    : false
                )
              : options.find((option) => option.value === field.value)
          }
          onChange={(selected) => {
            if (isMulti) {
              // Multi-select: Map selected options to an array of values
              const values = (selected as MultiValue<Option<OT>>)?.map(
                (option) => option.value
              );
              externalOnChange?.(values ?? []);
              field.onChange(values); // Update react-hook-form state
            } else {
              // Single-select: Extract the value or pass undefined if no selection
              externalOnChange?.(selected); // Trigger external onChange callback
              field.onChange(selected); // Update react-hook-form state
            }
          }}
          isRequired={isRequired}
          label={label}
          options={options}
          error={error?.message ?? ""}
        />
      )}
    />
  );
};

export default ControlledSelectMenu;
