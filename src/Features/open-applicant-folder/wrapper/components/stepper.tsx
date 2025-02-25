import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { OPEN_APPLICANT_FOLDER_STEPPS_DATA } from "../data";

const ApplicantFolderStepper = () => {
  /* ────────────── STATE&STORE ────────────── */
  const { pathname } = useLocation();
  console.log("pathname: " + pathname);
  const [isOpen, setIsOpen] = useState(true);

  /* ────────────── TOGGLE FUNCTION ────────────── */
  const toggleStepper = () => {
    setIsOpen((prev) => !prev);
  };

  /* ────────────── RENDER ────────────── */
  return (
    <div className="w-52 mx-auto">
      {/* Toggle Button */}
      <button
        onClick={toggleStepper}
        className="w-full flex items-center justify-between p-3 bg-bg-primary text-white font-semibold rounded-md shadow-md hover:bg-bg-secondary transition"
      >
        <span>قائمة الخطوات</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {/* Animated Step List */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <ul className="mt-2 mb-6 flex flex-col text-sm font-medium text-center text-gray-500 border border-gray-300 rounded-md shadow-lg bg-white">
          {OPEN_APPLICANT_FOLDER_STEPPS_DATA.map((step, index) => (
            <li key={index}>
              <NavLink
                to={step.href}
                className={`block w-full p-3 ${
                  pathname === step.href
                    ? "bg-bg-primary text-white"
                    : "hover:bg-gray-200"
                } transition`}
              >
                {step.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default ApplicantFolderStepper;
