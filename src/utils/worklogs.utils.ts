import type { FieldValues } from "react-hook-form";
import type { WorkLogType } from "../types/types";
import type { SetStateAction } from "react";
import { getWorkLogsApi } from "../services/workLogs/workLogs-apis";
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
