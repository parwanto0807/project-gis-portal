import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface SidebarToggleStore {
    isOpen: boolean;
    setIsOpen: () => void;
}

export const useSidebarToggle = create(
    persist<SidebarToggleStore>(
        (set, get) => ({
            isOpen: true,
            setIsOpen: () => {
                set({ isOpen: !get().isOpen });
            },
        }),
        {
            name: 'sidebarOpen',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
