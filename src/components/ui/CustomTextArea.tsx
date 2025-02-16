import { forwardRef, ElementType } from "react";

interface IProps {
  key?: number | string;
  className?: string;
  Icon?: ElementType;
  label: string;
  isRequired?: boolean;
  externalVal?: string;
  name: string;
  error?: string;
  rows?: number; // Optional rows for the textarea
  cols?: number; // Optional cols for the textarea
}

const CustomTextArea = forwardRef<HTMLTextAreaElement, IProps>(
  (
    {
      key,
      className,
      externalVal,
      isRequired = false,
      label,
      name,
      error,
      rows = 4, // Default rows
      cols,
      ...props
    },
    ref
  ) => {
    return (
      <div key={key} className={`relative ${className}`}>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {isRequired && <span className="ml-1 text-red-500">*</span>}
          {label}
        </label>
        <div className="relative mt-2">
          <textarea
            id={name}
            name={name}
            ref={ref} // Attach ref here
            rows={rows} // Number of rows
            cols={cols} // Optional cols
            value={externalVal}
            {...props} // Spread all react-hook-form props (e.g., onChange, onBlur)
            className="block w-full px-4 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          {error && <p className="text-sm my-1 text-red-600">{error}</p>}
        </div>
      </div>
    );
  }
);

export default CustomTextArea;
