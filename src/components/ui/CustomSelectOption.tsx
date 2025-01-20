import { OptionProps } from "react-select";

// Define the option type as generic
type CustomOptionType<T> = {
  value: T;
  label: string;
};

// Extend props to include the generic type and custom button handler
interface CustomOptionProps<T>
  extends OptionProps<CustomOptionType<T>, boolean> {
  onButtonClick: (option: CustomOptionType<T>) => void; // Handler for button click
}

const CustomSelectOption = <T,>({
  data,
  isFocused,
  innerRef,
  innerProps,
  onButtonClick, // Access the handler
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
        backgroundColor: isFocused ? "#06060618" : "white", // Hover effect
      }}
    >
      {/* Default label */}
      <span>{data.label}</span>

      {/* Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the dropdown selection
          onButtonClick(data); // Call the parent handler
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
