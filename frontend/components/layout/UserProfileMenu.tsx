'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { LogOut, User, ChevronDown, Download } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import api from '@/lib/axios';

// Move Install logic inside the menu directly
function InstallAppButton() {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState<any>(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [deviceType, setDeviceType] = useState<"ios" | "android" | "other">("other");

    useEffect(() => {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
        if (isStandalone) {
            setIsInstalled(true);
            return;
        }

        const ua = window.navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(ua);
        const isAndroid = /android/.test(ua);
        if (isIOS) setDeviceType("ios");
        else if (isAndroid) setDeviceType("android");
        
        if (isIOS || isAndroid) {
            setIsMobile(true);
        }

        const handler = (e: any) => {
            e.preventDefault();
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        if (typeof window !== 'undefined' && (window as any).deferredPrompt) {
            handler((window as any).deferredPrompt);
        }

        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const onClickInstall = (e: React.MouseEvent) => {
        e.preventDefault();
        if (promptInstall) {
            promptInstall.prompt();
        } else {
            if (deviceType === "ios") {
                alert("Untuk install di iOS/iPhone:\n\n1. Tap ikon 'Share' (kotak dengan panah ke atas) di bawah layar Safari.\n2. Scroll ke bawah dan pilih 'Add to Home Screen' (Tambahkan ke Layar Utama).");
            } else {
                alert("Untuk install di Android:\n\nTap ikon Menu (titik tiga ⋮) di pojok kanan atas browser Chrome Anda, lalu pilih 'Install App' atau 'Tambahkan ke Layar Utama'.");
            }
        }
    };

    if (isInstalled || (!supportsPWA && !isMobile)) {
        return null;
    }

    return (
        <>
            <div className="my-1 border-t border-gray-100"></div>
            <button
                onClick={onClickInstall}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
            >
                <Download className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Install App</span>
            </button>
        </>
    );
}

export default function UserProfileMenu() {
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            logout();
            toast.success('Logged out successfully');
            router.push('/portal/login');
        } catch (error) {
            console.error('Logout error:', error);
            logout(); // Force logout even if API fails
            router.push('/portal/login');
        }
    };

    if (!user) {
        return null;
    }

    const getAvatarUrl = (picture: string | undefined | null) => {
        if (!picture) return null;
        if (picture.startsWith('http')) return picture;
        const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '').replace('/api', '') || 'http://localhost:5001';
        return `${baseUrl}/${picture.startsWith('/') ? picture.slice(1) : picture}`;
    };

    const displayName = user.firstName || user.username || user.email?.split('@')[0] || 'User';
    
    const formatRole = (role: string) => {
        if (!role) return 'Employee';
        if (role === 'SUPER_ADMIN') return 'Super Admin';
        return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    };
    const roleLabel = formatRole(user.role);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                {/* Avatar */}
                <div className="relative">
                    {user.picture ? (
                        <img
                            src={getAvatarUrl(user.picture) || ''}
                            alt={displayName}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-gray-200"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center ring-2 ring-gray-200">
                            <span className="text-white font-semibold text-sm">
                                {displayName.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                {/* User Info - Hidden on mobile */}
                <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-semibold text-gray-900 leading-tight">
                        {displayName}
                    </span>
                    <span className="text-xs text-gray-500 leading-tight">
                        {roleLabel}
                    </span>
                </div>

                {/* Chevron */}
                <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform hidden sm:block ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            {user.picture ? (
                                <img
                                    src={getAvatarUrl(user.picture) || ''}
                                    alt={displayName}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center ring-2 ring-gray-200">
                                    <span className="text-white font-bold text-lg">
                                        {displayName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                    {displayName}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user.email}
                                </p>
                                <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-blue-100 text-blue-700">
                                    {roleLabel}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                router.push('/admin/settings/profile');
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <User className="w-4 h-4 text-gray-500" />
                            <span>My Profile</span>
                        </button>

                        <InstallAppButton />

                        <div className="my-1 border-t border-gray-100"></div>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
