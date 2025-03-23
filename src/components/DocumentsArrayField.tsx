import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import Button from "./ui/Button";
import { ControlledSelectMenu } from "./ControlledSelectMenu";

interface DocumentOption {
  value: number;
  label: string;
}

const documentOptions: DocumentOption[] = [
  { value: 0, label: "الهوية الوطنية" },
  { value: 1, label: "عقد العمل" },
  { value: 2, label: "الشهادة التعليمية" },
  // Add more if needed
];

export const DocumentsArrayField: React.FC = () => {
  const { setValue, watch, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "documents",
  });

  const handleFileChange = (index: number, file: File | null) => {
    setValue(`documents.${index}.file`, file);
  };

  return (
    <div className="">
      <div className=" flex flex-col gap-4">
        {fields.map((field, index) => {
          const file = watch(`documents.${index}.file`) as File | null;

          return (
            <div className="flex-col">
              <div className="flex items-end gap-8" key={field.id}>
                {/* Document Type — Direct binding using register */}
                <div className="w-1/2">
                  <ControlledSelectMenu
                    control={control}
                    name={`documents.${index}.documentType`}
                    label="نوع الوثيقة"
                    options={documentOptions}
                  />
                </div>

                {/* File Attachment */}
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png,.jpeg"
                    className="hidden"
                    id={`file-upload-${index}`}
                    onChange={(e) =>
                      handleFileChange(index, e.target.files?.[0] || null)
                    }
                  />
                  <label
                    htmlFor={`file-upload-${index}`}
                    className="cursor-pointer bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    إرفاق ملف
                  </label>
                </div>

                {/* Remove Button */}
                <Button
                  className="bg-red-600 px-8 text-white p-2 rounded-md"
                  type="button"
                  onClick={() => remove(index)}
                >
                  حذف
                </Button>
              </div>
              <span className="text-gray-600">
                {file ? file.name : "لم يتم اختيار ملف"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Add New Document Button */}
      <Button
        type="button"
        onClick={() =>
          append({
            documentType: "",
            file: null,
          })
        }
        className="bg-gray-200 p-2 rounded-md my-2 px-8"
      >
        إضافة وثيقة جديدة
      </Button>
    </div>
  );
};
