import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { useWorkLogs } from "../../../store/useWorkLogs";
import { useEmployeeAuth } from "../../../store/useEmployeeAuth";

const WorkLogsFooter: React.FC = () => {
  const { workLogs } = useWorkLogs();
  const { employeeUser } = useEmployeeAuth();

  const { t } = useTranslation();
  const summary = useMemo(() => {
    let totalHours = 0;
    let fullDays = 0;
    let halfDays = 0;
    let totalPay = 0;

    workLogs?.forEach((log) => {
      if (!employeeUser) return;

      // 🕒 HOURS
      if (log.type === "hour" && log.startTime && log.endTime) {
        const start = parseTime(log.startTime);
        const end = parseTime(log.endTime);
        const hours = (end - start) / 60;

        totalHours += hours;
        totalPay += hours * employeeUser.rate;
      }

      // 📅 DAYS
      if (log.type === "day") {
        if (log.dayType === "full") {
          fullDays += 1;
          totalPay += employeeUser.rate;
        } else if (log.dayType === "half") {
          halfDays += 1;
          totalPay += employeeUser.rate / 2;
        }
      }
    });

    return {
      totalHours,
      fullDays,
      halfDays,
      totalPay,
    };
  }, [workLogs, employeeUser]);

  return (
    <div className="py-6 px-2 bg-black/5 dark:bg-gray-900/60  rounded-2xl shadow-md mb-6 mt-6 mx-2">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        {t("MONTHLY_SUMMARY")}
      </h3>

      <div className="grid grid-cols-2 gap-4 text-sm">
        {/* Hours */}
        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
          <p className="text-gray-500">{t("TOTAL_HOURS")}</p>
          <p className="text-lg font-bold text-blue-600">
            {summary.totalHours.toFixed(2)}
          </p>
        </div>

        {/* Days */}
        <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20">
          <p className="text-gray-500">{t("DAYS")}</p>
          <p className="text-lg font-bold text-purple-600">
            {summary.fullDays} {t("FULL")} / {summary.halfDays} {t("HALF")}
          </p>
        </div>

        {/* Total Pay */}
        <div className="col-span-2 p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
          <p className="text-gray-500">{t("TOTAL_PAYMENT")}</p>
          <p className="text-xl font-bold text-green-600">
            ₪ {summary.totalPay.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkLogsFooter;

// 🧠 helper
function parseTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}
