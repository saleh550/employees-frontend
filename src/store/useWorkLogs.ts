import { create } from "zustand";
import type { WorkLogType } from "../types/types";
interface workLogsStoreType {
  workLogs: WorkLogType[];
  selectedMonth: number;
  selectedYear: number;
  selectedLog?: WorkLogType;
  setWrokLogs: (workLogs: WorkLogType[]) => void;
  addWorkLog: (workLog: WorkLogType) => void;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
  setSelectedLog: (log?: WorkLogType) => void;
}
export const useWorkLogs = create<workLogsStoreType>((set) => ({
  workLogs: [],
  selectedLog: undefined,
  selectedMonth: new Date().getMonth() + 1,
  selectedYear: new Date().getFullYear(),
  setWrokLogs: (workLogs) => set({ workLogs }),
  addWorkLog: (workLog) =>
    set((state) => ({ workLogs: [...state.workLogs, workLog] })),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  setSelectedYear: (year) => set({ selectedYear: year }),
  setSelectedLog: (log) => set({ selectedLog: log }),
}));
