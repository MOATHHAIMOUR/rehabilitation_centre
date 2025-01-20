import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { IOpenApplicantFolder } from "../../interface";
import Box from "../../../../components/ui/Box";
import SelectMenu from "../../../../components/ui/SelectMenu";
import { useGetApplicantComplaintsQuery } from "../../store/applicantComplaintApi";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import makeAnimated from "react-select/animated";
import CustomSelectOption from "../../../../components/ui/CustomSelectOption";
import { useState } from "react";
import Modal from "../../../../components/ui/Modal";

interface IProps {
  control: Control<IOpenApplicantFolder>;
  register: UseFormRegister<IOpenApplicantFolder>;
  errors: FieldErrors<IOpenApplicantFolder>;
}

const ApplicantComplaintInfo = ({ control, errors, register }: IProps) => {
  /* ────────────── STATE  ────────────── */
  const { data: ApplicantComplaintsResponse } =
    useGetApplicantComplaintsQuery();
  const applicantComplaints = ApplicantComplaintsResponse?.data.map((a) => ({
    value: {
      id: a.complaintId,
      desc: a.descriptionAr,
    },
    label: a.complaintNameAr,
  }));

  const [isModalOpen, setModalOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false); // State to control dropdown menu
  const [selectedComplaintId, setSelectedComplaintId] = useState<number | null>(
    null
  );

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

  const handleMenuToggle = () => {
    setMenuIsOpen((prev) => !prev);
  };

  const preventDropdownClosure = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from closing when clicking inside modal
  };

  return (
    <Box className="flex flex-col gap-8">
      <Controller
        name="applicantComplaint.ComplaintIds"
        control={control}
        render={({ field }) => (
          <SelectMenu
            {...field}
            components={{
              ...animatedComponents,
              Option: (props) => (
                <CustomSelectOption
                  {...props}
                  onButtonClick={(option) => openModal(option.value.id)} // Open modal on button click
                />
              ),
            }}
            menuIsOpen={menuIsOpen} // Controlled dropdown state
            onMenuOpen={() => setMenuIsOpen(true)} // Allow dropdown to open
            onMenuClose={() => {
              if (!isModalOpen) setMenuIsOpen(false); // Only close dropdown if modal is not open
            }}
            closeMenuOnSelect={false} // Keep dropdown open after selecting an option
            isMulti={true} // Enable multi-select
            value={applicantComplaints?.filter((option) =>
              field.value?.includes(option.value.id)
            )} // Match selected options
            onChange={(selected) => {
              if (Array.isArray(selected)) {
                field.onChange(selected.map((option) => option.value.id));
              } else {
                field.onChange([]); // Handle no selection
              }
            }}
            isRequired={true}
            label="شكاوى المراجع"
            options={applicantComplaints}
            error={errors.applicantComplaint?.ComplaintIds?.message ?? ""}
          />
        )}
      />
      <CustomTextArea
        {...register("applicantClassfication.note")}
        label="ملاحظات"
        name="notes"
      />

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={preventDropdownClosure} // Prevent dropdown from closing on modal interaction
        >
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <div
              className="w-[400px]"
              onClick={(e) => e.stopPropagation()} // Prevent propagation to dropdown
            >
              <h3 className="text-4xl font-semibold pb-10">توضيح</h3>
              <p className="text-1xl font-semibold mb-10">
                {selectedComplaint?.value.desc}
              </p>
            </div>
          </Modal>
        </div>
      )}
    </Box>
  );
};

export default ApplicantComplaintInfo;
