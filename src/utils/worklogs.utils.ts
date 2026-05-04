import type { FieldValues } from "react-hook-form";
import type { WorkLogType } from "../types/types";
import type { SetStateAction } from "react";
import {
  createNewWorkLogApi,
  deleteWorkLogApi,
  getWorkLogsApi,
} from "../services/workLogs/workLogs-apis";
import type { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export const getWorkLogsForEmployee = async (
  data: FieldValues,
  setWorkLogs: (worklogs: WorkLogType[]) => void,
  setIsLoading: (value: SetStateAction<boolean>) => void,
): Promise<any | null> => {
  try {
    setIsLoading(true);
    const res = await getWorkLogsApi(data);
    console.log(res?.data);

    setWorkLogs(res?.data.logs);
    setIsLoading(false);
    return true;
  } catch (err: AxiosError | any) {
    setIsLoading(false);
    console.log(err);
    toast.error("Failed to fetch work logs");
    return null;
  }
};
export const createWorkLog = async (
  data: FieldValues,
  addWorklog: (worklog: WorkLogType) => void,
  setIsLoading: (value: SetStateAction<boolean>) => void,
  setIsModalOpen: (value: SetStateAction<boolean>) => void,
  selectedMonth: number,
  selectedYear: number,
): Promise<any | null> => {
  try {
    setIsLoading(true);
    const res = await createNewWorkLogApi(data);
    console.log(res?.data);
    if (
      selectedMonth === new Date(data.date).getMonth() + 1 &&
      selectedYear === new Date(data.date).getFullYear()
    ) {
      addWorklog(res?.data);
    }
    setIsLoading(false);
    return true;
  } catch (err: AxiosError | any) {
    setIsLoading(false);
    console.log(err);
    toast.error("Failed to create work log");
    return null;
  } finally {
    setIsModalOpen(false);
  }
};

export const deleteWorkLog = async (
  id: string,
  deleteWorkLogStore: (id: string) => void,
  setIsLoading: (value: SetStateAction<boolean>) => void,
  setIsModalOpen: (value: SetStateAction<boolean>) => void,
): Promise<any | null> => {
  try {
    setIsLoading(true);
    const res = await deleteWorkLogApi(id);
    console.log(res?.data);
    if (res?.data.id === id) {
      deleteWorkLogStore(id);
    }else {
      toast.error("Failed to delete work log");
    }
    setIsLoading(false);
    return true;
  } catch (err: AxiosError | any) {
    setIsLoading(false);
    console.log(err);
    toast.error("Failed to delete work log");
    return null;
  } finally {
    setIsModalOpen(false);
  }
};
