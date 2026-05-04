import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../store/useLanguage";

import Flag from "react-flagkit";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { GrLanguage } from "react-icons/gr";

const LnaguageMenu = () => {
  const { i18n } = useTranslation();
  const { currentLanguage, setLanguage } = useLanguage();
  useEffect(() => {
    if (currentLanguage == "en" || currentLanguage == "uz") document.body.dir = "ltr";
    else document.body.dir = "rtl";
    i18n.changeLanguage(currentLanguage);
  }, []);
  const handleLanguageChange = (val: string) => {
    const value = val;
    i18n.changeLanguage(value);
    setLanguage(value);
    if (value == "en" || value == "uz") document.body.dir = "ltr";
    else document.body.dir = "rtl";
  };
  return (
    <div className=" flex items-center justify-center">
      <Menu as="div" className="relative ">
        <div>
          <Menu.Button className=" p-2.5 text-gray-400 hover:text-gray-500">
            <GrLanguage className="h-6 w-6 dark:text-gray-200 text-blue-500" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="    absolute z-50 right-0 mt-2 w-56 origin-top-right
    divide-y divide-gray-200 dark:divide-gray-700
    rounded-md
    bg-white dark:bg-slate-800
    shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`
    ${active 
      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" 
      : "text-gray-900 dark:text-gray-100"
    }
    group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-200
  `}
                  >
                    {active ? (
                      <Flag
                        country="US"
                        className="mx-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <Flag
                        country="US"
                        className="mx-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    English
                  </button>
                )}
              </Menu.Item>

              {/* <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLanguageChange("uz")}
                    className={`${
                      active ? "bg-amber-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <Flag
                        country="UZ"
                        className="mx-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <Flag
                        country="UZ"
                        className="mx-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Oʻzbekcha
                  </button>
                )}
              </Menu.Item> */}


              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLanguageChange("ar")}
                    className={`
    ${active
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                        : "text-gray-900 dark:text-gray-100"
                      }
    group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-200
  `}
                  >
                    {active ? (
                      <Flag
                        country="SA"
                        className="mx-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <Flag
                        country="SA"
                        className="mx-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    العربيه
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLanguageChange("he")}
                    className={`
                            ${active
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                        : "text-gray-900 dark:text-gray-100"
                      }
                         group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-200
                        `}
                  >
                    {active ? (
                      <Flag
                        country="IL"
                        className="mx-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <Flag
                        country="IL"
                        className="mx-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    עברית
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default LnaguageMenu;