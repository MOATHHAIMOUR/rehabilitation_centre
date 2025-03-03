import { NavLink } from "react-router-dom";
import {
  FaFileAlt,
  FaUsers,
  FaChevronLeft,
  FaCog,
  FaBook,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

// Define sidebar item type
interface SidebarItemType {
  key: string;
  label: string;
  path?: string;
  icon?: JSX.Element;
  children?: SidebarItemType[];
}

// Arabic sidebar items
const menuItems: SidebarItemType[] = [
  {
    key: "addNewApplicant",
    label: "إضافة متقدم جديد",
    icon: <FaFileAlt />,
    path: "/applicant-folder/save-applicant/personal-info",
  },
  {
    key: "empdloyees",
    label: "الأبحاث",
    icon: <FaUsers />,
    children: [
      {
        key: "engdineers",
        label: "إجراء بحث جديد",
        icon: <FaBook />,
        children: [
          {
            key: "engindeers",
            label: "البحث الأولي",
            path: "/research/first-research",
          },
          {
            key: "engdineers",
            label: "دراسة الحالة",
            path: "/employees/engineers",
          },
        ],
      },
      {
        key: "managers",
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
];

// Recursive Sidebar Item with animation
const SidebarItem: React.FC<{ item: SidebarItemType; level?: number }> = ({
  item,
  level = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  if (item.children) {
    return (
      <li className="text-white">
        {/* Parent item with children (collapsible) */}
        <div
          className="flex justify-between items-center cursor-pointer p-2 rounded-lg relative"
          style={{ paddingRight: `${level * 16}px` }}
          onClick={toggleOpen}
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {item.icon && (
              <span className="text-xl text-white">{item.icon}</span>
            )}
            <span className="text-white">{item.label}</span>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? -90 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg text-white"
          >
            <FaChevronLeft />
          </motion.span>
          {/* Underline animation */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Collapsible children with animation */}
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={
            isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
          }
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="pl-4 overflow-hidden border-l-2 border-gray-600"
          style={{ marginLeft: `${level * 8}px` }} // Add margin for hierarchy
        >
          {item.children.map((child) => (
            <SidebarItem key={child.key} item={child} level={level + 1} />
          ))}
        </motion.ul>
      </li>
    );
  }

  // Simple link item (no children)
  return (
    <li className="text-white">
      <NavLink
        to={item.path ?? "#"}
        className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-lg relative"
        style={{ paddingRight: `${level * 16}px` }}
      >
        {item.icon && <span className="text-xl text-white">{item.icon}</span>}
        <span className="text-white">{item.label}</span>
        {/* Underline animation */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </NavLink>
    </li>
  );
};

// Sidebar component
const Sidebar: React.FC = () => {
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 rtl:right-0 ltr:left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-black text-white"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-8 overflow-y-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            className="w-40"
            src="/src/assets/images/MainLogo.png"
            alt="الشعار"
          />
        </div>

        {/* Menu items */}
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
