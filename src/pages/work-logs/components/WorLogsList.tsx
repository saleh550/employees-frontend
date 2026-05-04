import React from "react";
import { useWorkLogs } from "../../../store/useWorkLogs";
import WorkLogsLoadingCards from "../../../components/loadings/WorkLogsLoadingCards";
import MonthsScroller from "./MonthsScroller";
import YearsScroller from "./YearsScroller";
import { useParams } from "react-router-dom";
import { getWorkLogsForEmployee } from "../../../utils/worklogs.utils";
import WorkLogCard from "./WorkLogCard";
import { GoPersonAdd } from "react-icons/go";
import { useTranslation } from "react-i18next";
import Modal from "../../../components/modals/Modal";
import AddWorkLogForm from "./add-work-log/AddWorkLogForm";
import EmptyWorkLogs from "../../../components/empty-message/EmptyWorkLogs";
import WorkLogDetails from "./workLogDetails/WorkLogDetails";

interface Props {
  rate: number; // rate of employee
  payType?: "hour" | "day";
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddWorkLogModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddWorkLogModalOpen: boolean;
}

const WorkLogsList: React.FC<Props> = ({
  rate,
  isLoading,
  setIsLoading,
  setIsAddWorkLogModalOpen,
  isAddWorkLogModalOpen,
}) => {
  const [isWorkLogDetailsModalOpen, setIsWorkLogDetailsModalOpen] =
    React.useState(false);
  const { employeeId } = useParams();
  const { t } = useTranslation();
  const {
    setSelectedMonth,
    setSelectedYear,
    selectedMonth,
    selectedYear,
    setWrokLogs,
    workLogs,
  } = useWorkLogs();

  const onSelectYear = async (year: number) => {
    setSelectedYear(year);
    if (employeeId) {
      const data = {
        employeeId,
        month: selectedMonth,
        year: year,
      };
      await getWorkLogsForEmployee(data, setWrokLogs, setIsLoading);
    }
  };
  const onSelectMonth = async (month: number) => {
    setSelectedMonth(month);
    if (employeeId) {
      const data = {
        employeeId,
        month: month,
        year: selectedYear,
      };
      await getWorkLogsForEmployee(data, setWrokLogs, setIsLoading);
    }
  };

  return (
    <div className="py-6 bg-black/5 dark:bg-gray-900/60  rounded-2xl shadow-md mb-6 mt-6 mx-2">
      <div className="flex justify-between">
        <div className="rounded-2xl  mb-6  mx-2">
          <h2 className="  text-xl font-semibold text-gray-900 dark:text-white">
            {t("WORK_LOGS")}
          </h2>
        </div>
        <button
          onClick={() => setIsAddWorkLogModalOpen(true)}
          className="mb-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition flex justify-center items-center gap-2"
        >
          <GoPersonAdd className="text-lg font-semibold" />{" "}
          {t("ADD_NEW_WORK_LOG")}
        </button>
      </div>
      <YearsScroller onSelect={(y) => onSelectYear(y)} />
      <MonthsScroller onSelect={(m) => onSelectMonth(m)} />
      {/* <IOSDatePicker/> */}
      {isLoading ? (
        <WorkLogsLoadingCards />
      ) : workLogs.length > 0 ? (
        <WorkLogCard
          rate={rate}
          setIsWorkLogDetailsModalOpen={setIsWorkLogDetailsModalOpen}
        />
      ) : (
        <EmptyWorkLogs onAdd={() => setIsAddWorkLogModalOpen(true)} />
      )}
      <Modal
        isOpen={isAddWorkLogModalOpen}
        setIsOpen={setIsAddWorkLogModalOpen}
        title={t("ADD_NEW_WORK_LOG")}
      >
        {/* <AddWorkLogForm setIsAddWorkLogModalOpen={setIsAddWorkLogModalOpen} /> */}
        <AddWorkLogForm setIsAddEmployeeModalOpen={setIsAddWorkLogModalOpen} />
      </Modal>
      <Modal
        isOpen={isWorkLogDetailsModalOpen}
        setIsOpen={setIsWorkLogDetailsModalOpen}
        title={t("WORKLOG_DETAILS")}
      >
        {/* <AddWorkLogForm setIsAddWorkLogModalOpen={setIsAddWorkLogModalOpen} /> */}
        {/* <AddWorkLogForm setIsAddEmployeeModalOpen={setIsAddWorkLogModalOpen} /> */}
        <WorkLogDetails
          rate={rate}
          setIsModalOpen={setIsWorkLogDetailsModalOpen}
        />
      </Modal>
    </div>
  );
};

export default WorkLogsList;
