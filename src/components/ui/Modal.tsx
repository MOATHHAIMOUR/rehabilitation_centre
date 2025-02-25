import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface IProps {
  children: ReactNode;
  title?: string;
  isOpen?: boolean;
  okCancel?: boolean;
  onClose?: () => void;
}

const Modal = ({ isOpen, children, title, onClose, okCancel }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  function handleClose(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // Close modal if the event occurs outside the modal content
    e.stopPropagation();
    if (ref.current && !ref.current.contains(e.target as Node)) {
      onClose?.();
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="min-w-96 fixed inset-0 z-50 h-screen w-screen"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            backgroundColor: "rgba(56, 56, 56, 0.687)", // Translucent fallback
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
        >
          <div
            onClick={handleClose} // Handle outside clicks to close the modal
          >
            <div
              ref={ref}
              className="text-right p-6 bg-white rounded-lg border-2 border-black shadow-lg min-w-96 w-1/2 max-h-[90%] overflow-y-auto absolute z-40 left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 custom-scrollbar-hidden"
              style={{ direction: "rtl" }}
              onClick={(e) => e.stopPropagation()} // Prevent dropdown menu from closing
            >
              <h2 className=" mb-4 text-black font-semibold text-3xl">
                {title}
              </h2>
              <div className="h-[90%]">{children}</div>
              {okCancel ? (
                <>
                  <button
                    onClick={onClose}
                    className=" mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    إغلاق
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
