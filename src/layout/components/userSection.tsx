import React from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../store/useAuth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {}

const UserSection: React.FC<Props> = ({}) => {
  const { user } = useAuth();
  const {t} =useTranslation()
  const userName = user?.name || user?.useName || "User";
  const navigate=useNavigate();
  const { logout } = useAuth();
  const onLogout =()=>{
    navigate("/auth")
    logout();
  }
  return (
    <div
      className="flex items-center justify-between p-3 rounded-xl  space-x-2
                    "
    >
      {/* Left - User Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full 
                        bg-linear-to-r from-orange-400 to-orange-600 text-white"
        >
          <FaUserCircle className="text-lg" />
        </div>

        {/* Name */}
        <div>
          <p className="text-xs text-gray-500">{t("LOGGED_IN_AS")}</p>
          <p className="text-sm font-semibold text-gray-800 dark:text-white">
            {userName || "User"}
          </p>
        </div>
      </div>

      {/* Right - Logout */}
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg 
                   bg-red-500 hover:bg-red-600 
                   text-white text-xs font-medium 
                   shadow-sm transition-all duration-200 active:scale-95"
      >
        <FaSignOutAlt className="text-xs" />
        {t("LOGOUT")}
      </button>
    </div>
  );
};

export default UserSection;
