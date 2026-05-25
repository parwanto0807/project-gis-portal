'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, LogOut, Package } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you generated this utility

const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Purchase Orders', href: '/orders', icon: FileText },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function VendorSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden w-64 flex-col border-r border-gray-100 bg-white shadow-sm md:flex">
            <div className="flex h-16 items-center justify-center border-b border-gray-100 px-6">
                <span className="text-xl font-bold tracking-tight text-blue-900">
                    Vendor<span className="text-blue-600">Portal</span>
                </span>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-6">
                {menuItems.map((item) => {
                    const isActive = pathname === `/vendor${item.href}` || (item.href === '/dashboard' && pathname === '/vendor/dashboard');

                    return (
                        <Link
                            key={item.name}
                            href={`/vendor${item.href}`}
                            className={cn(
                                "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                    isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-gray-100 p-4">
                <button className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
