import ApplicationLogo from "./ApplicationLogo";
import { selectIsGlobalLoading } from "../store/shared-slices/selectIsGlobalLoading";
import { useAppSelector } from "../store";

const LoadingComponent = () => {
  const isLoading = useAppSelector(selectIsGlobalLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white bg-opacity-90 z-50">
      <ApplicationLogo />
      <div className="mt-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      <p className="mt-4 text-gray-600">جاري التحميل...</p>
    </div>
  );
};

export default LoadingComponent;
