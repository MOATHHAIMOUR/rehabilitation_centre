import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { components } from "react-select";
import SelectMenu, { Option } from "./ui/SelectMenu";

interface IProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: Option<number>[]; // Options with generic value type
  label: string;
  error?: FieldError | undefined;
  isRequired?: boolean;
  isMulti?: boolean; // Optional prop for multi-select mode
  externalOnChange?: (val: number | number[] | null) => void; // Support multi-select change events
  components?: Partial<typeof components>;
}

const ControlledSelectMenu = <T extends FieldValues>({
  name,
  control,
  options,
  label,
  error,
  isRequired = false,
  isMulti = false,
  externalOnChange,
  components: customComponents = {}, // ✅ Ensure a default object
}: IProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        console.log("Field Value (Before Rendering):", field.value);

        return (
          <SelectMenu<number>
            {...field}
            isMulti={isMulti}
            closeMenuOnSelect={isMulti ? false : true} // ✅ Keeps dropdown open on selection
            components={{ ...components, ...customComponents }} // ✅ Merge default & custom components
            menuPortalTarget={document.body} // ✅ Prevents dropdown from closing
            value={
              isMulti
                ? options.filter((option) =>
                    Array.isArray(field.value)
                      ? field.value.includes(option.value) // Ensures correct filtering
                      : false
                  )
                : options.find((option) => option.value === field.value) ?? null
            }
            onChange={(selected) => {
              console.log("Selected Values (Before Mapping):", selected);

              if (isMulti) {
                // Ensure `selected` is an array of objects with `.value`
                const values =
                  Array.isArray(selected) && selected.length > 0
                    ? selected.map((option) => option)
                    : [];

                console.log("Mapped Values (After Fix):", values);

                field.onChange(values); // ✅ Correctly updates form state
                externalOnChange?.(values);
              } else {
                // Single-select: Extract the value or pass undefined if no selection
                field.onChange(selected ? selected : null);
                externalOnChange?.(selected ? selected : null);
              }
            }}
            isRequired={isRequired}
            label={label}
            options={options}
            error={error?.message ?? ""}
          />
        );
      }}
    />
  );
};

export default ControlledSelectMenu;
