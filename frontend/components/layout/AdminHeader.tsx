'use client';

import { Bell, Search, Globe, Grid, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import UserProfileMenu from './UserProfileMenu';
import { SheetMenu } from '@/components/sidebar/sheet-menu';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { usePathname, useRouter } from 'next/navigation';
import { getMenuList } from '@/lib/menu-list';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AdminHeader() {
    const { user } = useAuthStore();
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const resultListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Get the menu list based on the current user
    const menuList = useMemo(() => {
        return getMenuList(pathname, user);
    }, [pathname, user]);

    // Flatten the menu for searching
    const searchableItems = useMemo(() => {
        const items: { label: string; href: string; icon: any; group: string }[] = [];
        menuList.forEach(group => {
            group.menus.forEach(menu => {
                if (menu.href && !menu.submenus.length) {
                    items.push({ label: menu.label, href: menu.href, icon: menu.icon, group: group.groupLabel });
                }
                menu.submenus?.forEach(sub => {
                    items.push({
                        label: `${menu.label} > ${sub.label}`,
                        href: sub.href,
                        icon: sub.icon || menu.icon,
                        group: group.groupLabel
                    });
                });
            });
        });
        return items;
    }, [menuList]);

    // Filter items based on search query
    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const lowerQuery = searchQuery.toLowerCase();
        return searchableItems.filter(item =>
            item.label.toLowerCase().includes(lowerQuery) ||
            item.group.toLowerCase().includes(lowerQuery)
        );
    }, [searchQuery, searchableItems]);

    // Reset selection when query changes
    useEffect(() => {
        setSelectedIndex(-1);
    }, [searchQuery]);

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as Element).closest('#global-search-container')) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Scroll active item into view
    const scrollToItem = (index: number) => {
        const list = resultListRef.current;
        if (list) {
            const item = list.children[index] as HTMLElement;
            if (item) {
                item.scrollIntoView({ block: 'nearest' });
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!filteredItems.length) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => {
                const next = prev < filteredItems.length - 1 ? prev + 1 : 0;
                scrollToItem(next);
                return next;
            });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => {
                const next = prev > 0 ? prev - 1 : filteredItems.length - 1;
                scrollToItem(next);
                return next;
            });
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0) {
                const item = filteredItems[selectedIndex];
                router.push(item.href);
                setIsSearchFocused(false);
                setSearchQuery("");
            }
        }
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 shadow-sm">

            <div className="flex items-center gap-4 flex-1">
                <SheetMenu />

                {/* Search Bar Container */}
                <div id="global-search-container" className="relative w-full max-w-md">
                    <div className="flex items-center gap-2 rounded-md border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 px-3 py-2 ml-4 transition-colors focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-zinc-950 focus-within:ring-1 focus-within:ring-blue-500">
                        <Search className="h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search menu..."
                            className="w-full bg-transparent text-sm outline-none text-gray-700 dark:text-zinc-200 placeholder:text-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    {/* Search Results Dropdown */}
                    {isSearchFocused && searchQuery && (
                        <div className="absolute top-full left-4 right-0 mt-1 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-800 max-h-80 overflow-y-auto py-2 z-50">
                            {filteredItems.length > 0 ? (
                                <ul ref={resultListRef}>
                                    {filteredItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-2 transition-colors",
                                                    index === selectedIndex ? "bg-gray-100 dark:bg-zinc-800" : "hover:bg-gray-50 dark:hover:bg-zinc-800/50"
                                                )}
                                                onClick={() => {
                                                    setIsSearchFocused(false);
                                                    setSearchQuery("");
                                                }}
                                                onMouseEnter={() => setSelectedIndex(index)} // Update selection on hover
                                            >
                                                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                                                    <item.icon className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">{item.label}</p>
                                                    <p className="text-xs text-gray-500">{item.group}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-4 py-3 text-center text-sm text-gray-500">
                                    No results found for "{searchQuery}"
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4 ml-4">
                {/* Theme Toggle Button */}
                {mounted && (
                    <button 
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="rounded-lg p-2 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-5 w-5 text-amber-500" />
                        ) : (
                            <Moon className="h-5 w-5 text-gray-600" />
                        )}
                    </button>
                )}

                <button className="rounded-lg p-2 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hidden sm:block">
                    <Globe className="h-5 w-5" />
                </button>
                <button className="rounded-lg p-2 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hidden sm:block">
                    <Grid className="h-5 w-5" />
                </button>
                <button className="relative rounded-lg p-2 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                {/* User Profile Menu */}
                <UserProfileMenu />
            </div>

        </header>
    );
}
