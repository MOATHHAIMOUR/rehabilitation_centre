import { ElementType, useEffect, useState } from "react";
import {
  FaBell,
  FaFolderOpen,
  FaHome,
  FaSignOutAlt,
  FaUserTie,
} from "react-icons/fa";
import { GiArchiveResearch } from "react-icons/gi";
import { useLocation } from "react-router-dom";

interface IMenuItem {
  logo: ElementType;
  title: string;
}
import { MdAdminPanelSettings } from "react-icons/md";

const sharedApplicantMenuItem = {
  logo: FaFolderOpen,
  title: "خدمة فتح ملف",
};

// Define applicant folder routes
const applicantFolderRoutes = [
  "/applicant-folder/save-applicant/personal-info",
  "/applicant-folder/save-applicant/parent-info",
  "/applicant-folder/save-applicant/education-info",
  "/applicant-folder/save-applicant/work-info",
  "/applicant-folder/save-applicant/address-info",
  "/applicant-folder/save-applicant/health-info",
  "/applicant-folder/save-applicant/parents-info",
  "/applicant-folder/save-applicant/relatives-info",
  "/applicant-folder/save-applicant/complaints-info",
  "/applicant-folder/save-applicant/classification-info",
  "/applicant-folder/save-applicant/insurance-info",
];

// Generate menu items dynamically
const menuItems: Record<string, IMenuItem> = {
  "/home": {
    logo: FaHome,
    title: "الصفحة الرئيسية",
  },

  ...applicantFolderRoutes.reduce((acc, key) => {
    acc[key] = sharedApplicantMenuItem;
    return acc;
  }, {} as Record<string, IMenuItem>),

  "/research/management": {
    logo: GiArchiveResearch,
    title: "إدارة البحوث والأسئلة المرتبطة بها",
  },

  "/employees/create": {
    logo: FaUserTie,
    title: "إضافة موظف جديد",
  },
  "/employees/list": {
    logo: FaUserTie,
    title: "قائمة الموظفين",
  },

  "/users/user-roles": {
    logo: MdAdminPanelSettings,
    title: "إدارة أدوار النظام",
  },
};

function UserActions() {
  const location = useLocation();
  const [LogoTitleState, setLogoTitleState] = useState<{
    logo: ElementType;
    title: string;
  }>(menuItems[location.pathname]);

  useEffect(() => {
    setLogoTitleState(menuItems[location.pathname]);
  }, [location]);

  const user = {
    firstName: "عامر",
    lastName: "المهدي",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoq0f1tSU2b8opZaApGh5tl2FreFb52dyo6Q&s",
  };

  return (
    <div className="flex justify-between items-center bg-gradient-to-b from-teal-950 to-teal-800 text-white shadow-md  p-4  z-40">
      <div className="flex items-center gap-4 text-white">
        {LogoTitleState?.logo && <LogoTitleState.logo size={32} />}
        <p className="font-semibold text-lg">{LogoTitleState?.title}</p>
      </div>
      <div className="flex items-center gap-6">
        {/* User Profile & Greeting */}

        <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-full shadow-sm">
          <img
            src={user.profilePic}
            alt="User"
            className="w-10 h-10 rounded-full border border-gray-200"
          />
          <p className="text-gray-800 text-sm font-medium">
            مرحبًا, <span className="font-semibold">{user.firstName}</span>
          </p>
        </div>

        {/* Notification Bell with Badge */}
        <div className="relative">
          <button className="flex items-center px-4 py-2 gap-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition">
            <FaBell className="text-teal-700 text-xl relative" />
            <span className="absolute top-1 right-1 bg-red-600 w-3 h-3 rounded-full"></span>
          </button>
        </div>

        {/* Logout Button */}
        <button className="flex items-center px-4 py-2 gap-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition">
          <FaSignOutAlt className="text-red-500 text-xl" />
          <p className="text-gray-700 font-medium">تسجيل الخروج</p>
        </button>
      </div>
    </div>
  );
}

export default UserActions;
