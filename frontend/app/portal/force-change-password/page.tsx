'use client';

import api from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { Loader2, KeyRound, Eye, EyeOff } from 'lucide-react';

export default function ForceChangePasswordPage() {
    const router = useRouter();
    const { isAuthenticated, user, setUser, logout } = useAuthStore();
    
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isAuthenticated || !user) {
            router.push('/portal/login');
        } else if (!user.mustChangePassword) {
            router.push('/admin/dashboard');
        }
    }, [isAuthenticated, user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword.length < 6) {
            setError('Password minimal 6 karakter.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Konfirmasi password tidak cocok.');
            return;
        }

        setLoading(true);
        try {
            const res = await api.post('/auth/force-change-password', { newPassword });
            
            if (res.data.success) {
                toast.success('Password berhasil diperbarui!');
                
                // Update local state so AuthGuard lets them pass
                if (user) {
                    setUser({ ...user, mustChangePassword: false });
                }
                
                // Redirect based on role
                if (user?.role === 'STAFF') {
                    router.push('/admin/audit/temuan');
                } else {
                    router.push('/admin/dashboard');
                }
            }
        } catch (err: any) {
            console.error('Change Password Error:', err);
            toast.error(err.response?.data?.message || 'Gagal mengubah password');
        } finally {
            setLoading(false);
        }
    };

    if (!user || !user.mustChangePassword) return null;

    return (
        <div className="relative flex min-h-dvh w-full items-center justify-center p-4 sm:p-8 bg-slate-950">
            {/* Premium Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-1/4 w-full h-full bg-linear-to-br from-indigo-500/20 via-purple-500/10 to-transparent blur-[120px] rounded-full" />
                <div className="absolute bottom-0 -right-1/4 w-full h-full bg-linear-to-tl from-blue-500/20 via-cyan-500/10 to-transparent blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            <Card className="relative z-10 w-full max-w-[340px] shadow-2xl rounded-[1.5rem] sm:rounded-2xl border-white/10 overflow-hidden bg-background/85 sm:bg-background/80 backdrop-blur-xl dark:bg-slate-950/85 dark:sm:bg-slate-950/80 dark:border-slate-800/60 ring-1 ring-white/5 mx-auto">
                <CardHeader className="flex flex-col space-y-1 sm:space-y-1.5 pb-3 pt-5 sm:pb-5 sm:pt-6 px-4 sm:px-6 text-center">
                    <div className="mx-auto bg-linear-to-tr from-rose-500 to-orange-500 p-2 sm:p-2.5 rounded-2xl shadow-lg mb-2 sm:mb-3 ring-1 ring-white/20">
                        <KeyRound className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold tracking-tight bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Wajib Ganti Password
                    </CardTitle>
                    <CardDescription className="text-[11px] sm:text-xs font-medium text-muted-foreground/80">
                        Demi keamanan, silakan ganti password default Anda sebelum melanjutkan.
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 space-y-3 sm:space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="newPassword" className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground ml-1">Password Baru</Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    className={`rounded-xl h-9 sm:h-10 px-3 pr-10 text-[13px] bg-background/50 border-white/10 dark:border-slate-800 focus-visible:ring-primary/50 transition-all ${error === 'Password minimal 6 karakter.' ? 'border-destructive/50 focus-visible:ring-destructive' : ''}`}
                                    placeholder="Minimal 6 karakter"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        if (error === 'Password minimal 6 karakter.') setError('');
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 focus:outline-none"
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="confirmPassword" className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground ml-1">Konfirmasi Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    className={`rounded-xl h-9 sm:h-10 px-3 pr-10 text-[13px] bg-background/50 border-white/10 dark:border-slate-800 focus-visible:ring-primary/50 transition-all ${confirmPassword && confirmPassword !== newPassword ? 'border-destructive/50 focus-visible:ring-destructive' : ''}`}
                                    placeholder="Ketik ulang password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        if (error === 'Konfirmasi password tidak cocok.') setError('');
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 focus:outline-none"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {confirmPassword && confirmPassword !== newPassword && !error && (
                                <p className="text-[11px] sm:text-xs text-destructive mt-1 font-medium ml-1">Konfirmasi password tidak cocok.</p>
                            )}
                            {error && <p className="text-[11px] sm:text-xs text-destructive mt-1 font-medium ml-1">{error}</p>}
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full h-9 sm:h-10 rounded-xl text-[13px] font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            {loading ? 'Menyimpan...' : 'Simpan & Lanjutkan'}
                        </Button>
                        
                        <Button 
                            type="button" 
                            variant="ghost" 
                            className="w-full h-8 text-[11px] text-muted-foreground hover:text-foreground mt-2"
                            onClick={() => {
                                logout();
                                router.push('/portal/login');
                            }}
                        >
                            Batal & Keluar
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
