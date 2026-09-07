import React, { useEffect } from "react";
import { useEmployees } from "../../store/useEmployees";
// import EmployeeDetails from "./components/EmplyeeDetails";
// import WorkLogsList from "./components/WorLogsList";
import { getWorkLogsForEmployeeByEmployee } from "../../utils/worklogs.utils";
import { useWorkLogs } from "../../store/useWorkLogs";
// import WorkLogsFooter from "./components/work-logs-summary/WorkLogsFooter";
// import BackButton from "./components/BackButton";
import { useEmployeeAuth } from "../../store/useEmployeeAuth";
import EmployeeDetails from "./components/EmployeeDetails";
import WorkLogsList from "./components/WorkLogsList";
import WorkLogsFooter from "./components/WorkLogsFooter";

interface props {}

const EmployeeHome: React.FC<props> = () => {
  const { selectedEmployee, setSelectedEmployee } = useEmployees();
  const { setWrokLogs, selectedMonth, selectedYear } = useWorkLogs();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAddWorkLogModalOpen, setIsAddWorkLogModalOpen] =
    React.useState(false);

  const { employeeUser } = useEmployeeAuth();

  useEffect(() => {
    const fun = async () => {
      if (employeeUser._id) {
        const date = new Date();
        console.log("data:1", employeeUser);
        
        const data = {
          employeeId: employeeUser._id,
          month: selectedMonth || date.getMonth() + 1,
          year: selectedYear || date.getFullYear(),
        };
        await getWorkLogsForEmployeeByEmployee(data, setWrokLogs, setIsLoading);
      }
    };
    fun();
    if (employeeUser) {
      if (true) {
        setSelectedEmployee(employeeUser);
      }
    }
  }, [employeeUser]);

  return (
    <div>
      {/* <BackButton /> */}
      <EmployeeDetails />
      <hr
        style={{
          margin: "1rem 10px",
          border: "none",
          borderBottom: "2px solid #ccc",
        }}
      />
      <WorkLogsList
        rate={selectedEmployee?.rate || 0}
        payType={selectedEmployee?.payType}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setIsAddWorkLogModalOpen={setIsAddWorkLogModalOpen}
        isAddWorkLogModalOpen={isAddWorkLogModalOpen}
      />
      <hr
        style={{
          margin: "1rem 10px",
          border: "none",
          borderBottom: "2px solid #ccc",
        }}
      />
      <WorkLogsFooter />
    </div>
  );
};

export default EmployeeHome;
