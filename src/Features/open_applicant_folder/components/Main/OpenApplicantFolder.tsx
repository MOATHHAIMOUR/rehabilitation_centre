import { SubmitHandler, useForm } from "react-hook-form";
import { OpenFolderInfoSchema } from "../../validation";
import PersonalInfoFields from "./PersonalInfoFields";
import { IOpenApplicantFolder } from "../../interface";
import Button from "../../../../components/ui/Button";
import { applicantTapsData } from "../../data";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "../../../../components/ui/Box";
import EducationInfo from "./EducationInfo";
import ApplicantComplaintInfo from "./ApplicantComplaintInfo";
import ApplicantClassificationInfo from "./ApplicantClassificationInfo";

const OpenApplicantFolder = () => {
  /* ────────────── STATE  ────────────── */
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IOpenApplicantFolder>({
    // resolver: zodResolver(OpenFolderInfoSchema), // Use Zod resolver for validation
    defaultValues: {
      personInfo: {
        gender: undefined, // Ensure default value is an empty string
        nationality: "",
        dateOfBirthEn: undefined,
        location: {
          cityId: undefined,
          countryId: undefined,
          districtId: undefined,
          regionId: undefined,
        },
      },
      applicantComplaint: {
        ComplaintIds: [],
      },
    },
  });
  const [tapIndex, setTapIndex] = useState(2);
  const IsLastTap = tapIndex === applicantTapsData.length - 1;
  const IsFirstTap = tapIndex === 0;
  const { t } = useTranslation();

  /* ────────────── Handlers  ────────────── */
  const onSubmit: SubmitHandler<IOpenApplicantFolder> = (data) => {
    console.log("here ");
    console.log("Form Data:", data);
  };

  function HandleNextTapHandler() {
    if (IsLastTap) return;
    const personInfoData = getValues("personInfo");
    const PersonInfoSchema = OpenFolderInfoSchema.shape.personInfo;

    // // Validate only the personInfo part
    // PersonInfoSchema.parseAsync(personInfoData)
    //   .then((validatedPersonInfo) => {
    //     // Validation passed
    //     setTapIndex((prev) => prev + 1);
    //     setLocalStorageValue("IPersonlInfo", validatedPersonInfo);
    //   })
    //   .catch((zodError: z.ZodError) => {
    //     // Validation failed: map Zod errors to react-hook-form's `setError`
    //     zodError.errors.forEach((error) => {
    //       setError(
    //         `personInfo.${error.path.join(".")}` as "personInfo.gender",
    //         {
    //           type: "manual",
    //           message: error.message,
    //         }
    //       );
    //     });
    //   });
    setTapIndex((prev) => prev + 1);
  }
  function HandlePrevTapHandler() {
    if (IsFirstTap) return;
    setTapIndex((prev) => prev - 1);
  }
  /* ────────────── RENDER  ────────────── */
  const renderTaps = applicantTapsData.map((applicantTap, index) => {
    const activeTap = tapIndex === index;
    return (
      <li key={index} className={`me-2`}>
        <a
          aria-current="page"
          className={`inline-block p-4   active ${
            activeTap ? "bg-bg-primary text-white" : "bg-gray-100"
          } `}
        >
          {t(applicantTap.Title as "SafeType")}
        </a>
      </li>
    );
  });

  console.log("errors: " + errors.personInfo?.nationalIdOrIqama);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul className="mt-6 mb-6 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {renderTaps}
      </ul>

      {tapIndex === 0 && (
        <PersonalInfoFields
          setValue={setValue}
          control={control}
          register={register}
          clearErrors={clearErrors}
          errors={errors}
        />
      )}

      {tapIndex === 1 && (
        <ApplicantClassificationInfo
          control={control}
          register={register}
          errors={errors}
        />
      )}

      {tapIndex === 2 && (
        <EducationInfo control={control} register={register} errors={errors} />
      )}

      {tapIndex === 3 && (
        <ApplicantComplaintInfo
          control={control}
          register={register}
          errors={errors}
        />
      )}

      <Box className="flex justify-between my-10 gap-4">
        <Button
          onClick={HandlePrevTapHandler}
          type="button"
          disabled={IsFirstTap}
          className="mt-4 bg-bg-primary hover:bg-slate-950  text-white py-2 px-10 rounded"
        >
          السابق
        </Button>
        <Button
          onClick={HandleNextTapHandler}
          type="button"
          className="mt-4 bg-bg-primary hover:bg-slate-950   text-white py-2 px-10 rounded"
        >
          التالي
        </Button>
      </Box>
    </form>
  );
};

export default OpenApplicantFolder;
