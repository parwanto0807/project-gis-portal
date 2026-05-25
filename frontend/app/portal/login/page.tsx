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
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full h-10 font-medium rounded-md"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Login
                    </Button>
                    
                    <div className="w-full relative">
                        <div className="w-full relative opacity-0 z-10 h-10 absolute inset-0 overflow-hidden rounded-md">
                            <div className="absolute top-[-5px] left-0 w-[200%] transform scale-y-150 scale-x-105 origin-top-left">
                                <GoogleLogin
                                    onSuccess={(credentialResponse: CredentialResponse) => {
                                        if (credentialResponse.credential) {
                                            handleGoogleLogin(credentialResponse.credential);
                                        }
                                    }}
                                    onError={() => toast.error('Google Login Failed')}
                                />
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            className="w-full h-10 font-medium bg-background absolute inset-0 z-0 rounded-md flex items-center justify-center gap-2"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Login with Google
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <div className="absolute bottom-6 text-muted-foreground/60 text-xs font-semibold tracking-widest uppercase">
                2025 © GIS PORTAL
            </div>
        </div>
    );
}
