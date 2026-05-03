import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserType } from "../types/types";
interface AuthStoreType {
  user: null | UserType;
  accessToken: string | null;
  setUser: ({
    accessToken,
    user,
  }: {
    accessToken: string | null;
    user: UserType | null;
  }) => void;
  logout: () => void;
}


export const useAuth = create<AuthStoreType>()(
  persist(
    (set) => ({
      user:null,
      accessToken:null,
      setUser: ({ accessToken, user }) => {
        set({ accessToken, user });
      },
      logout: () => {
        set({ user: null, accessToken: null });

      },
    }),
    { name: "auth" }
  )
);