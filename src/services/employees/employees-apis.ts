import { type FieldValues } from "react-hook-form";
import { privateRequest } from "../axios/PrivateRequest";

export const getActiveEmployeesApi = () => {
  return privateRequest({
    url: "/api/employees/",
    method: "GET",
  });
};
export const addNewEmployeeApi = (data: FieldValues) => {
  return privateRequest({
    url: "/api/employees/",
    method: "POST",
    data,
  });
};
