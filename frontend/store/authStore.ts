import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Permission } from '@/types/rbac';

export interface User {
    id: number;
    email: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    picture?: string;
    role: string;
    permissions?: Permission[];
    mustChangePassword?: boolean;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    hasHydrated: boolean;
    login: (user: User) => void;
    logout: () => void;
    setUser: (user: User) => void;
    setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            hasHydrated: false,
            login: (user) => {
                // Tokens are stored in HttpOnly Cookies by the backend
                set({ user, isAuthenticated: true });
            },
            logout: () => {
                // Backend logout should be called by the component/service consuming this
                set({ user: null, isAuthenticated: false });
            },
            setUser: (user: User) => set({ user }),
            setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
