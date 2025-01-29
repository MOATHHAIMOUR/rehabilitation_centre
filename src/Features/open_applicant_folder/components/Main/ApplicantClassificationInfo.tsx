import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import Box from "../../../../components/ui/Box";
import SelectMenu from "../../../../components/ui/SelectMenu";
import { IOpenApplicantFolder } from "../../interface";
import { findOption } from "../../../../utils";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import { useGetApplicantClassficationTypesQuery } from "../../store/applicantClassificationApi";

interface IProps {
  control: Control<IOpenApplicantFolder>;
  register: UseFormRegister<IOpenApplicantFolder>;
  errors: FieldErrors<IOpenApplicantFolder>;
}

const ApplicantClassificationInfo = ({ control, errors, register }: IProps) => {
  /* ────────────── STATE  ────────────── */
  const { data: ApplicantClassficationTypesResponse } =
    useGetApplicantClassficationTypesQuery();
  const applicantClassficationTypes =
    ApplicantClassficationTypesResponse?.data.map((a) => {
      return { label: a.nameAr, value: a.applicantClassificationTypeId };
    });

  return (
    <Box className="flex  flex-col gap-8">
      <Controller
        name="applicantClassfication.classdificationTypeId" // The form field name
        control={control} // Pass the control from react-hook-form
        render={({ field }) => {
          return (
            <SelectMenu
              {...field}
              value={findOption(applicantClassficationTypes, field.value)} // Pass both options and current value
              onChange={(selected) => {
                if (!Array.isArray(selected)) {
                  field.onChange(selected); // Handle single value
                } else {
                  field.onChange(null); // Handle no selection
                }
              }}
              isRequired={true}
              label="تصنيف المراحع"
              options={applicantClassficationTypes}
              error={
                errors.applicantClassfication?.classdificationTypeId?.message ??
                ""
              } // Display validation error
            />
          );
        }}
      />

      <CustomTextArea
        {...register("applicantComplaint.note")}
        label="ملاحظات"
        name="notes"
      />
    </Box>
  );
};

export default ApplicantClassificationInfo;
