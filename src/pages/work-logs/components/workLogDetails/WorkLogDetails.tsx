import React from "react";
import { useTranslation } from "react-i18next";
import { useWorkLogs } from "../../../../store/useWorkLogs";
import { useLanguage } from "../../../../store/useLanguage";

interface Props {
  rate: number;
}

const WorkLogDetails: React.FC<Props> = ({ rate }) => {
  const { selectedLog } = useWorkLogs();
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();

  if (!selectedLog) return null;

  const getWorkingHours = () => {
    if (selectedLog.type !== "hour") return 0;

    const start = new Date(`1970-01-01T${selectedLog.startTime}`);
    const end = new Date(`1970-01-01T${selectedLog.endTime}`);
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  };

  const calculateAmount = () => {
    if (selectedLog.type === "hour") {
      return getWorkingHours() * rate;
    }

    if (selectedLog.type === "day") {
      return (selectedLog.dayType === "half" ? 0.5 : 1) * rate;
    }

    return 0;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(
      currentLanguage === "he"
        ? "he-IL"
        : currentLanguage === "ar"
          ? "ar-SA"
          : "en-US",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      },
    );
  };
  const onEdit = (id: string) => {
    // You can set the selected log in a state and then open the edit modal
    console.log("Edit log with id:", id);
  };
  const onDelete = (id: string) => {
    // You can call the delete API here and then refresh the logs list
    console.log("Delete log with id:", id);
  };
  return (
    <div className=" rounded-2xl   w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4"></div>

      {/* Date */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-green-400 text-white text-xs font-bold">
          <div>
            {new Date(selectedLog.date).getDate().toString().padStart(2, "0")}
          </div>
          <div className="text-[10px] opacity-80">
            {new Date(selectedLog.date).toLocaleDateString(
              currentLanguage === "he"
                ? "he-IL"
                : currentLanguage === "ar"
                  ? "ar-SA"
                  : "en-US",
              { weekday: "short" },
            )}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">{t("DATE")}</p>
          <p className="font-medium text-gray-800 dark:text-white">
            {formatDate(selectedLog.date)}
          </p>
        </div>
      </div>

      {/* Work Info */}
      <div className="space-y-3 text-sm">
        {/* Type */}
        <div className="flex justify-between">
          <span className="text-gray-500">{t("TYPE")}</span>
          <span className="font-medium">
            {selectedLog.type === "hour" ? t("HOURLY") : t("DAILY")}
          </span>
        </div>

        {/* Time */}
        <div className="flex justify-between">
          <span className="text-gray-500">{t("TIME")}</span>
          <span className="font-medium">
            {selectedLog.startTime} - {selectedLog.endTime}
          </span>
        </div>

        {/* Hours */}
        {selectedLog.type === "hour" && (
          <div className="flex justify-between">
            <span className="text-gray-500">{t("TOTAL_HOURS")}</span>
            <span className="font-medium">{getWorkingHours().toFixed(2)}</span>
          </div>
        )}

        {/* Day Type */}
        {selectedLog.type === "day" && (
          <div className="flex justify-between">
            <span className="text-gray-500">{t("DAY_TYPE")}</span>
            <span className="font-medium">
              {selectedLog.dayType === "half" ? t("HALF") : t("FULL")}
            </span>
          </div>
        )}

        {/* Rate */}
        <div className="flex justify-between">
          <span className="text-gray-500">{t("RATE")}</span>
          <span className="font-medium">₪ {rate}</span>
        </div>
      </div>

      {/* Notes */}
      {selectedLog.notes && (
        <div className="mt-5 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
          {selectedLog.notes}
        </div>
      )}

      {/* Total */}
      <div className="mt-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-center">
        <p className="text-sm text-gray-500">{t("TOTAL_AMOUNT")}</p>
        <p className="text-xl font-bold text-green-600">
          ₪ {calculateAmount().toFixed(2)}
        </p>
      </div>
      <div className="mt-6 flex gap-3">
        {/* Edit */}
        {/* <button
          onClick={() => onEdit?.(selectedLog._id)}
          className="flex-1 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow-md transition-all duration-200 active:scale-95"
        >
          ✏️ {t("EDIT")}
        </button> */}

        {/* Delete */}
        <button
          onClick={() => {
            const confirmDelete = window.confirm(
              t("DELETE_CONFIRM", "Are you sure you want to delete this log?"),
            );
            if (confirmDelete) {
              onDelete?.(selectedLog._id);
            }
          }}
          className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium shadow-md transition-all duration-200 active:scale-95"
        >
          🗑️ {t("DELETE")}
        </button>
      </div>
    </div>
  );
};

export default WorkLogDetails;
