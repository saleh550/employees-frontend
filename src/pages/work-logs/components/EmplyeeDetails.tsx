import { useTranslation } from "react-i18next";
import type { EmployeeType } from "../../../types/types";

interface Props {
  employee: EmployeeType;
}

const EmployeeDetails: React.FC<Props> = ({ employee }) => {
  const { t } = useTranslation();
  return (
    <div className="p-6 bg-black/5 dark:bg-gray-900 rounded-2xl shadow-md mb-6 mt-6 mx-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {employee.name}
        </h2>

        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold ${
            employee.payType === "hour"
              ? "bg-blue-100 text-blue-600"
              : "bg-purple-100 text-purple-600"
          }`}
        >
          {employee.payType === "hour" ? "Per Hour" : "Per Day"}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-2 text-gray-600 dark:text-gray-300">
        <p>
          <span className="font-semibold">{t("RATE")}:</span> ₪{employee.rate} /{" "}
          {employee.payType}
        </p>

        {/* <p>
          <span className="font-semibold">
            {employee.payType === "hour" ? "Hours" : "Days"} worked (this month):
          </span>{" "}
          {employee.workAmount}
        </p> */}

        {/* <p>
          <span className="font-semibold">Total Pay:</span>{" "}
          <span className="text-green-600 font-bold">
            ₪ {totalPay.toFixed(2)}
          </span>
        </p> */}

        <p>
          <span className="font-semibold">{t("HIRE_DATE")}:</span>{" "}
          {new Date(employee.hireDate).toLocaleDateString()}
        </p>
      </div>

      {/* Default Working Hours */}
      {employee.defaultStartTime && employee.defaultEndTime && (
        <div className="mt-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">{t("DEFAULT_WORK_HOURS")}:</span>{" "}
            {employee.defaultStartTime} - {employee.defaultEndTime}
          </p>
        </div>
      )}

      {/* Footer buttons */}
      {/* <div className="mt-6 flex gap-3">
        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
          Edit
        </button>

        <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition">
          Delete
        </button>
      </div> */}
    </div>
  );
};

export default EmployeeDetails;
