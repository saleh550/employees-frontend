import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEmployees } from "../../store/useEmployees";
import EmployeeDetails from "./components/EmplyeeDetails";
import WorkLogsList from "./components/WorLogsList";
import { getWorkLogsForEmployee } from "../../utils/worklogs.utils";
import { useWorkLogs } from "../../store/useWorkLogs";

interface props {}

const WorkLogsPage: React.FC<props> = () => {
  const { employeeId } = useParams();
  const { selectedEmployee, setSelectedEmployee, employees } = useEmployees();
  const { setWrokLogs } = useWorkLogs();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const fun = async () => {
      if (employeeId) {
        const date = new Date();
        const data = {
          employeeId,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        };
        await getWorkLogsForEmployee(data, setWrokLogs, setIsLoading);
      }
    };
    fun();
    if (employeeId) {
      const emp = employees.find((emp) => emp._id === employeeId);
      if (emp) {
        setSelectedEmployee(emp);
      }
    }
  }, [employeeId]);

  return (
    <div>
      <EmployeeDetails employee={selectedEmployee!} />
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
      />
    </div>
  );
};

export default WorkLogsPage;
