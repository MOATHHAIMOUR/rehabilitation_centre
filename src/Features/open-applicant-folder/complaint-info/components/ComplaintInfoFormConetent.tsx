import { useState } from "react";
import { useGetApplicantComplaintsQuery } from "../../../../store/services/applicantComplaintApi";
import { useFormContext } from "react-hook-form";
import { TApplicantComplaintInfoSchema } from "../types/complaintInfoShcema";
import ControlledSelectMenu from "../../../../components/ControlledSelectMenu";
import Box from "../../../../components/ui/Box";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import Modal from "../../../../components/ui/Modal";
import { components } from "react-select";

const ComplaintInfoFormContent = () => {
  const { data: ApplicantComplaintsResponse } =
    useGetApplicantComplaintsQuery();
  const applicantComplaintsSelectMenuData =
    ApplicantComplaintsResponse?.data.map((a) => ({
      value: a.complaintId,
      label: a.complaintNameAr,
    })) || [];

  const [selectedComplaintId, setSelectedComplaintId] = useState<number | null>(
    null
  );

  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TApplicantComplaintInfoSchema>();

  const [isModalOpen, setModalOpen] = useState(false);

  const selectedComplaint = ApplicantComplaintsResponse?.data?.find(
    (a) => a.complaintId === selectedComplaintId
  );

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const openModal = (complaintId: number) => {
    setModalOpen(true);
    setSelectedComplaintId(complaintId);
  };

  return (
    <Box className="grid grid-cols-1 md:grid-cols-1 gap-8">
      {/* شكاوى المراجع */}
      <ControlledSelectMenu
        name="ComplaintIds"
        control={control}
        isMulti={true}
        options={applicantComplaintsSelectMenuData}
        label="شكاوى المراجع"
        error={errors.ComplaintIds?.[0]}
        components={{
          Option: (props) => {
            return (
              <components.Option {...props}>
                <div className="flex justify-between items-center w-full p-2">
                  <span>{props.label}</span>
                  <button
                    className="ml-2 p-1 bg-neutral-900 rounded text-white text-xs font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(props.data.value! as number);
                    }}
                  >
                    توضيح
                  </button>
                </div>
              </components.Option>
            );
          },
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
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="flex justify-center flex-col items-center"
          >
            <h3 className="text-4xl font-semibold pb-10">توضيح</h3>
            <p className="text-1xl font-semibold mb-10">
              {selectedComplaint?.descriptionAr}
            </p>
            {/* Close Button */}
            <div className="flex justify-center">
              <button
                onClick={handleModalClose}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-md transition duration-300"
              >
                إغلاق
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Box>
  );
};

export default ComplaintInfoFormContent;
