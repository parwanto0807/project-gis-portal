'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import AddUserDialog from '@/components/users/AddUserDialog';
import UserTable from '@/components/users/UserTable';
import HeaderCard from '@/components/ui/header-card';
import { Users, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function UserManagementPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get('/users');
            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            // Implement delete logic here
            console.log('Delete user', id);
            // await api.delete(`/users/${id}`);
            // fetchUsers();
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const userStats = [
        {
            title: "Total Users",
            value: users.length,
            description: "Registered accounts"
        },
        {
            title: "Active Users",
            value: users.filter((u: any) => u.status === 'ACTIVE').length,
            description: "Currently active accounts"
        },
        {
            title: "Admins",
            value: users.filter((u: any) => u.role === 'ADMIN' || u.role === 'SUPER_ADMIN').length,
            description: "Administrative access"
        }
    ];

    return (
        <div className="space-y-8 pt-6 px-2 sm:px-4 w-full mx-auto">
            <HeaderCard
                title="User Management"
                description="Manage employee access, roles, and platform permissions."
                icon={<Users className="text-white" />}
                variant="elegant"
                backgroundStyle="pattern"
                gradientFrom="from-blue-700"
                gradientTo="to-blue-800"
                className="mb-8 shadow-blue-900/20"
            />

            {/* Stats Section */}
            {/* Stats Section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {userStats.map((stat, index) => (
                    <Card key={index} className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="px-3 py-2 flex items-center justify-between">
                            <div className="flex flex-col gap-0.5">
                                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                                    {stat.title}
                                </p>
                                <p className="text-[9px] text-slate-400 truncate max-w-[120px]">
                                    {stat.description}
                                </p>
                            </div>
                            <span className="text-xl font-bold text-slate-900">
                                {stat.value}
                            </span>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Actions Toolbar */}
            <div className="flex items-center justify-end gap-3 mb-4">
                <Button
                    variant="outline"
                    className="hidden sm:flex"
                    onClick={() => fetchUsers()}
                >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh List
                </Button>
                <AddUserDialog onUserAdded={fetchUsers} />
            </div>

            {/* Table Section */}
            <UserTable
                users={users}
                loading={loading}
                onDelete={handleDelete}
            />
        </div>
    );
}
