import React, { useEffect, type Dispatch, type SetStateAction } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useEmployees } from "../../../../store/useEmployees";
import { createWorkLog } from "../../../../utils/worklogs.utils";
import { useWorkLogs } from "../../../../store/useWorkLogs";

// 🧠 Validation schema
const employeeSchema = z.object({
  date: z.date({ message: "WORK_LOG_DATE_REQUIRED" }),
  dayType: z
    .enum(["full", "half"], { message: "DAY_TYPE_REQUIRED" })
    .optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  type: z.enum(["hour", "day"], { message: "WORK_LOG_TYPE_REQUIRED" }),
  notes: z.string().optional(),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface AddEmployeeFormProps {
  setIsAddEmployeeModalOpen: Dispatch<SetStateAction<boolean>>;
}
const AddWorkLogForm: React.FC<AddEmployeeFormProps> = ({
  setIsAddEmployeeModalOpen,
}) => {
  const { addWorkLog, selectedMonth, selectedYear } = useWorkLogs();
  const { t } = useTranslation();
  const { selectedEmployee } = useEmployees();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });
  useEffect(() => {
    if (selectedEmployee) {
      if (selectedEmployee.payType === "day") {
        setValue("dayType", "full", { shouldValidate: true });
      }
      setValue("type", selectedEmployee.payType, { shouldValidate: true });
    }
  }, [selectedEmployee]);
  const payType = watch("type");
  const dayType = watch("dayType");

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const payload = {
      employee: selectedEmployee?._id,
      date: data.date.toISOString().slice(0, 10),
      type: selectedEmployee?.payType,
      dayType: data.dayType,
      startTime: data.startTime,
      endTime: data.endTime,
      notes: data.notes,
    };
    console.log(payload);
    await createWorkLog(
      payload,
      addWorkLog,
      setIsLoading,
      setIsAddEmployeeModalOpen,
      selectedMonth,
      selectedYear,
    );

    // await addNewEmployee(
    //   data,
    //   addEmployee,
    //   setIsLoading,
    //   setIsAddEmployeeModalOpen,
    // );
  };

  return (
    <div className="max-w-lg mx-auto bg-transparent p-6 rounded-2xl ">
      <h2 className="text-2xl font-semibold text-center text-gray-800 ">
        {t("ADD_NEW_WORK_LOG")}
      </h2>
      <h3 className="text-md font-medium text-center text-gray-600 mb-4">
        {t("WORK_LOG_FOR")}{" "}
        {selectedEmployee ? selectedEmployee.name : t("SELECT_EMPLOYEE_FIRST")}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* date */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            {t("ADD_EMPLOYEE_FORM_NAME")}
          </label>
          <input
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            {...register("date", { valueAsDate: true })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder={t("EMPLOYEE_NAME_PLACEHOLDER") as string}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">
              {t(errors.date.message ?? "")}
            </p>
          )}
        </div>
        {/* Pay Type */}
        {/* <div>
          <label className="block font-medium text-gray-700 mb-1">
            {t("ADD_WORK_LOG_FORM_PAY_TYPE")}
          </label>
          <select
            disabled={!!selectedEmployee}
            defaultValue={selectedEmployee?.payType}
            {...register("type")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="hour">{t("PAY_TYPE_HOUR")}</option>
            <option value="day">{t("PAY_TYPE_DAY")}</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">
              {t(errors.type.message ?? "")}
            </p>
          )}
        </div> */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            {t("ADD_WORK_LOG_FORM_PAY_TYPE")}
          </label>

          <div className="flex gap-2">
            {/* Hour */}
            <button
              type="button"
              disabled={!!selectedEmployee}
              onClick={() => setValue("type", "hour", { shouldValidate: true })}
              className={`flex-1 py-2 rounded-lg border transition
        ${
          selectedEmployee.payType === "hour"
            ? "bg-orange-500 text-white border-orange-500"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300"
        }
        ${selectedEmployee ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
            >
              {t("PAY_TYPE_HOUR")}
            </button>

            {/* Day */}
            <button
              type="button"
              disabled={!!selectedEmployee}
              onClick={() => setValue("type", "day", { shouldValidate: true })}
              className={`flex-1 py-2 rounded-lg border transition
        ${
          selectedEmployee.payType === "day"
            ? "bg-orange-500 text-white border-orange-500"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300"
        }
        ${selectedEmployee ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
            >
              {t("PAY_TYPE_DAY")}
            </button>
          </div>

          {errors.type && (
            <p className="text-red-500 text-sm mt-1">
              {t(errors.type.message ?? "")}
            </p>
          )}
        </div>
        {/* DAY TYPE */}
        {/* <div>
          <label className="block font-medium text-gray-700 mb-1">
            {t("ADD_WORK_LOG_FORM_DAY_TYPE")}
          </label>
          <select
            {...register("dayType")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="full">{t("DAY_TYPE_FULL")}</option>
            <option value="half">{t("DAY_TYPE_HALF")}</option>
          </select>
          {errors.dayType && (
            <p className="text-red-500 text-sm mt-1">
              {t(errors.dayType.message ?? "")}
            </p>
          )}
        </div> */}
        {/* DAY TYPE */}
        {payType === "day" && (
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              {t("ADD_WORK_LOG_FORM_DAY_TYPE")}
            </label>

            <div className="flex gap-2">
              {/* Full Day */}
              <button
                type="button"
                onClick={() =>
                  setValue("dayType", "full", { shouldValidate: true })
                }
                className={`flex-1 py-2 rounded-lg border transition-all duration-200
        ${
          dayType === "full"
            ? "bg-orange-500 text-white border-orange-500"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300"
        }
        active:scale-95
      `}
              >
                {t("DAY_TYPE_FULL")}
              </button>

              {/* Half Day */}
              <button
                type="button"
                onClick={() =>
                  setValue("dayType", "half", { shouldValidate: true })
                }
                className={`flex-1 py-2 rounded-lg border transition-all duration-200
        ${
          dayType === "half"
            ? "bg-orange-500 text-white border-orange-500"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300"
        }
        active:scale-95
      `}
              >
                {t("DAY_TYPE_HALF")}
              </button>
            </div>

            {errors.dayType && (
              <p className="text-red-500 text-sm mt-1">
                {t(errors.dayType.message ?? "")}
              </p>
            )}
          </div>
        )}
        {/* default work hours */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            {t("ADD_TIME_RANGE")}
          </label>
          <div className="flex space-x-2">
            <input
              defaultValue={"08:00"}
              type="time"
              {...register("startTime")}
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <span className="self-center">{t("TO")}</span>
            <input
              defaultValue={"16:30"}
              type="time"
              {...register("endTime")}
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
        {/* notes */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            {t("EMPLOYEE_NOTES")}
          </label>
          <textarea
            {...register("notes")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder={t("EMPLOYEE_NOTES_PLACEHOLDER") as string}
          />
        </div>
        {/* Image URL */}
        {/* <div>
                    <label className="block font-medium text-gray-700 mb-1">
                        Image URL
                    </label>
                    <input
                        type="file"
                        {...register("image")}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="https://example.com/image.jpg"
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">
                            {t(errors.image.message ?? "")}
                        </p>
                    )}
                </div> */}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-500 hover:bg-green-600 text-white  font-semibold py-2 rounded-lg transition"
        >
          {isLoading ? t("SAVING") : t("SAVE")}
        </button>
      </form>
    </div>
  );
};

export default AddWorkLogForm;
