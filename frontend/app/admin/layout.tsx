"use client";

import { Sidebar } from '@/components/sidebar/sidebar';
import Header from '@/components/layout/AdminHeader';
import AuthGuard from '@/components/auth/AuthGuard';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { useStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';

import Link from 'next/link'; // Ensure Link is imported if needed, though mostly for BottomNav internals
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <AuthGuard>
            <div className="flex h-screen bg-gray-100 dark:bg-zinc-950">
                <Sidebar />
                <div
                    className={cn(
                        "flex flex-1 flex-col overflow-hidden transition-[margin-left] ease-in-out duration-300",
                        sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-[280px]"
                    )}
                >
                    <Header />
                    <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300">
                        {children}
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
