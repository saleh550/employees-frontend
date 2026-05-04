import React from "react";
import { useTranslation } from "react-i18next";
import { useEmployees } from "../../../store/useEmployees";

const Introduction: React.FC = () => {
  const { employees } = useEmployees();

  const { t } = useTranslation();
  const total = employees.reduce(
    (acc, emp) => acc + emp.workAmount * emp.rate,
    0,
  );

  return (
    <div className="p-6 bg-black/5 dark:bg-gray-900 rounded-2xl shadow-md mb-6 mt-10">
      <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
        {t("EMPLOYEES_WORK_HOURS_DASHBOARD")}
      </h1>

      <p className="text-gray-500 dark:text-gray-300 mb-4">
        {t("TRACK_EMPLOYEE_HOURS")}
      </p>

      {/* Total */}
      <div className="mb-4">
        <span className="text-lg font-semibold text-green-600">
          {t("TOTAL_PAYMENT")}: ₪{total}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table
          className="w-full text-start border rounded-lg overflow-hidden 
                  bg-white dark:bg-gray-800 
                  text-gray-800 dark:text-gray-100"
        >
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr className="border-t dark:border-gray-700">
              <th className="p-2">{t("NAME")}</th>
              <th className="p-2">{t("HOURS")}</th>
              <th className="p-2">{t("DAYS")}</th>
              <th className="p-2">{t("RATE")} (₪)</th>
              <th className="p-2">{t("TOTAL")}</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{emp.name}</td>
                <td className="p-2">
                  {emp.payType == "hour" ? emp.workAmount : "-"}
                </td>
                <td className="p-2">
                  {emp.payType == "day" ? emp.workAmount : "-"}
                </td>
                <td className="p-2">{emp.rate}</td>
                <td className="p-2 font-semibold">
                  ₪{emp.workAmount * emp.rate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Introduction;
