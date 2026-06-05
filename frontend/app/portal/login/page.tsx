'use client';

import api from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Loader2 } from 'lucide-react';

export default function UnifiedLoginPage() {
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const role = useAuthStore((state) => state.user?.role);
    const login = useAuthStore((state) => state.login);
    
    // UI state
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Form inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            router.push(role === 'VENDOR' ? '/vendor/dashboard' : '/admin/dashboard');
        }
    }, [isAuthenticated, role, router]);

    const handleGoogleLogin = async (credential: string) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/google', { idToken: credential });
            if (res.data.success) {
                const { user } = res.data.data;
                if (user.role === 'VENDOR') {
                    toast.error('This page is for internal employees only.');
                    return;
                }
                login(user);
                toast.success('Signed in with Google!');
            }
        } catch (error: any) {
            console.error('Google Login Error:', error);
            toast.error(error.response?.data?.message || 'Google Login failed');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!username) newErrors.username = 'Username is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const payload: any = { identifier: username, password: password };
            const res = await api.post('/auth/login', payload);

            if (res.data.success) {
                const { user } = res.data.data;
                if (user.role === 'VENDOR') {
                    toast.error('This access is for internal employees only.');
                    return;
                }
                login(user);
            } else {
                toast.error(res.data.message || 'Login failed');
            }
        } catch (error: any) {
            console.error('Login Error:', error);
            toast.error(error.response?.data?.message || 'Invalid credentials or server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-[100dvh] w-full items-center justify-center p-4 sm:p-8 bg-slate-950">
            {/* Premium Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Abstract gradients */}
                <div className="absolute top-0 -left-1/4 w-full h-full bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent blur-[120px] rounded-full" />
                <div className="absolute bottom-0 -right-1/4 w-full h-full bg-gradient-to-tl from-blue-500/20 via-cyan-500/10 to-transparent blur-[120px] rounded-full" />
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            <Card className="relative z-10 w-full max-w-[440px] shadow-2xl rounded-[1.5rem] sm:rounded-2xl border-white/10 overflow-hidden bg-background/85 sm:bg-background/80 backdrop-blur-xl dark:bg-slate-950/85 dark:sm:bg-slate-950/80 dark:border-slate-800/60 ring-1 ring-white/5 mx-auto">
                <CardHeader className="flex flex-col space-y-1 sm:space-y-2 pb-6 pt-8 sm:pb-8 sm:pt-10 px-6 sm:px-8 text-center">
                    <div className="mx-auto bg-gradient-to-tr from-primary to-blue-500 p-2.5 sm:p-3 rounded-2xl shadow-lg mb-2 sm:mb-4 ring-1 ring-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 sm:w-8 sm:h-8 text-white"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm font-medium text-muted-foreground/80">
                        Log in to your GIS Portal account
                    </CardDescription>
                </CardHeader>

                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <CardContent className="px-6 sm:px-8 pb-8 pt-0 space-y-4 sm:space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Username</Label>
                        <Input
                            id="username"
                            className={`rounded-xl h-12 sm:h-11 px-4 text-[15px] sm:text-sm bg-background/50 border-white/10 dark:border-slate-800 focus-visible:ring-primary/50 transition-all ${errors.username ? 'border-destructive/50 focus-visible:ring-destructive' : ''}`}
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                if (errors.username) setErrors({ ...errors, username: '' });
                            }}
                        />
                        {errors.username && <p className="text-[11px] sm:text-xs text-destructive mt-1 font-medium ml-1">{errors.username}</p>}
                    </div>

                    <div className="space-y-2">
                        <div className="ml-1">
                            <Label htmlFor="password" className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className={`rounded-xl h-12 sm:h-11 px-4 text-[15px] sm:text-sm bg-background/50 border-white/10 dark:border-slate-800 focus-visible:ring-primary/50 transition-all ${errors.password ? 'border-destructive/50 focus-visible:ring-destructive' : ''}`}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password) setErrors({ ...errors, password: '' });
                            }}
                        />
                        {errors.password && <p className="text-[11px] sm:text-xs text-destructive mt-1 font-medium ml-1">{errors.password}</p>}
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 sm:h-11 mt-2 sm:mt-0 text-[15px] sm:text-sm font-bold tracking-wide rounded-xl shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 active:scale-[0.98]"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In
                    </Button>

                    <div className="relative my-5 sm:my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-[10px] sm:text-xs uppercase">
                            <span className="bg-background/80 backdrop-blur-sm px-3 text-muted-foreground font-semibold tracking-widest">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="w-full flex justify-center pb-2">
                        <GoogleLogin
                            onSuccess={(credentialResponse: CredentialResponse) => {
                                if (credentialResponse.credential) {
                                    handleGoogleLogin(credentialResponse.credential);
                                }
                            }}
                            onError={() => toast.error('Google Login Failed')}
                            width="320"
                            theme="filled_blue"
                            shape="pill"
                            text="continue_with"
                            size="large"
                        />
                    </div>
                </CardContent>
                </form>
            </Card>

            <div className="absolute bottom-6 sm:bottom-8 text-white/40 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-center w-full">
                &copy; {new Date().getFullYear()} GRAFINDO MITRASEMESTA
            </div>
        </div>
    );
}
