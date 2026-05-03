import { create } from "zustand";
import type { WorkLogType } from "../types/types";
interface workLogsStoreType {
  workLogs: WorkLogType[];
  setWrokLogs: (workLogs: WorkLogType[]) => void;
  addWorkLog: (workLog: WorkLogType) => void;
}
export const useWorkLogs = create<workLogsStoreType>((set) => ({
  workLogs: [],
  setWrokLogs: (workLogs) => set({ workLogs }),
  addWorkLog: (workLog) =>
    set((state) => ({ workLogs: [...state.workLogs, workLog] })),
}));
