import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetApplicantComplaintsQuery } from "../store/applicantComplaintApi";
import Box from "../../../components/ui/Box";
import ControlledSelectMenu from "../../../components/ControlledSelectMenu";
import CustomTextArea from "../../../components/ui/CustomTextArea";
import Modal from "../../../components/ui/Modal";
import { useState } from "react";
import {
  applicantComplaintInfoDefaultValues,
  applicantComplaintInfoSchema,
  TApplicantComplaintInfoSchema,
} from "./types/complaintInfoShcema";
import { Form } from "../form/components/Form";

/* ────────────── ✅ MAIN FORM COMPONENT ────────────── */
const ApplicantComplaintInfoPage = () => {
  const navigate = useNavigate();

  /* ────────────── Submit Handler ────────────── */
  function handleSubmit(data: TApplicantComplaintInfoSchema) {
    console.log("✅ Form Submitted:", data);
    navigate("/next-step"); // Redirect to the next step
  }

  //   const onError = (errors: any) => {
  //     console.error("❌ Validation Errors:", errors);
  //   };

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={applicantComplaintInfoDefaultValues}
      schema={applicantComplaintInfoSchema}
      //   onError={onError}
    >
      <FormContent />
    </Form>
  );
};

export default ApplicantComplaintInfoPage;

const FormContent = () => {
  /* ────────────── STATE & STORE ────────────── */
  const { data: ApplicantComplaintsResponse } =
    useGetApplicantComplaintsQuery();
  const applicantComplaints =
    ApplicantComplaintsResponse?.data.map((a) => ({
      value: {
        id: a.complaintId,
        desc: a.descriptionAr,
      },
      label: a.complaintNameAr,
    })) || [];

  const [selectedComplaintId, setSelectedComplaintId] = useState<number | null>(
    null
  );

  /* ──────────────  REACT-HOOK-FORM ────────────── */
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TApplicantComplaintInfoSchema>();

  const [isModalOpen, setModalOpen] = useState(false);

  const selectedComplaint = applicantComplaints?.find(
    (a) => a.value.id === selectedComplaintId
  );

  const animatedComponents = makeAnimated();

  /* ────────────── HANDLERS ────────────── */
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const openModal = (complaintId: number) => {
    setModalOpen(true);
    setSelectedComplaintId(complaintId);
  };

  return (
    <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* شكاوى المراجع */}
      <ControlledSelectMenu
        name="ComplaintIds"
        control={control}
        isMulti={true}
        options={applicantComplaints} // ✅ This is now correctly structured
        label="شكاوى المراجع"
        error={errors.ComplaintIds?.[0]}
        components={{
          Option: (props) => (
            <button
              className="p-2 bg-neutral-900 rounded-md text-white font-semibold"
              onClick={() => openModal(props.data.id)}
            >
              توضيح
            </button>
          ),
        }}
      />

      {/* ملاحظات */}
      <CustomTextArea
        {...register("notes")}
        label="ملاحظات"
        name="notes"
        error={errors?.notes?.message}
      />

      {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="w-[400px]">
            <h3 className="text-4xl font-semibold pb-10">توضيح</h3>
            <p className="text-1xl font-semibold mb-10">
              {selectedComplaint?.value.desc}
            </p>
          </div>
        </Modal>
      )}
    </Box>
  );
};
