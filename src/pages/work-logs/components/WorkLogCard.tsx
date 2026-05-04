import React from "react";
import type { WorkLogType } from "../../../types/types";
import { useWorkLogs } from "../../../store/useWorkLogs";

interface props {
  rate: number; // rate of employee
}

const WorkLogCard: React.FC<props> = ({ rate }) => {
  const { workLogs } = useWorkLogs();
  const getDisplayText = (log: WorkLogType) => {
    if (log.type === "hour") {
      return `${log.startTime} - ${log.endTime}`;
    }

    if (log.type === "day") {
      return log.dayType === "half"
        ? `Half Day - ${log.startTime} - ${log.endTime}`
        : `Full Day - ${log.startTime} - ${log.endTime}`;
    }

    return "";
  };
  const calculateAmount = (log: WorkLogType) => {
    if (log.type === "hour") {
      const start = new Date(`1970-01-01T${log.startTime}`);
      const end = new Date(`1970-01-01T${log.endTime}`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      return hours * rate;
    }

    if (log.type === "day") {
      const days = log.dayType === "half" ? 0.5 : 1;
      return days * rate;
    }

    return 0;
  };
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="space-y-3 mx-2">
      {workLogs &&
        workLogs?.map((log) => {
          const amount = calculateAmount(log);

          return (
            <div
              key={log._id}
              className="flex items-center gap-4 p-3 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
            >
              {/* Date Circle */}
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-green-400 text-white text-sm font-bold">
                {formatDate(log.date)}
              </div>

              {/* Details */}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {getDisplayText(log)}
                </p>

                {log.notes && (
                  <p className="text-xs text-gray-500">{log.notes}</p>
                )}
              </div>

              {/* Amount */}
              <div className="text-right">
                <p className="text-sm font-semibold text-green-600">
                  ₪ {amount.toFixed(2)}
                </p>

                <p className="text-xs text-gray-400">
                  {log.type === "hour" ? "Hourly" : "Daily"}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default WorkLogCard;
