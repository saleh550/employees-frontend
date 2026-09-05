import LnaguageMenu from "../components/LanguageMenu";
// import ThemeToggle from "../components/ThemeToggle";
import Logodark from "../../assets/logos/logo1.png";
import Logolight from "../../assets/logos/logo1.png";
import { useDarkMode } from "../../store/useDarkMode";
import EmployeeUserSection from "../components/EmployeeUserSection";
export default function EmployeeHeader() {
  const { currentDarkMode } = useDarkMode();
  return (
    <header
      dir="ltr"
      className="    fixed top-0 left-0 w-full
    bg-white/40 dark:bg-gray-800/40
    backdrop-blur-lg
    shadow-md
    z-50"
    >
      <div className="flex justify-between items-center px-6 py-3">
        {/* Left: Logo or Restaurant Name */}
        <div className="flex items-center gap-2">
          <img
            // src="https://cdn1.iconfinder.com/data/icons/food-drink-5/32/fast-food-256.png"
            src={currentDarkMode != "dark" ? Logodark : Logolight}
            alt="Restaurant Logo"
            className="w-12 h-12 object-contain  rounded-full"
          />

        </div>

    

        {/* Right: Categories (desktop) */}
        <nav className="hidden md:flex gap-6">

        </nav>
        <div className="flex">
          {/* <ThemeToggle /> */}
          <EmployeeUserSection/>
          <LnaguageMenu />
        </div>
      </div>

  
    </header>
  );
}
