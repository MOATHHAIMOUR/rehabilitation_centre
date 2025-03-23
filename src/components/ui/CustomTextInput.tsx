import { forwardRef, ElementType, InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  key?: number | string;
  className?: string;
  PrefixIcon?: ElementType;
  SuffixIcon?: ElementType;
  label: string;
  isRequired?: boolean;
  externalVal?: string;
  name: string;
  error?: string;
  isFieldDeleted?: boolean;
  onDelete?: () => void;
}

const CustomTextInput = forwardRef<HTMLInputElement, IProps>(
  (
    {
      key,
      className,
      externalVal,
      isRequired = false,
      label,
      name,
      isFieldDeleted,
      onDelete,
      error,
      PrefixIcon,
      SuffixIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div key={key} className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={name}
            className="block text-[14px] font-medium text-gray-700 text-right mb-1"
          >
            {isRequired && <span className="ml-1 text-red-500">*</span>}
            {label}
          </label>
        )}

        <div className="relative">
          <div className="relative flex items-center">
            {PrefixIcon && (
              <PrefixIcon className="absolute left-3 text-gray-500" />
            )}

            <input
              type="text"
              id={name}
              value={externalVal}
              name={name}
              ref={ref}
              disabled={disabled}
              {...props}
              className={`
                block w-full h-[33px] px-4 py-0 text-gray-700 bg-white border border-gray-300 rounded-md
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                ${PrefixIcon ? "pl-10" : ""}
                ${SuffixIcon ? "pr-10" : ""}
                ${disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}
              `}
            />

            {SuffixIcon && (
              <SuffixIcon className="absolute right-3 text-gray-500" />
            )}

            {isFieldDeleted && (
              <button
                type="button"
                onClick={onDelete}
                className="absolute bottom-0 left-0 h-[34px] px-4 text-white rounded-tl-md rounded-bl-md bg-red-500"
              >
                X
              </button>
            )}
          </div>

          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>
      </div>
    );
  }
);

export default CustomTextInput;
