import { OptionProps } from "react-select";

// ✅ Define the correct option type
type CustomOptionType<T> = {
  value: T; // ✅ `value` is an object (e.g., `{ id, desc }`)
  label: string;
};

// ✅ Extend OptionProps with correct type
interface CustomOptionProps<T>
  extends OptionProps<CustomOptionType<T>, boolean> {
  onButtonClick: (option: T) => void; // ✅ Pass `value` (not the full `data`)
}

const CustomSelectOption = <T extends { id: number; desc: string }>({
  data,
  isFocused,
  innerRef,
  innerProps,
  onButtonClick,
}: CustomOptionProps<T>) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        cursor: "pointer",
        backgroundColor: isFocused ? "#06060618" : "white",
      }}
    >
      <span>{data.label}</span> {/* ✅ Display label */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent selection when clicking button
          onButtonClick(data.value); // ✅ Send only `value` (not full `data`)
        }}
        style={{
          marginLeft: "10px",
          padding: "5px 10px",
          backgroundColor: "#000000",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        توضيح
      </button>
    </div>
  );
};

export default CustomSelectOption;
