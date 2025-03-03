import { useLazyIsApplicantExistsQuery } from "../../../store/services/applicantFolderApiSlice";
import { toast } from "react-toastify";

const useIsApplicantExists = () => {
  const [trigger, { isFetching, isError }] = useLazyIsApplicantExistsQuery();

  const validateUser = async (nationalNo: string) => {
    if (!nationalNo.trim()) {
      toast.error("Please enter a valid National Number.");
      return;
    }

    try {
      const result = await trigger(nationalNo).unwrap(); // Ensure proper error handling
      if (result) {
        toast.success("User found!");
      } else {
        toast.warn("User not found.");
      }
    } catch {
      toast.error("An error occurred while fetching data.");
    }
  };

  return { validateUser, isFetching, isError };
};

export default useIsApplicantExists;
