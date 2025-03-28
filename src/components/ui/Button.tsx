import { HTMLAttributes, ReactNode } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  error?: boolean;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
}

const Button = ({
  isLoading,
  className,
  children,
  type,
  error,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${className} ${
        error || isLoading || disabled ? "cursor-not-allowed bg-gray-300" : ""
      }  flex items-center justify-center`}
      {...props}
      disabled={isLoading || error || disabled}
    >
      {children}

      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </button>
  );
};

export default Button;
