import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { MultiValue, SingleValue } from "react-select";
import SelectMenu from "./ui/SelectMenu";

interface Option<OT> {
  label: string;
  value: OT;
}

interface IProps<T extends FieldValues, OT> {
  name: Path<T>;
  control: Control<T>;
  options: Option<OT>[]; // Options with generic value type
  label: string;
  error?: FieldError | undefined;
  isRequired?: boolean;
  isMulti?: boolean; // Optional prop for multi-select mode
  externalOnChange?: (val: OT | undefined) => void;
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
        <SelectMenu
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
          onChange={(
            selected: MultiValue<Option<OT>> | SingleValue<Option<OT>>
          ) => {
            if (isMulti) {
              field.onChange(
                (selected as MultiValue<Option<OT>>).map(
                  (option) => option.value
                )
              );
            } else {
              field.onChange(
                (selected as SingleValue<Option<OT>>)?.value ?? null
              );
              externalOnChange?.((selected as SingleValue<Option<OT>>)?.value);
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
