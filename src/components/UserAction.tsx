import { ElementType, useEffect, useState } from "react";
import { FaBell, FaFolderOpen, FaHome, FaSignOutAlt } from "react-icons/fa";
import { GiArchiveResearch } from "react-icons/gi";
import { useLocation } from "react-router-dom";

interface IMenuItem {
  logo: ElementType;
  title: string;
}

const sharedApplicantMenuItem = {
  logo: FaFolderOpen,
  title: "خدمة فتح ملف",
};

// Define all relevant applicant folder categories
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoq0f1tSU2b8opZaApGh5tl2FreFb52dyo6Q&s", // Replace with actual user image
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        {LogoTitleState?.logo && <LogoTitleState.logo size={40} />}
        <p className="font-semibold text-xl">{LogoTitleState?.title}</p>
      </div>
      <div className="flex items-center gap-4">
        {/* User Profile & Greeting */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm">
          <img
            src={user.profilePic}
            alt="User"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
          <div className="text-right">
            <p className="text-gray-700 font-semibold">
              مرحبًا, {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-500 text-sm">أهلاً وسهلاً بك!</p>
          </div>
        </div>

        {/* Notification Bell with Badge */}
        <div className="relative">
          <button className="flex items-center px-4 py-2 gap-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition">
            <p className="text-gray-700 font-medium">الإشعارات</p>
            <FaBell className="text-gray-600 text-lg relative" />
          </button>
          <span className="absolute top-2 left-4 bg-red-600 w-2.5 h-2.5 rounded-full"></span>
        </div>

        {/* Logout Button */}
        <button className="flex items-center px-4 py-2 gap-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition">
          <p className="text-gray-700 font-medium">تسجيل الخروج</p>
          <FaSignOutAlt className="mt-1 text-blue-500 text-lg" />
        </button>
      </div>
    </div>
  );
}

export default UserActions;
