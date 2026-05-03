import type { SetStateAction } from "react";
// import type { FieldValues } from "react-hook-form";
// import type { NavigateFunction } from "react-router-dom";
import type { EmployeeType } from "../types/types";
import {
  addNewEmployeeApi,
  getActiveEmployeesApi,
} from "../services/employees/employees-apis";
import type { TFunction } from "i18next";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { FieldValues } from "react-hook-form";

export const getActiveEmployees = async (
  //   data: FieldValues,
  setIsLoading: (value: SetStateAction<boolean>) => void,
  //   navigate: NavigateFunction,
  setData: (data: EmployeeType[]) => void,
  t: TFunction<"translation", undefined>,
): Promise<any | null> => {
  try {
    setIsLoading(true);
    const res = await getActiveEmployeesApi();
    setIsLoading(false);
    setData(res?.data);
    // navigate("/maneger/home");
    return res?.data;
  } catch (err: AxiosError | any) {
    setIsLoading(false);
    console.log(err);
    toast.error(t(err?.response?.data?.message) || t("SOMETHING_WENT_WRONG"));
    return null;
  }
};
export const addNewEmployee = async (
  data: FieldValues,
  addEmployee: (employee: EmployeeType) => void,
  setIsLoading: (value: SetStateAction<boolean>) => void,
  setIsAddEmployeeModalOpen: (value: SetStateAction<boolean>) => void,
): Promise<any | null> => {
  try {
    setIsLoading(true);
    const res = await addNewEmployeeApi(data);
    addEmployee(res?.data);
    setIsLoading(false);
    setIsAddEmployeeModalOpen(false);
    toast.success("Employee added successfully");
    return true;
  } catch (err: AxiosError | any) {
    setIsLoading(false);
    console.log(err);
    toast.error("Failed to add employee");
    return null;
  }
};
