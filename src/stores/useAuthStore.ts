import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/general';

type UserStore = {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setIsAuthenticated: (val: boolean) => void;
};

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            setUser: (userData) => set(() => ({ 
                user: userData
            })),
            setIsAuthenticated: (val) => set(() => (
                {isAuthenticated: val}
            ))
        }),
        {
        name: 'user-storage',
        partialize: (state) => ({ 
            user: state.user,
            isAuthenticated: state.isAuthenticated
        }),
        }
    )
);
