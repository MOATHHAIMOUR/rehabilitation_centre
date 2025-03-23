import { Path, useFormContext } from "react-hook-form";
import { TFilterSchema } from "./types";
import ControlledEnglishDatePickerComponent from "../ui/ControlledEnglishDatePickerComponent";
import CustomTextInput from "../ui/CustomTextInput";
import { ControlledSelectMenu } from "../ControlledSelectMenu";

type DynamicFilterInputProps = {
  field: TFilterSchema["filterDataTable"][0];
  index: number;
  name: string;
};

export function DynamicFilterInput({ field, name }: DynamicFilterInputProps) {
  const { control, register } = useFormContext<TFilterSchema>();

  switch (field?.filterType) {
    case "status":
      return (
        <ControlledSelectMenu
          name={`${name}.searchValues` as Path<TFilterSchema>}
          control={control}
          direction="rtl"
          options={
            field.searchValues?.map((p) => {
              return {
                label: p.lable,
                value: p.value,
              };
            }) ?? []
          }
          label=""
          width="w-[200px]"
          height="h-[36px]"
        />
      );
    case "date":
      return (
        <ControlledEnglishDatePickerComponent
          control={control}
          name={`${name}.searchValue` as Path<TFilterSchema>}
          label=""
          className="input"
        />
      );
    case "string":
      return (
        <CustomTextInput
          label=""
          {...register(`${name}.searchValue` as Path<TFilterSchema>)}
          type="string"
          placeholder="أدخل قيمة البحث"
          className="input"
        />
      );

    case "number":
      return (
        <CustomTextInput
          label=""
          {...register(`${name}.searchValue` as Path<TFilterSchema>)}
          type="number"
          placeholder="أدخل قيمة البحث"
          className="input"
        />
      );

    default:
      return (
        <CustomTextInput
          label=""
          {...register(`${name}.searchValue` as Path<TFilterSchema>)}
          type="string"
          placeholder="أدخل قيمة البحث"
          className="input"
        />
      );
  }
}
