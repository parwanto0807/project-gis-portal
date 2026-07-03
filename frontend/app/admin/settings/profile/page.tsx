'use client';

import { useAuthStore } from '@/store/authStore';
import { User, Shield, Mail, Key, Calendar, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import api from '@/lib/axios';

export default function ProfilePage() {
    const user = useAuthStore((state) => state.user);
    const [mounted, setMounted] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            toast.error('Konfirmasi password tidak cocok');
            return;
        }

        if (newPassword.length < 6) {
            toast.error('Password baru minimal 6 karakter');
            return;
        }

        try {
            setIsSubmitting(true);
            const res = await api.post('/auth/change-password', {
                oldPassword,
                newPassword
            });
            
            if (res.data.success) {
                toast.success('Password berhasil diubah');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                toast.error(res.data.message || 'Gagal mengubah password');
            }
        } catch (error: any) {
            console.error('Change password error:', error);
            toast.error(error.response?.data?.message || 'Terjadi kesalahan saat mengubah password');
        } finally {
            setIsSubmitting(false);
        }
    };

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

            {/* Modul Ganti Password */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mt-6">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-rose-600" />
                    Ubah Password
                </h2>
                <form onSubmit={handleChangePassword} className="space-y-5 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password Lama</label>
                        <div className="relative">
                            <input
                                type={showOldPassword ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="Masukkan password lama"
                                required
                            />
                            <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password Baru</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="Minimal 6 karakter"
                                minLength={6}
                                required
                            />
                            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Konfirmasi Password Baru</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${confirmPassword && confirmPassword !== newPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                                placeholder="Ketik ulang password baru"
                                minLength={6}
                                required
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {confirmPassword && confirmPassword !== newPassword && (
                            <p className="text-xs text-red-500 mt-1.5">Konfirmasi password tidak cocok.</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...</>
                        ) : (
                            'Simpan Password'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
