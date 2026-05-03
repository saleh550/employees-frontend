import { create } from "zustand";
import { persist } from "zustand/middleware";
interface LanguageStoreType {
  currentLanguage: string;
  setLanguage: (lang: string|"en"|"he"|"ar") => void;
}
export const useLanguage = create<LanguageStoreType>()(
  persist(
    (set) => ({
      currentLanguage: "en",
      setLanguage: (lang) => set({ currentLanguage: lang }),
    }),
    { name: "currentLanguage" }
  )
);