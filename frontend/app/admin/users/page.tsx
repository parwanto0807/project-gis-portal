'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import AddUserDialog from '@/components/users/AddUserDialog';
import UserTable from '@/components/users/UserTable';
import { Users, RefreshCw, Search, ShieldAlert, Eye, Clock, XCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function UserManagementPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const limit = 10;
    const router = useRouter();

    // Login attempts state
    const [attempts, setAttempts] = useState<any[]>([]);
    const [attemptsLoading, setAttemptsLoading] = useState(false);
    const [attemptsPage, setAttemptsPage] = useState(1);
    const [attemptsTotal, setAttemptsTotal] = useState(0);
    const [attemptFilter, setAttemptFilter] = useState<'all' | 'failed' | 'success'>('all');
    const attemptsLimit = 50;

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

    const fetchLoginAttempts = async () => {
        setAttemptsLoading(true);
        try {
            const query = new URLSearchParams({
                limit: String(attemptsLimit),
                skip: String((attemptsPage - 1) * attemptsLimit),
                ...(attemptFilter !== 'all' ? { success: String(attemptFilter === 'success') } : {})
            }).toString();

            const res = await api.get(`/auth/login-attempts?${query}`);
            if (res.data.success) {
                setAttempts(res.data.data);
                setAttemptsTotal(res.data.meta?.total || 0);
            }
        } catch (error: any) {
            console.error('Failed to fetch login attempts', error);
            if (error.response?.status === 403) {
                toast.error('Anda tidak memiliki izin untuk melihat login attempts');
            }
        } finally {
            setAttemptsLoading(false);
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

            <Tabs defaultValue="users" className="w-full">
                <TabsList className="mb-4 bg-slate-100 dark:bg-slate-900/50 p-1 rounded-xl">
                    <TabsTrigger value="users" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm">
                        <Users className="h-4 w-4 mr-1.5" /> Users
                    </TabsTrigger>
                    <TabsTrigger value="attempts" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm">
                        <ShieldAlert className="h-4 w-4 mr-1.5" /> Login Attempts
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="users" className="space-y-4">
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
                </TabsContent>

                <TabsContent value="attempts" className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                variant={attemptFilter === 'all' ? 'default' : 'outline'}
                                onClick={() => { setAttemptFilter('all'); setAttemptsPage(1); fetchLoginAttempts(); }}
                                className="h-8 text-xs rounded-lg"
                            >
                                All
                            </Button>
                            <Button
                                size="sm"
                                variant={attemptFilter === 'failed' ? 'default' : 'outline'}
                                onClick={() => { setAttemptFilter('failed'); setAttemptsPage(1); fetchLoginAttempts(); }}
                                className="h-8 text-xs rounded-lg"
                            >
                                Failed
                            </Button>
                            <Button
                                size="sm"
                                variant={attemptFilter === 'success' ? 'default' : 'outline'}
                                onClick={() => { setAttemptFilter('success'); setAttemptsPage(1); fetchLoginAttempts(); }}
                                className="h-8 text-xs rounded-lg"
                            >
                                Success
                            </Button>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs"
                            onClick={fetchLoginAttempts}
                        >
                            <RefreshCw className="mr-1.5 h-3 w-3" />
                            Refresh
                        </Button>
                    </div>

                    <Card className="bg-white dark:bg-slate-950 shadow-md border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table className="w-full">
                                    <TableHeader className="bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead className="font-bold text-slate-600 text-xs h-10 py-2 pl-5">Identifier</TableHead>
                                            <TableHead className="font-bold text-slate-600 text-xs h-10 py-2">User</TableHead>
                                            <TableHead className="font-bold text-slate-600 text-xs h-10 py-2">Status</TableHead>
                                            <TableHead className="font-bold text-slate-600 text-xs h-10 py-2">Reason</TableHead>
                                            <TableHead className="font-bold text-slate-600 text-xs h-10 py-2 pr-5">Waktu</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {attemptsLoading ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-12 text-slate-400 font-medium text-sm">
                                                    Memuat data...
                                                </TableCell>
                                            </TableRow>
                                        ) : attempts.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-12 text-slate-400 font-medium text-sm">
                                                    Belum ada data login attempts.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            attempts.map((item: any) => (
                                                <TableRow key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                                    <TableCell className="py-3 pl-5 text-xs font-semibold text-slate-700">
                                                        {item.identifier}
                                                    </TableCell>
                                                    <TableCell className="py-3 text-xs text-slate-600">
                                                        {item.user ? `${item.user.firstName || ''} ${item.user.lastName || ''}`.trim() || item.user.username || '-' : '-'}
                                                    </TableCell>
                                                    <TableCell className="py-3">
                                                        {item.success ? (
                                                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none text-[10px]">Success</Badge>
                                                        ) : (
                                                            <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-none text-[10px]">Gagal</Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="py-3 text-xs text-slate-500">
                                                        {item.reason || '-'}
                                                    </TableCell>
                                                    <TableCell className="py-3 pr-5 text-xs text-slate-400">
                                                        {item.createdAt ? new Date(item.createdAt).toLocaleString('id-ID') : '-'}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    {attemptsTotal > attemptsLimit && (
                        <div className="flex items-center justify-between px-2">
                            <p className="text-xs text-slate-500">
                                Showing {attempts.length} of {attemptsTotal} records
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 text-xs"
                                    onClick={() => setAttemptsPage(p => Math.max(1, p - 1))}
                                    disabled={attemptsPage === 1}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 text-xs"
                                    onClick={() => setAttemptsPage(p => p + 1)}
                                    disabled={attempts.length < attemptsLimit}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
