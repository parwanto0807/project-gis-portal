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
        <div className="flex min-h-screen w-full items-center justify-center p-4 bg-muted/20">
            <Card className="w-full max-w-[420px] shadow-sm rounded-xl border border-border/60 overflow-hidden bg-background">
                <CardHeader className="flex flex-col space-y-1.5 pb-6 pt-6 px-6">
                    <CardTitle className="text-xl font-bold tracking-tight">
                        Login to your account
                    </CardTitle>
                    <CardDescription className="text-sm">
                        Enter your username below to login to your account
                    </CardDescription>
                </CardHeader>

                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <CardContent className="px-6 pb-6 pt-0 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                        <Input
                            id="username"
                            className={`rounded-md h-10 ${errors.username ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                            placeholder="johndoe"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                if (errors.username) setErrors({ ...errors, username: '' });
                            }}
                        />
                        {errors.username && <p className="text-xs text-destructive mt-1">{errors.username}</p>}
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                            <Button variant="link" className="px-0 py-0 h-auto text-sm text-foreground/80 hover:text-foreground">
                                Forgot your password?
                            </Button>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            className={`rounded-md h-10 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password) setErrors({ ...errors, password: '' });
                            }}
                        />
                        {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 px-6 py-6 bg-muted/30 border-t border-border">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-10 font-medium rounded-md"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Login
                    </Button>
                    
                    <div className="w-full flex justify-center pt-2">
                        <GoogleLogin
                            onSuccess={(credentialResponse: CredentialResponse) => {
                                if (credentialResponse.credential) {
                                    handleGoogleLogin(credentialResponse.credential);
                                }
                            }}
                            onError={() => toast.error('Google Login Failed')}
                            width="372"
                            theme="filled_blue"
                            shape="pill"
                            text="continue_with"
                            size="large"
                        />
                    </div>
                </CardFooter>
                </form>
            </Card>

            <div className="absolute bottom-6 text-muted-foreground/60 text-xs font-semibold tracking-widest uppercase">
                2025 © GIS PORTAL
            </div>
        </div>
    );
}
