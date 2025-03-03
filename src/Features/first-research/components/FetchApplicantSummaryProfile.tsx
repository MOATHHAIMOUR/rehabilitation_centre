import Box from "../../../components/ui/Box";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import Button from "../../../components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FetchApplicantSummaryProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Box className="">
        <Box className="flex items-end gap-8">
          <CustomTextInput
            className="w-96"
            placeholder="أدخل رقم الهوية أو الإقامة"
            isRequired={true}
            name=""
            label="رقم الهوية أو الإقامة"
          />
          <Button className="bg-bg-primary text-white py-1 rounded px-10">
            بحث
          </Button>
        </Box>
        <Box>
          <div className="bg-gray-200 p-2 rounded-lg mt-4">
            <button
              onClick={toggleCollapse}
              className="w-full text-left focus:outline-none flex items-center justify-between"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {/* Smaller text size */}
                معلومات الملف الشخصي
              </h3>
              {/* Toggle between down and up icons */}
              {isOpen ? (
                <FaChevronUp className="text-gray-800" />
              ) : (
                <FaChevronDown className="text-gray-800" />
              )}
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-3 gap-y-2 mt-2">
                    {" "}
                    {/* Smaller gap and margin */}
                    <p className="text-sm text-gray-700">
                      {" "}
                      {/* Smaller text size */}
                      <strong>رقم الملف الشخصي: </strong> 20201213
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>الهوية: </strong> 220121021
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>الاسم الثنائي: </strong> محمد المطيري
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>تاريخ الميلاد: </strong> 01/01/1990
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>الجنسية: </strong> سعودي
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default FetchApplicantSummaryProfile;
