'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/axios';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react';
// Toast notifications handled by sonner (already imported in layout)
import PermissionMatrix from '@/components/users/PermissionMatrix';
import { Role, Permission } from '@/types/rbac';

import React, { use } from 'react';

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();

    // Unwrap params Promise (Next.js 15+)
    const { id } = use(params);

    const [user, setUser] = useState<any>(null);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [role, setRole] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (id) {
            fetchUser(id);
        }
    }, [id]);

    const fetchUser = async (userId: string) => {
        try {
            const res = await api.get(`/users/${userId}`);
            if (res.data.success) {
                const data = res.data.data;
                setUser(data);
                setPermissions(data.permissions || []);
                setRole(data.role);
                setStatus(data.status);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to load user data');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!id) return;
        setSaving(true);
        try {
            const payload = {
                role,
                status,
                permissions: permissions.map(p => ({
                    module: p.module,
                    actions: p.actions
                }))
            };

            await api.put(`/users/${id}/permissions`, payload);
            alert('Permissions updated successfully!');
            router.push('/admin/users');
        } catch (error) {
            console.error(error);
            alert('Failed to update permissions');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-10 flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>;
    }

    if (!user) {
        return <div className="p-10 text-center">User not found</div>;
    }

    return (
        <div className="space-y-6 pt-6 pb-20">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Edit Access: {user.username}
                    </h1>
                    <p className="text-slate-500 text-sm">Configure roles and granular permissions.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Basic Info */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input value={`${user.firstName} ${user.lastName}`} disabled className="bg-slate-50" />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input value={user.email} disabled className="bg-slate-50" />
                            </div>

                            <Separator className="my-2" />

                            <div className="space-y-2">
                                <Label>Role (High Level)</Label>
                                <Select value={role} onValueChange={setRole}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(Role).map((r) => (
                                            <SelectItem key={r} value={r}>{r}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-[10px] text-gray-500">
                                    Base role determines hierarchy level. 'ADMIN' permissions override granular settings usually.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>Account Status</Label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className={status === 'ACTIVE' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                                        <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                                        <SelectItem value="SUSPENDED">SUSPENDED</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-100">
                        <CardContent className="pt-6">
                            <div className="flex gap-3">
                                <AlertCircle className="h-5 w-5 text-blue-600 shrink-0" />
                                <div className="text-xs text-blue-700">
                                    <p className="font-semibold mb-1">Permission Logic</p>
                                    <p>Granular permissions below allow you to give specific access (e.g. READ only on Inventory) to users with 'STAFF' or 'USER' roles.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Permission Matrix */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Access Matrix</CardTitle>
                                <CardDescription>Define what this user can do in each module.</CardDescription>
                            </div>
                            {/* Quick Select Buttons could go here */}
                        </CardHeader>
                        <CardContent>
                            <PermissionMatrix
                                permissions={permissions}
                                onChange={setPermissions}
                                readOnly={role === 'SUPER_ADMIN'}
                            />
                            {role === 'SUPER_ADMIN' && (
                                <p className="text-xs text-red-500 mt-2 text-center bg-red-50 p-2 rounded">
                                    * Super Admin has full access by default. Matrix is disabled.
                                </p>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between border-t p-6 bg-slate-50/50">
                            <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
                            <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                                {saving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
