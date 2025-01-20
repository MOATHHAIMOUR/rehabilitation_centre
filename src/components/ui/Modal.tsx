import { ReactNode, useRef } from "react";

interface IProps {
  children: ReactNode;
  title?: string;
  isOpen?: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, children, title, onClose }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  function handleClose(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // Close modal if the event occurs outside the modal content
    if (ref.current && !ref.current.contains(e.target as Node)) {
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose} // Handle outside clicks to close the modal
      className="fixed inset-0 z-50 h-screen w-screen backdrop-blur-sm"
    >
      <div
        ref={ref}
        className="p-6 bg-white rounded-lg border-2 border-black shadow-lg max-w-md mx-auto text-center absolute z-40 left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()} // Prevent dropdown menu from closing
      >
        <h2 className="text-2xl font-semibold mb-4 text-red-700">{title}</h2>
        <div>{children}</div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          إغلاق
        </button>
      </div>
    </div>
  );
};

export default Modal;
