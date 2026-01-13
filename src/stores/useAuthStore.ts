import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/general';

type UserStore = {
    user: User | null;
    isAuthenticated: boolean;
    isHydrated: boolean;
    setUser: (user: User | null) => void;
    setIsAuthenticated: (val: boolean) => void;
    setHydrated: (val: boolean) => void;
    logout: () => void
};

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isHydrated: false,
            setUser: (userData) => set(() => ({ 
                user: userData
            })),
            setIsAuthenticated: (val) => set(() => (
                {isAuthenticated: val}
            )),
            setHydrated: (hydrated) => set({ isHydrated: hydrated }),
            logout: () => set(() => ({
                user: null,
                isAuthenticated: false
            }))
        }),
        {
            name: 'user-storage',
            partialize: (state) => ({ 
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setHydrated(true)
                }
            }
        }
    )
);
