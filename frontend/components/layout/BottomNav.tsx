'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, AlertCircle, ShieldAlert, User, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/axios';

export default function BottomNav() {
    const pathname = usePathname();
    const { user } = useAuthStore();
    const [openCount, setOpenCount] = useState(0);

    useEffect(() => {
        const fetchOpenCount = async () => {
            try {
                const res = await api.get('/temuan-peduli');
                if (res.data?.success) {
                    const count = res.data.data.filter((d: any) => d.status === 'OPEN' || !d.status).length;
                    setOpenCount(count);
                }
            } catch (error) {
                console.error("Failed to fetch open findings count for badge", error);
            }
        };

        if (user) {
            fetchOpenCount();
        }
    }, [user]);

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
            name: 'Ide',
            href: '/admin/suggestions',
            icon: Lightbulb, // Assuming Lightbulb is imported
        },
        {
            name: 'Profil',
            href: '/admin/settings/profile',
            icon: User,
        },
    ];

    let filteredNavItems = navItems;
    
    if (user?.role?.toUpperCase() === 'STAFF') {
        filteredNavItems = [
            navItems.find(item => item.href === '/admin/audit/temuan')!,
            navItems.find(item => item.href === '/admin/suggestions')!,
            navItems.find(item => item.href === '/admin/dashboard')!
        ].filter(Boolean);
    } else if (user?.role?.toUpperCase() === 'USER') {
        filteredNavItems = [
            navItems.find(item => item.href === '/admin/dashboard')!,
            navItems.find(item => item.href === '/admin/suggestions')!
        ].filter(Boolean);
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-gray-200 bg-white/90 backdrop-blur-md pb-safe dark:border-gray-800 dark:bg-zinc-950/90 md:hidden">
            {filteredNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                const showBadge = item.name === 'Temuan' && openCount > 0;
                
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors relative",
                            isActive 
                                ? "text-blue-600 dark:text-blue-500" 
                                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        )}
                    >
                        <div className={cn(
                            "flex items-center justify-center p-1 rounded-full transition-all duration-300 relative",
                            isActive && "bg-blue-100 dark:bg-blue-900/30"
                        )}>
                            <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
                            {showBadge && (
                                <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white border-2 border-white dark:border-zinc-950">
                                    {openCount > 9 ? '9+' : openCount}
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] font-medium leading-none flex items-center gap-1">
                            {item.name}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
