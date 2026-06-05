'use client';

import { useAuthStore } from '@/store/authStore';
import { User, Shield, Mail, Key, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
    const user = useAuthStore((state) => state.user);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-gray-500">Memuat profil...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20 md:pb-0 w-full max-w-4xl mx-auto">
            {/* Header Profil */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-md relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                    <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white/20">
                        <span className="text-4xl font-bold text-blue-600">
                            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                        </span>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold tracking-tight">{user.username}</h1>
                        <p className="text-blue-100 mt-1 text-lg flex items-center justify-center md:justify-start gap-2">
                            <Shield className="w-5 h-5" /> 
                            {user.role}
                        </p>
                    </div>
                </div>
            </div>

            {/* Informasi Detail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Informasi Akun
                    </h2>
                    <div className="space-y-5">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Username</p>
                            <p className="font-medium text-gray-900 dark:text-gray-100 mt-1">{user.username}</p>
                        </div>
                        <div className="border-t border-gray-100 dark:border-gray-800 pt-5">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Role Pengguna</p>
                            <p className="font-medium text-gray-900 dark:text-gray-100 mt-1">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                    {user.role}
                                </span>
                            </p>
                        </div>
                        {user.id && (
                            <div className="border-t border-gray-100 dark:border-gray-800 pt-5">
                                <p className="text-sm text-gray-500 dark:text-gray-400">ID Pengguna</p>
                                <p className="font-medium text-gray-900 dark:text-gray-100 mt-1 font-mono text-sm">{user.id}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-indigo-600" />
                        Hak Akses (Permissions)
                    </h2>
                    {user.permissions && user.permissions.length > 0 ? (
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {user.permissions.map((perm: any, index: number) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{perm.module}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {perm.actions && perm.actions.map((action: string, i: number) => (
                                            <span key={i} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                                                {action}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <Key className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                            <p>Tidak ada data spesifik hak akses (Super Admin mungkin memiliki akses penuh secara default).</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
