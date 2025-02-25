import { toast } from "react-toastify";
import { useSendOTPMutation } from "../../../../store/services/otpCodeAPISlice";

export const useSendOTP = () => {
  const [sendOTP, { isLoading, isSuccess, isError }] = useSendOTPMutation();

  const handleSendOTP = async (phoneNumber: string) => {
    try {
      const response = await sendOTP({ phoneNumber }).unwrap();
      toast.success("تم إرسال رمز التحقق بنجاح ", { position: "top-center" });
      return response;
    } catch (error) {
      toast.error("فشل في إرسال رمز التحقق. يرجى المحاولة مرة أخرى", {
        position: "top-center",
      });
      throw error;
    }
  };

  return { handleSendOTP, isLoading, isSuccess, isError };
};
