import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EmployeeType } from "../types/types";
interface EmployeesStoreType {
  employees: EmployeeType[];
  selectedEmployee: EmployeeType | null;
  setEmployees: (employees: EmployeeType[]) => void;
  addEmployee: (employee: EmployeeType) => void;
  setSelectedEmployee: (employee: EmployeeType | null) => void;
  deleteEmployee?: (id: string) => void;
  updateEmployee?: (employee: EmployeeType) => void;
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
      deleteEmployee: (id) =>
        set((state) => ({
          employees: state.employees.filter((emp) => emp._id !== id),
        })),
      updateEmployee: (updatedEmployee) =>
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp._id === updatedEmployee._id ? updatedEmployee : emp
          ),
        })),
    }),
    { name: "employees" },
  ),
);
