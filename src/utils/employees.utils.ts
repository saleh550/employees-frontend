import type { SetStateAction } from "react";
// import type { FieldValues } from "react-hook-form";
// import type { NavigateFunction } from "react-router-dom";
import type { EmployeeType } from "../types/types";
import {
  addNewEmployeeApi,
  deleteEmployeeApi,
  editNewEmployeeApi,
  getActiveEmployeesApi,
} from "../services/employees/employees-apis";
import type { TFunction } from "i18next";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { FieldValues } from "react-hook-form";
import type { NavigateFunction } from "react-router-dom";

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

export const deleteEmployeeUtil = async (
  id: string,
  deleteEmployee: (id: string) => void,
  setIsLoading: (value: SetStateAction<boolean>) => void,
  navigate: NavigateFunction,
): Promise<any | null> => {
  try {
    setIsLoading(true);
    const res = await deleteEmployeeApi(id);
    navigate("/");
    if (res.status === 200) {
      toast.success("Employee deleted successfully");
      deleteEmployee(id);
    }

    setIsLoading(false);
    return true;
  } catch (err: AxiosError | any) {
    setIsLoading(false);
    console.log(err);
    toast.error("Failed to delete employee");
    return null;
  }
};
export const editEmployee = async (
  id: string,
  data: FieldValues,
  updateEmployee: (employee: EmployeeType) => void,
  setIsLoading: (value: SetStateAction<boolean>) => void,
  seIsEditModalOpen: (value: SetStateAction<boolean>) => void,
  setSelectefEmployee: (employee: EmployeeType | null) => void,
): Promise<any | null> => {
  try {
    setIsLoading(true);
    const res = await editNewEmployeeApi(id, data);
    console.log("result: ",res);
    
    if (res.status === 200) {
      toast.success("Employee edited successfully");
      updateEmployee(res?.data);
      setSelectefEmployee(res?.data);
    }
    seIsEditModalOpen(false);
    setIsLoading(false);
    return true;
  } catch (err: AxiosError | any) {
    setIsLoading(false);
    console.log(err);
    toast.error("Failed to edit employee");
    return null;
  }
};
