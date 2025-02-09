import { useLocation } from "react-router-dom";

const steps = [
  {
    href: "/add-applicant/personal-info",
    label: "المعلومات الشخصية",
  },
  {
    href: "/applicant/classification",
    label: "تصنيف المتقدم",
  },
  {
    href: "/applicant/education",
    label: "المعلومات التعليمية",
  },
  {
    href: "/applicant/complaints",
    label: "الشكاوى",
  },
  {
    href: "/applicant/job-info",
    label: "المعلومات الوظيفية",
  },
  {
    href: "/applicant/parents-info",
    label: "معلومات الوالدين",
  },
  {
    href: "/applicant/relatives-info",
    label: "معلومات الأقارب",
  },
  {
    href: "/applicant/insurance-info",
    label: "معلومات التأمين",
  },
];

const ApplicantFolderStepper = () => {
  /* ────────────── STATE  ────────────── */
  const { pathname } = useLocation();

  /* ────────────── RENDER ────────────── */
  const renderTaps = (
    <ul className="mt-6 mb-6 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {steps.map((step, index) => {
        return (
          <li key={index} className={`me-2`}>
            <a
              aria-current="page"
              className={`inline-block p-4 ${
                pathname === step.href
                  ? "bg-bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              {step.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
  return <div>{renderTaps}</div>;
};

export default ApplicantFolderStepper;
