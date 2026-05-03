import React, { type Dispatch, type SetStateAction } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useEmployees } from "../../../../store/useEmployees";
import { addNewEmployee } from "../../../../utils/employees.utils";

// 🧠 Validation schema
const employeeSchema = z.object({
  name: z.string().min(2, { message: "NAME_MIN_LENGTH" }),
  rate: z.string().min(1, { message: "REQUIRED_FIELD_MESSAGE" }),
  payType: z.enum(["hour", "day"], { message: "PAY_TYPE_REQUIRED" }),
  hireDate: z.date({ message: "HIRE_DATE_REQUIRED" }),
  defaultStartTime: z.string().optional(),
  defaultEndTime: z.string().optional(),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface AddEmployeeFormProps {
  setIsAddEmployeeModalOpen: Dispatch<SetStateAction<boolean>>;
}
const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({
  setIsAddEmployeeModalOpen,
}) => {
  const { t } = useTranslation();
  const { addEmployee } = useEmployees();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });
  const payType = watch("payType");

  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    // const file = data.image[0];
    // // console.log("Category Data:", data);
    // // console.log("File:", file);
    // const formData = new FormData();
    // formData.append("englishName", data.englishName);
    // formData.append("arabicName", data.arabicName);
    // formData.append("hebrewName", data.hebrewName);
    // formData.append("image", file);
    // await addNewCategory(
    //   formData,
    //   addCategory,
    //   setIsLoading,
    //   setIsAddCategoryModalOpen,
    // );
    await addNewEmployee(
      data,
      addEmployee,
      setIsLoading,
      setIsAddEmployeeModalOpen,
    );
  };

  return (
    <div className="max-w-lg mx-auto bg-transparent p-6 rounded-2xl ">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {t("ADD_EMPLOYEE_FORM_TITLE")}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            {t("ADD_EMPLOYEE_FORM_NAME")}
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder={t("EMPLOYEE_NAME_PLACEHOLDER") as string}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {t(errors.name.message ?? "")}
            </p>
          )}
        </div>
        {/* Pay Type */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            {t("ADD_EMPLOYEE_FORM_PAY_TYPE")}
          </label>
          <select
            defaultValue={"day"}
            {...register("payType")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="hour">{t("PAY_TYPE_HOUR")}</option>
            <option value="day">{t("PAY_TYPE_DAY")}</option>
          </select>
          {errors.payType && (
            <p className="text-red-500 text-sm mt-1">
              {t(errors.payType.message ?? "")}
            </p>
          )}
        </div>
        {/* Rate */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            {payType === "hour"
              ? t("ADD_EMPLOYEE_FORM_RATE_Hour")
              : t("ADD_EMPLOYEE_FORM_RATE_Day")}
          </label>
          <input
            type="number"
            {...register("rate")}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder={
              payType === "hour"
                ? t("RATE_HOUR_PLACEHOLDER")
                : (t("RATE_DAY_PLACEHOLDER") as string)
            }
          />
          {errors.rate && (
            <p className="text-red-500 text-sm mt-1">
              {t(errors.rate.message ?? "")}
            </p>
          )}
        </div>
        {/* Hire Date */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            {t("ADD_EMPLOYEE_FORM_HIRE_DATE")}
          </label>
          <input
            defaultValue={new Date().toISOString().slice(0, 10)}
            type="date"
            {...register("hireDate", {
              valueAsDate: true,
            })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.hireDate && (
            <p className="text-red-500 text-sm mt-1">
              {t(errors.hireDate.message ?? "")}
            </p>
          )}
        </div>
        {/* default work hours */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            {t("ADD_EMPLOYEE_FORM_DEFAULT_WORK_HOURS")}
          </label>
          <div className="flex space-x-2">
            <input
              defaultValue={"08:00"}
              type="time"
              {...register("defaultStartTime")}
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <span className="self-center">{t("TO")}</span>
            <input
              defaultValue={"16:30"}
              type="time"
              {...register("defaultEndTime")}
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
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

export default AddEmployeeForm;
