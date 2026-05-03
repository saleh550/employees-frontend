
import { create } from "zustand";
interface DarkModeStoreType {
    currentDarkMode: string;
    setDarkMode: (lang: string | "dark" | "light") => void;
}
export const useDarkMode = create<DarkModeStoreType>(

    (set) => ({
        currentDarkMode: "dark",
        setDarkMode: (lang) => set({ currentDarkMode: lang }),
    })

);