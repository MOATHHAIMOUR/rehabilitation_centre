import { NavLink } from "react-router-dom";
import {
  FaFileAlt,
  FaUsers,
  FaChevronLeft,
  FaCog,
  FaBook,
  FaChartLine,
  FaUserPlus,
  FaUserEdit,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

// Sidebar Item Type
interface SidebarItemType {
  key: string;
  label: string;
  path?: string;
  icon?: JSX.Element;
  children?: SidebarItemType[];
}

// Sidebar Menu Items
const menuItems: SidebarItemType[] = [
  {
    key: "addNewApplicant",
    label: "إضافة متقدم جديد",
    icon: <FaFileAlt />,
    path: "/applicant-folder/save-applicant/personal-info",
  },
  {
    key: "research",
    label: "الأبحاث",
    icon: <FaUsers />,
    children: [
      {
        key: "newResearch",
        label: "إجراء بحث جديد",
        icon: <FaBook />,
        children: [
          {
            key: "initialResearch",
            label: "البحث الأولي",
            path: "/research/first-research",
          },
          {
            key: "caseStudy",
            label: "دراسة الحالة",
            path: "/employees/engineers",
          },
        ],
      },
      {
        key: "manageResearch",
        label: "إدارة البحوث",
        icon: <FaCog />,
        path: "/research/management",
      },
    ],
  },
  {
    key: "reports",
    label: "التقارير",
    icon: <FaChartLine />,
    path: "/reports",
  },
  {
    key: "employee-management",
    label: "إدارة الموظفين",
    icon: <FaUsers />,
    children: [
      {
        key: "employee-list",
        label: "قائمة الموظفين",
        icon: <FaFileAlt />,
        path: "/employees",
      },
      {
        key: "create-employee",
        label: "إضافة موظف جديد",
        icon: <FaUserPlus />,
        path: "/employees/create/personal",
      },
      {
        key: "edit-employee",
        label: "تعديل بيانات الموظف",
        icon: <FaUserEdit />,
        path: "/employees/:employeeId/edit/personal",
      },
    ],
  },
];

// Recursive Sidebar Item
const SidebarItem: React.FC<{ item: SidebarItemType; level?: number }> = ({
  item,
  level = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  if (item.children) {
    return (
      <li className="text-white">
        <div
          className="flex justify-between items-center cursor-pointer p-3 rounded-lg relative transition-all hover:bg-teal-800"
          style={{ paddingRight: `${level * 16}px` }}
          onClick={toggleOpen}
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {item.icon && <span className=" mr-1 text-xl">{item.icon}</span>}
            <span>{item.label}</span>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? -90 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg"
          >
            <FaChevronLeft />
          </motion.span>
        </div>

        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={
            isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          className="pl-4  overflow-hidden border-l border-white"
          style={{ marginLeft: `${level * 8}px` }}
        >
          {item.children.map((child) => (
            <SidebarItem key={child.key} item={child} level={level + 1} />
          ))}
        </motion.ul>
      </li>
    );
  }

  return (
    <li className="text-white">
      <NavLink
        to={item.path ?? "#"}
        className="flex items-center space-x-2 rtl:space-x-reverse p-3 rounded-lg transition-all hover:bg-teal-800"
        style={{ paddingRight: `${level * 16}px` }}
      >
        {item.icon && <span className="mr-1 text-xl">{item.icon}</span>}
        <span>{item.label}</span>
      </NavLink>
    </li>
  );
};

// Sidebar Component
const Sidebar: React.FC = () => {
  return (
    <aside className="fixed top-0 rtl:right-0 ltr:left-0 z-40 w-80 h-screen bg-gradient-to-b from-teal-950 to-teal-800 text-white shadow-2xl overflow-clip">
      {/* Background Shapes (Darker & Overflow Hidden) */}
      <div className="absolute top-[-40px] left-[-40px] w-32 h-32 bg-teal-700 opacity-25 rounded-full animate-spin-slow overflow-hidden"></div>
      <div className="absolute bottom-10 right-10 w-28 h-28 bg-teal-600 opacity-30 rounded-full animate-pulse overflow-hidden"></div>
      <div className="absolute top-20 right-20 w-24 h-24 bg-teal-900 opacity-20 rounded-lg overflow-hidden"></div>

      {/* Sidebar Content */}
      <div className="h-full px-3 py-6 overflow-y-auto relative">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            className="w-40"
            src="/src/assets/images/MainLogo.png"
            alt="الشعار"
          />
        </div>

        {/* Menu Items */}
        <ul className="space-y-2 font-medium">
          {menuItems.map((item) => (
            <SidebarItem key={item.key} item={item} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
