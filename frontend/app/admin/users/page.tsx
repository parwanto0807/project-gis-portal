'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import AddUserDialog from '@/components/users/AddUserDialog';
import UserTable from '@/components/users/UserTable';
import { Users, RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";

export default function UserManagementPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const limit = 10;
    const router = useRouter();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                page: String(page),
                limit: String(limit),
                ...(searchQuery && { search: searchQuery })
            }).toString();
            
            const res = await api.get(`/users?${query}`);
            if (res.data.success) {
                setUsers(res.data.data);
                if (res.data.meta) {
                    setTotalPages(res.data.meta.totalPages || 1);
                }
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
            const res = await api.delete(`/users/${id}`);
            if (res.data.success) {
                toast.success('User deleted successfully');
                fetchUsers();
            } else {
                toast.error(res.data.message || 'Failed to delete user');
            }
        } catch (error: any) {
            console.error('Failed to delete user', error);
            toast.error(error.response?.data?.message || 'Failed to delete user');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

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
        <div className="space-y-6">
            {/* Simple Header with Breadcrumb */}
            <div className="flex flex-col gap-1.5 mb-4">
                <Badge variant="secondary" className="w-fit px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-800">
                    <Breadcrumb>
                        <BreadcrumbList className="text-[10px] md:text-xs">
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/admin/dashboard" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-50">
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="scale-75" />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/admin/settings" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-50">
                                    Settings
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="scale-75" />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="font-semibold text-slate-900 dark:text-slate-50">User Management</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </Badge>
                
                <div className="mt-1">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-2">
                        <Users className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                        User Management
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Manage employee access, roles, and platform permissions.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {userStats.map((stat, index) => (
                    <Card key={index} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm rounded-lg">
                        <CardContent className="p-3 flex items-center justify-between">
                            <div className="flex flex-col">
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                    {stat.title}
                                </p>
                                <span className="text-xl font-bold text-slate-900 dark:text-slate-50 mt-0.5">
                                    {stat.value}
                                </span>
                            </div>
                            <div className="text-right flex flex-col justify-end">
                                <p className="text-[10px] text-slate-400 max-w-[90px] leading-tight">
                                    {stat.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Actions Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search by name, email..."
                        className="pl-9 h-9 text-xs w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setPage(1);
                                fetchUsers();
                            }
                        }}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden sm:flex h-9 text-xs"
                        onClick={() => fetchUsers()}
                    >
                        <RefreshCw className="mr-1.5 h-3 w-3" />
                        Refresh
                    </Button>
                    <AddUserDialog onUserAdded={fetchUsers} />
                </div>
            </div>

            {/* Table Section */}
            <UserTable
                users={users}
                loading={loading}
                onDelete={handleDelete}
                onRefresh={fetchUsers}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-2">
                    <p className="text-xs text-slate-500">
                        Showing page {page} of {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs"
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
