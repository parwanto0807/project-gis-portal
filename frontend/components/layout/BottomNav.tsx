'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, AlertCircle, ShieldAlert, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

export default function BottomNav() {
    const pathname = usePathname();
    const { user } = useAuthStore();

    const navItems = [
        {
            name: 'Beranda',
            href: '/admin/dashboard',
            icon: Home,
        },
        {
            name: 'Temuan',
            href: '/admin/audit/temuan',
            icon: AlertCircle,
        },
        {
            name: 'Disiplin',
            href: '/admin/hr/discipline',
            icon: ShieldAlert,
        },
        {
            name: 'Profil',
            href: '/admin/settings/profile',
            icon: User,
        },
    ];

    const filteredNavItems = navItems.filter((item) => {
        if (user?.role?.toUpperCase() === 'STAFF') {
            return item.href === '/admin/audit/temuan' || item.href === '/admin/settings/profile';
        }
        return true;
    });

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-gray-200 bg-white/90 backdrop-blur-md pb-safe dark:border-gray-800 dark:bg-zinc-950/90 md:hidden">
            {filteredNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                            isActive 
                                ? "text-blue-600 dark:text-blue-500" 
                                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        )}
                    >
                        <div className={cn(
                            "flex items-center justify-center p-1 rounded-full transition-all duration-300",
                            isActive && "bg-blue-100 dark:bg-blue-900/30"
                        )}>
                            <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
                        </div>
                        <span className="text-[10px] font-medium leading-none">{item.name}</span>
                    </Link>
                );
            })}
        </div>
    );
}
