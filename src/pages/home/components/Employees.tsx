import React, { useEffect } from "react";
import { getActiveEmployees } from "../../../utils/employees.utils";
import { useEmployees } from "../../../store/useEmployees";
import { useTranslation } from "react-i18next";
import EmployeesLoadingCards from "../../../components/loadings/EmployeesLoadingCards";
import { GoPersonAdd } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import EmptyEmployees from "../../../components/empty-message/EmptyEmployees";
interface props {
    setIsAddEmployeeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Employees: React.FC<props> = ({ setIsAddEmployeeModalOpen }) => {
  const { employees, setEmployees } = useEmployees();
  const [isLoading, setIsLoading] = React.useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    const fun = async () => {
      await getActiveEmployees(setIsLoading, setEmployees, t);
    };
    fun();
  }, []);
  return (
    <div className="p-6 bg-black/5 dark:bg-gray-900/60 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        {t("EMPLOYEE_OVERVIEW")}
      </h2>
      {isLoading ? (
        <EmployeesLoadingCards />
      ) : (
        employees.length>0?
        <>
          <div className="flex justify-start">
            
            <button onClick={()=>setIsAddEmployeeModalOpen(true)} className="mb-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition flex justify-center items-center gap-2">
              <GoPersonAdd className="text-lg font-semibold" /> {t("ADD_NEW_EMPLOYEE")}
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((emp) => {
              const total = emp.workAmount * emp.rate;

              return (
                <div
                onClick={()=>navigate(`work-logs/${emp._id}`)}
                  key={emp._id}
                  className="relative p-5 rounded-2xl bg-linear-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-1"
                >
                  {/* Badge */}
                  <div className="flex text-end justify-between items-center mb-3">
                    {/* Name */}
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {emp.name}
                    </h3>
                    <span
                      className={`  text-center text-xs px-3 py-1 rounded-full font-semibold ${
                        emp.payType === "hour"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {emp.payType === "hour" ? "Per Hour" : "Per Day"}
                    </span>

                    {/* Avatar */}
                    {/* <div className="w-12 h-12 flex items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-green-400 text-white font-bold text-lg mb-4">
                {emp.name.charAt(0)}
                </div> */}
                  </div>

                  {/* Work amount */}
                  <p className="text-sm text-gray-500 mt-1">
                    {emp.payType === "hour" ? t("HOURS") : t("DAYS")}:{" "}
                    <span className="font-medium">{emp.workAmount}</span>
                  </p>

                  {/* Rate */}
                  <p className="text-sm text-gray-500">
                    {t("RATE")}: ₪{emp.rate} /{" "}
                    {emp.payType === "hour" ? t("HOUR") : t("DAY")}
                  </p>

                  {/* Divider */}
                  <div className="my-3 border-t border-gray-200 dark:border-gray-700" />

                  {/* Total */}
                  <p className="text-sm font-bold text-green-600">
                    <span className="text-xs text-gray-800 ">
                      {t("TOTALPAY_FOR_CURRENT_MONTH")} :{" "}
                    </span>
                    ₪ {total.toFixed(2)}
                  </p>

                  {/* Footer actions */}
                  {/* <div className="mt-4 flex gap-2">
                <button className="flex-1 text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-lg transition">
                  View
                </button>
                <button className="flex-1 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 py-1 rounded-lg transition">
                  Edit
                </button>
              </div> */}
                </div>
              );
            })}
          </div>
        </>:<EmptyEmployees setIsAddEmployeeModalOpen={setIsAddEmployeeModalOpen}/>
      )}
    </div>
  );
};

export default Employees;
