import { useTranslation } from "react-i18next";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEmployees } from "../../../store/useEmployees";
import { deleteEmployeeUtil } from "../../../utils/employees.utils";
import Modal from "../../../components/modals/Modal";
import EditEmployeeForm from "./forms/EditEmployeeForm";
import FullScreenLoader from "../../../components/loadings/LoadingPage";

interface Props {}

const EmployeeDetails: React.FC<Props> = ({}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { deleteEmployee, selectedEmployee } = useEmployees();
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  if (!selectedEmployee) {
    return;
  }
  const onEdit = () => {
    setIsEditModalOpen(true);
  };

  const onDelete = async () => {
    await deleteEmployeeUtil(
      selectedEmployee._id,
      deleteEmployee,
      setIsLoading,
      navigate,
    );
  };
  if (!selectedEmployee) {
    return <FullScreenLoader />;
  }
  return (
    <div className="p-6 bg-black/5 dark:bg-gray-900/60  rounded-2xl shadow-md mb-6 mt-6 mx-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {selectedEmployee.name}
        </h2>

        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold ${
            selectedEmployee.payType === "hour"
              ? "bg-blue-100 text-blue-600"
              : "bg-purple-100 text-purple-600"
          }`}
        >
          {selectedEmployee.payType === "hour" ? "Per Hour" : "Per Day"}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-2 text-gray-600 dark:text-gray-300">
        <p>
          <span className="font-semibold">{t("RATE")}:</span> ₪
          {selectedEmployee.rate} / {selectedEmployee.payType}
        </p>

        {/* <p>
          <span className="font-semibold">
            {selectedEmployee.payType === "hour" ? "Hours" : "Days"} worked (this month):
          </span>{" "}
          {selectedEmployee.workAmount}
        </p> */}

        {/* <p>
          <span className="font-semibold">Total Pay:</span>{" "}
          <span className="text-green-600 font-bold">
            ₪ {totalPay.toFixed(2)}
          </span>
        </p> */}

        <p>
          <span className="font-semibold">{t("HIRE_DATE")}:</span>{" "}
          {new Date(selectedEmployee.hireDate).toLocaleDateString()}
        </p>
      </div>

      {/* Default Working Hours */}
      {selectedEmployee.defaultStartTime && selectedEmployee.defaultEndTime && (
        <div className="mt-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">{t("DEFAULT_WORK_HOURS")}:</span>{" "}
            {selectedEmployee.defaultStartTime} -{" "}
            {selectedEmployee.defaultEndTime}
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
      <div className="mt-6 flex gap-3">
        {/* Edit */}
        <button
          onClick={onEdit}
          className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium shadow-md transition-all duration-200 active:scale-95"
        >
          ✏️ {t("EDIT")}
        </button>

        {/* Delete */}
        <button
          onClick={() => {
            const confirmDelete = window.confirm(
              t("DELETE_CONFIRM", "Are you sure you want to delete this log?"),
            );
            if (confirmDelete) {
              onDelete?.();
            }
          }}
          className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium shadow-md transition-all duration-200 active:scale-95"
        >
          🗑️ {isLoading ? t("DELETING") : t("DELETE")}
        </button>
      </div>
      <Modal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        title={t("EDIT_EMPLOYEE")}
      >
        {/* <AddWorkLogForm setIsAddWorkLogModalOpen={setIsAddWorkLogModalOpen} /> */}
        {/* <AddWorkLogForm setIsAddEmployeeModalOpen={setIsAddWorkLogModalOpen} /> */}
        <EditEmployeeForm setIsEmployeeModalOpen={setIsEditModalOpen} />
      </Modal>
    </div>
  );
};

export default EmployeeDetails;
