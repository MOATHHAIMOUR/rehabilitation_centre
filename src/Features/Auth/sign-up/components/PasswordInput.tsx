import { useEffect, useState } from "react";
import { useController, FieldValues, Control, Path } from "react-hook-form";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import CustomTextInput from "../../../../components/ui/CustomTextInput";

interface PasswordInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  updateStateResult: (isValied: boolean) => void;
}

const PasswordFlags = ({ password }: { password: string }) => {
  const criteria = [
    { label: "يجب أن يكون 8 أحرف على الأقل", test: password.length >= 8 },
    { label: "يجب أن يحتوي على حرف كبير", test: /[A-Z]/.test(password) },
    { label: "يجب أن يحتوي على رقم", test: /[0-9]/.test(password) },
    {
      label: "يجب أن يحتوي على رمز خاص (@#$%^&*)",
      test: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <ul className="text-sm mt-2 space-y-1">
      {password.length > 0 &&
        criteria.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.test ? (
              <FaCheckCircle className="text-green-600" />
            ) : (
              <FaTimesCircle className="text-red-600" />
            )}
            <span className={item.test ? "text-green-600" : "text-red-600"}>
              {item.label}
            </span>
          </li>
        ))}
    </ul>
  );
};

const PasswordInput = <T extends FieldValues>({
  control,
  name,
  updateStateResult,
}: PasswordInputProps<T>) => {
  const {
    field,

    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const [password, setPassword] = useState("");

  // Check password validity dynamically
  useEffect(() => {
    const isValid =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password);

    updateStateResult(isValid);
  }, [field, password, updateStateResult]);

  return (
    <div className="flex flex-col gap-2">
      <CustomTextInput
        isRequired={true}
        {...field}
        type="password"
        label="كلمة المرور"
        placeholder="أدخل كلمة المرور"
        SuffixIcon={RiLockPasswordFill}
        error={error?.message}
        onChange={(e) => {
          field.onChange(e);
          setPassword(e.target.value);
        }}
      />
      <PasswordFlags password={password} />
    </div>
  );
};

export default PasswordInput;
