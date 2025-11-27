// store/userStore.ts
import { useStoreType } from "@/type/intex";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create<useStoreType>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => set({ user }),

      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
    }),
    {
      name: "devsprint-user", // <-- localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        tasks: state.tasks,
      }),
    }
  )
);
