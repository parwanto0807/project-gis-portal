import { useAuthStore } from '@/store/authStore';
import type { User } from '@/store/authStore';

export function useCurrentUser() {
    const user = useAuthStore((state) => state.user);
    return user;
}

export type { User };
