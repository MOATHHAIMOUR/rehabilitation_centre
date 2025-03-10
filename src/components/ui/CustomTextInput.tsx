import { forwardRef, ElementType, InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  key?: number | string;
  className?: string;
  PrefixIcon?: ElementType; // Icon on the left
  SuffixIcon?: ElementType; // Icon on the right
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
      PrefixIcon, // Left-side icon
      SuffixIcon, // Right-side icon
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div key={key} className={`relative ${className}`}>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 text-right"
        >
          {isRequired && <span className="ml-1 text-red-500">*</span>}
          {label}
        </label>
        <div className="relative mt-2">
          <div className="relative flex items-center">
            {/* Prefix Icon (Left Side) */}
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
                
                
                block w-full px-4 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                ${PrefixIcon ? "pl-10" : ""} 
                ${SuffixIcon ? "pr-10" : ""}
                        ${
                          disabled
                            ? "opacity-50 cursor-not-allowed bg-gray-100"
                            : ""
                        }

                
                `}
            />

            {/* Suffix Icon (Right Side) */}
            {SuffixIcon && (
              <SuffixIcon className="absolute right-3 text-gray-500" />
            )}

            {/* Delete Button */}
            {isFieldDeleted && (
              <button
                type="button"
                onClick={onDelete}
                className="absolute bottom-[.5px] left-[.5px] h-[32.1px] px-4 text-white rounded-tl-md rounded-bl-md bg-red-500"
              >
                X
              </button>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
    );
  }
);

export default CustomTextInput;

// import { forwardRef, ElementType, InputHTMLAttributes } from "react";

// interface IProps extends InputHTMLAttributes<HTMLInputElement> {
//   key?: number | string;
//   className?: string;
//   Icon?: ElementType;
//   label: string;
//   isRequired?: boolean;
//   externalVal?: string;
//   name: string;
//   error?: string;
//   isFieldDeleted?: boolean;
//   onDelete?: () => void;
// }

// const CustomTextInput = forwardRef<HTMLInputElement, IProps>(
//   (
//     {
//       key,
//       className,
//       externalVal,
//       isRequired = false,
//       label,
//       name,
//       isFieldDeleted,
//       onDelete,
//       error,
//       ...props
//     },
//     ref
//   ) => {
//     return (

//       <div key={key} className={`relative ${className}`}>
//         <label
//           htmlFor={name}
//           className="block text-sm font-medium text-gray-700 text-right"
//         >
//           {isRequired && <span className="ml-1 text-red-500">*</span>}
//           {label}
//         </label>
//         <div className="relative mt-2">
//           <div className="relative">
//             <input
//               type="text"
//               id={name}
//               value={externalVal}
//               name={name}
//               ref={ref} // Attach ref here
//               {...props} // Spread all react-hook-form props (e.g., onChange, onBlur)
//               className="block w-full px-4 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {isFieldDeleted && (
//               <button
//                 type="button"
//                 onClick={onDelete}
//                 className="absolute bottom-[.5px] left-[.5px] h-[32.1px] px-4 text-white rounded-tl-md rounded-bl-md  bg-red-500"
//               >
//                 X
//               </button>
//             )}
//           </div>

//           {error && <p className="text-sm text-red-600">{error}</p>}
//         </div>
//       </div>
//     );
//   }
// );

// export default CustomTextInput;
