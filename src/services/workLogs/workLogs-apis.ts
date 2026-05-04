import { type FieldValues } from "react-hook-form";
import { privateRequest } from "../axios/PrivateRequest";

export const getWorkLogsApi = (data: FieldValues) => {
  return privateRequest({
    url: `/api/worklogs/${data.employeeId}?month=${data.month}&year=${data.year}`,
    method: "GET",
  });
};
export const createNewWorkLogApi = (data: FieldValues) => {
  return privateRequest({
    url: "/api/worklogs/",
    method: "POST",
    data,
  });
};

export const deleteWorkLogApi = (id: string) => {
  return privateRequest({
    url: `/api/worklogs/${id}`,
    method: "DELETE",
    
  });
};
