'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, hasHydrated, logout } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        // Wait for hydration to complete before checking auth
        if (!hasHydrated) return;

        // Check if user is authenticated in local storage
        if (!isAuthenticated || !user) {
            console.log('AuthGuard: User not authenticated, redirecting to login');
            setIsVerifying(false);
            // Redirect to the unified login page
            router.push('/portal/login');
            return;
        }

        // Verify session silently with backend to prevent dashboard flash on expired token
        const verifySession = async () => {
            try {
                await api.get('/auth/me', {
                    _retry: true // prevent interceptor from looping if it fails
                } as any);
                setIsVerifying(false);
            } catch (error) {
                console.log('AuthGuard: Session invalid, logging out');
                logout();
                setIsVerifying(false);
                router.push('/portal/login');
            }
        };

        verifySession();
    }, [isAuthenticated, user, hasHydrated, router, logout]);

    useEffect(() => {
        if (!isVerifying && isAuthenticated && user) {
            // Check for forced password change
            if (user.mustChangePassword) {
                console.log('AuthGuard: User must change password, redirecting');
                router.replace('/portal/force-change-password');
                return;
            }

            // Role-based redirect for STAFF, checked only after verification
            if (user.role?.toUpperCase() === 'STAFF') {
                const allowedExactPaths = ['/admin/dashboard', '/admin/audit/temuan', '/admin/settings/profile'];
                const allowedPrefixes = ['/admin/suggestions'];
                const isAllowed = allowedExactPaths.includes(pathname) || allowedPrefixes.some(prefix => pathname.startsWith(prefix));
                
                if (pathname.startsWith('/admin') && !isAllowed) {
                    console.log('AuthGuard: STAFF role restricted, redirecting to /admin/audit/temuan');
                    router.replace('/admin/audit/temuan');
                }
            }
        }
    }, [isVerifying, isAuthenticated, user, pathname, router]);

    // Show loading while hydrating from localStorage or verifying session
    if (!hasHydrated || isVerifying) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Verifying session...</p>
                </div>
            </div>
        );
    }

    // Show loading while redirecting
    if (!isAuthenticated || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    // Block render if STAFF is accessing unauthorized path
    if (user.role?.toUpperCase() === 'STAFF') {
        const allowedExactPaths = ['/admin/dashboard', '/admin/audit/temuan', '/admin/settings/profile'];
        const allowedPrefixes = ['/admin/suggestions'];
        const isAllowed = allowedExactPaths.includes(pathname) || allowedPrefixes.some(prefix => pathname.startsWith(prefix));

        if (pathname.startsWith('/admin') && !isAllowed) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950">
                    <div className="text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Checking permissions...</p>
                    </div>
                </div>
            );
        }
    }

    return <>{children}</>;
}
