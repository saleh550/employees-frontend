import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EmployeeType } from "../types/types";
interface EmployeesStoreType {
  employees: EmployeeType[];
  setEmployees: (employees: EmployeeType[]) => void;
  addEmployee: (employee: EmployeeType) => void;
}
export const useEmployees = create<EmployeesStoreType>()(
  persist(
    (set) => ({
      employees: [],
      setEmployees: (employees) => set({ employees }),
      addEmployee: (employee) =>
        set((state) => ({ employees: [...state.employees, employee] })),
    }),
    { name: "employees" },
  ),
);
