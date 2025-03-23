import { NavLink, useLocation } from "react-router-dom";

interface Step {
  label: string;
  href: string;
}

interface StepperNavigationProps {
  steps: Step[];
}

const StepperNavigation = ({ steps }: StepperNavigationProps) => {
  const { pathname } = useLocation();

  return (
    <ul className="relative z-40  flex flex-col gap-1 w-full px-4 text-sm font-medium text-white">
      {steps.map((step, index) => (
        <li key={index}>
          <NavLink
            to={step.href}
            className={`block p-3 rounded-md ${
              pathname === step.href ? "bg-teal-800" : "hover:bg-teal-800"
            }`}
          >
            {step.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default StepperNavigation;
