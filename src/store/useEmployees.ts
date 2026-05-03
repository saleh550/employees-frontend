import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EmployeeType } from "../types/types";
interface EmployeesStoreType {
  employees: EmployeeType[];
  selectedEmployee: EmployeeType | null;
  setEmployees: (employees: EmployeeType[]) => void;
  addEmployee: (employee: EmployeeType) => void;
  setSelectedEmployee: (employee: EmployeeType | null) => void;
}
export const useEmployees = create<EmployeesStoreType>()(
  persist(
    (set) => ({
      employees: [],
      selectedEmployee: null,
      setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),
      setEmployees: (employees) => set({ employees }),
      addEmployee: (employee) =>
        set((state) => ({ employees: [...state.employees, employee] })),
    }),
    { name: "employees" },
  ),
);
