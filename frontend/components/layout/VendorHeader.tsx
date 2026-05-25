'use client';

import { Bell, Search } from 'lucide-react';
import UserProfileMenu from './UserProfileMenu';

export default function VendorHeader() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-gray-100 bg-white/80 px-6 backdrop-blur-md">
            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search orders, invoices..."
                        className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100/50"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <button className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                {/* User Profile Menu */}
                <UserProfileMenu />
            </div>
        </header>
    );
}
