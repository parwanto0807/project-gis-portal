'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, hasHydrated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Wait for hydration to complete before checking auth
        if (!hasHydrated) return;

        // Check if user is authenticated
        if (!isAuthenticated || !user) {
            console.log('AuthGuard: User not authenticated, redirecting to login');

            // Redirect to the unified login page
            router.push('/portal/login');
            return;
        }

        // Role-based redirect for STAFF
        if (user.role?.toUpperCase() === 'STAFF') {
            const allowedPaths = ['/admin/dashboard', '/admin/audit/temuan', '/admin/settings/profile'];
            if (pathname.startsWith('/admin') && !allowedPaths.includes(pathname)) {
                console.log('AuthGuard: STAFF role restricted, redirecting to /admin/audit/temuan');
                router.replace('/admin/audit/temuan');
                return;
            }
        }
    }, [isAuthenticated, user, hasHydrated, router, pathname]);

    // Show loading while hydrating from localStorage
    if (!hasHydrated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Show loading while redirecting
    if (!isAuthenticated || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-gray-600">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    // Block render if STAFF is accessing unauthorized path
    if (user.role?.toUpperCase() === 'STAFF') {
        const allowedPaths = ['/admin/dashboard', '/admin/audit/temuan', '/admin/settings/profile'];
        if (pathname.startsWith('/admin') && !allowedPaths.includes(pathname)) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                        <p className="mt-4 text-sm text-gray-600">Checking permissions...</p>
                    </div>
                </div>
            );
        }
    }

    return <>{children}</>;
}
