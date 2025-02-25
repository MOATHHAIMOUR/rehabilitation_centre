import { toast } from "react-toastify";
import { useVerifyOTPMutation } from "../../../../store/services/otpCodeAPISlice";

export const useVerifyOTP = () => {
  const [verifyOTP, { isLoading, isSuccess, isError }] = useVerifyOTPMutation();

  const handleVerifyOTP = async (phoneNumber: string, otpCode: string) => {
    try {
      const response = await verifyOTP({ phoneNumber, otpCode }).unwrap();
      toast.success("تم تأكيد رقم الهانف بنجاح ", {
        position: "top-center",
      });
      return response;
    } catch (error) {
      toast.error("فشل في التحقق من الرمز. يرجى المحاولة مرة أخرى ", {
        position: "top-center",
      });
      throw error;
    }
  };

  return { handleVerifyOTP, isLoading, isSuccess, isError };
};
