import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EmployeeType } from "../types/types";
interface AuthStoreType {
  employeeUser: null | EmployeeType;
  employeeAccessToken: string | null;
  setemployeeUser: ({
    accessToken,
    user,
  }: {
    accessToken: string | null;
    user: EmployeeType | null;
  }) => void;
  logout: () => void;
}

export const useEmployeeAuth = create<AuthStoreType>()(
  persist(
    (set) => ({
      employeeUser: null,
      employeeAccessToken: null,
      setemployeeUser: ({ accessToken, user }) => {
        set({ employeeAccessToken: accessToken, employeeUser: user });
      },
      logout: () => {
        set({ employeeUser: null, employeeAccessToken: null });
      },
    }),
    { name: "employee-auth" },
  ),
);
