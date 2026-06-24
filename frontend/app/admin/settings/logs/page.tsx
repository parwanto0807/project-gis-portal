'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { Search, History } from 'lucide-react';
import { Input } from '@/components/ui/input';
import api from '@/lib/axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function UserLogsPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [moduleFilter, setModuleFilter] = useState('ALL');

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const query = moduleFilter !== 'ALL' ? `?module=${moduleFilter}` : '';
            const res = await api.get(`/user-logs${query}`);
            if (res.data.success) {
                setLogs(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch user logs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [moduleFilter]);

    const getActionColor = (action: string) => {
        switch (action) {
            case 'CREATE': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-400 border-emerald-200';
            case 'UPDATE': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400 border-blue-200';
            case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400 border-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200';
        }
    };

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              log.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              log.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-0">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <History className="w-6 h-6 text-indigo-500" />
                    User Audit Logs
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Monitor seluruh aktivitas penambahan, perubahan, dan penghapusan data oleh pengguna.
                </p>
            </div>

            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            Aktivitas Terbaru
                        </CardTitle>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Cari nama atau aktivitas..."
                                    className="pl-9 h-9 text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={moduleFilter} onValueChange={setModuleFilter}>
                                <SelectTrigger className="w-[140px] h-9 text-sm">
                                    <SelectValue placeholder="Modul" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Semua Modul</SelectItem>
                                    <SelectItem value="TEMUAN_PEDULI">Temuan Peduli</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                                    <TableHead className="w-[180px] font-semibold text-slate-700 dark:text-slate-300">Waktu</TableHead>
                                    <TableHead className="w-[200px] font-semibold text-slate-700 dark:text-slate-300">Pengguna</TableHead>
                                    <TableHead className="w-[120px] font-semibold text-slate-700 dark:text-slate-300">Aksi</TableHead>
                                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Modul</TableHead>
                                    <TableHead className="min-w-[300px] font-semibold text-slate-700 dark:text-slate-300">Deskripsi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center">
                                            <div className="flex justify-center items-center h-full">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredLogs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                                            Tidak ada log aktivitas ditemukan.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredLogs.map((log) => (
                                        <TableRow key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30">
                                            <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                                                {format(new Date(log.createdAt), "dd MMM yyyy, HH:mm", { locale: idLocale })}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium text-slate-900 dark:text-slate-200">
                                                    {log.user?.firstName} {log.user?.lastName || ''}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {log.user?.email || log.user?.username}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={`text-[10px] font-bold ${getActionColor(log.action)}`}>
                                                    {log.action}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                                                    {log.module}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-sm text-slate-700 dark:text-slate-300">
                                                {log.description}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
