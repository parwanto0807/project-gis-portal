'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
    Users, 
    Search, 
    ChevronRight, 
    Building2, 
    UserCheck,
    Calendar,
    Filter,
    ChevronDown,
    ChevronUp,
    UserMinus,
    ArrowLeft,
    ArrowRight,
    Users2,
    Briefcase,
    RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const SummaryCard = ({ title, value, icon: Icon, colorClass, delay = 0 }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
    >
        <Card className="bg-white shadow-sm border border-slate-200">
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{title}</p>
                    <Icon className={`w-4 h-4 ${colorClass.split(' ')[1] || 'text-slate-400'}`} />
                </div>
                <h4 className={`text-2xl font-bold ${colorClass.split(' ')[1]?.replace('500', '600') || 'text-slate-900'}`}>{value.toLocaleString()}</h4>
            </CardContent>
        </Card>
    </motion.div>
);

const DeptMiniCard = ({ name, count }: any) => (
    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-white hover:shadow-sm transition-all group">
        <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:bg-slate-900 group-hover:border-slate-900 transition-colors">
                <Briefcase className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
            </div>
            <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-tight truncate max-w-[100px]">{name}</span>
        </div>
        <span className="font-bold text-slate-900 text-xs">{count}</span>
    </div>
);

export default function EmployeesMasterPage() {
    const [employees, setEmployees] = useState<any[]>([]);
    const [stats, setStats] = useState<any>({ total: 0, active: 0, inactive: 0 });
    const [deptStats, setDeptStats] = useState<any[]>([]);
    const [pagination, setPagination] = useState<any>({ totalPages: 1, currentPage: 1, totalItems: 0 });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [showInsights, setShowInsights] = useState(false);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const res = await api.get('/discipline-reports/employees/master', {
                params: { search, status: statusFilter, page, limit: 10 }
            });
            if (res.data.success) {
                setEmployees(res.data.data);
                setStats(res.data.stats);
                setDeptStats(res.data.deptStats);
                setPagination(res.data.pagination);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to load employee master data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchEmployees();
        }, 300);
        return () => clearTimeout(timer);
    }, [search, statusFilter, page]);

    // Reset page when filtering
    const handleSearch = (val: string) => {
        setSearch(val);
        setPage(1);
    };

    const handleStatusFilter = (val: string) => {
        setStatusFilter(val);
        setPage(1);
    };

    return (
        <div className="flex flex-col space-y-5 sm:space-y-6 pb-20 -mx-3 sm:mx-0 -mt-2 sm:mt-0">
            {/* Mobile Native App Bar */}
            <div className="sm:hidden flex items-center justify-between bg-zinc-50 border-b border-slate-200/60 pb-3 mt-1 mb-2 px-1 sticky top-0 z-50">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">Employees</h1>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] mt-1.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Master Directory
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={fetchEmployees}
                        className="rounded-full bg-white border border-slate-200 shadow-sm h-9 w-9 active:scale-95 transition-all text-slate-600 outline-none"
                    >
                        <RefreshCw className={loading ? "animate-spin w-4 h-4 text-indigo-500" : "w-4 h-4"} />
                    </Button>
                </div>
            </div>

            {/* Desktop Header Area */}
            <div className="hidden sm:flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1.5">
                    <Badge variant="secondary" className="w-fit px-2.5 py-0.5 bg-slate-100 hover:bg-slate-100 border-slate-200">
                        <Breadcrumb>
                            <BreadcrumbList className="text-[10px] md:text-xs">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/admin/dashboard" className="text-slate-500 hover:text-slate-900">Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/admin/hr" className="text-slate-500 hover:text-slate-900">HR</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-slate-900 font-semibold">Employees</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </Badge>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                            <Users className="w-5 h-5 text-indigo-600" />
                            Employee Master
                        </h1>
                        <p className="text-xs text-slate-500">Personnel Directory from HRM System.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={fetchEmployees} 
                        className="h-8 w-8 text-slate-600"
                    >
                        <RefreshCw className={loading ? "animate-spin w-3.5 h-3.5" : "w-3.5 h-3.5"} />
                    </Button>
                </div>
            </div>

            {/* Insights Section - Accordion */}
            <div className="space-y-4">
                <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowInsights(!showInsights)}
                    className="group flex items-center gap-2 hover:bg-slate-100 rounded-md px-3 h-8 border border-slate-200 transition-all font-semibold text-xs text-slate-500 hover:text-slate-900 w-full md:w-auto bg-white shadow-sm"
                >
                    <Filter className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                    {showInsights ? 'Hide Insights' : 'Show Insights'}
                    {showInsights ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </Button>

                <AnimatePresence>
                    {showInsights && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-6 pb-6">
                                {/* Global Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <SummaryCard 
                                        title="Total Personnel" 
                                        value={stats.total} 
                                        icon={Users2} 
                                        colorClass="bg-indigo-50 text-indigo-500" 
                                        delay={0.1}
                                    />
                                    <SummaryCard 
                                        title="Active Employees" 
                                        value={stats.active} 
                                        icon={UserCheck} 
                                        colorClass="bg-emerald-50 text-emerald-500" 
                                        delay={0.2}
                                    />
                                    <SummaryCard 
                                        title="Terminated / Exit" 
                                        value={stats.inactive} 
                                        icon={UserMinus} 
                                        colorClass="bg-rose-50 text-rose-500" 
                                        delay={0.3}
                                    />
                                </div>

                                {/* Department Breakdown */}
                                <Card className="bg-white shadow-sm border border-slate-200">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Building2 className="w-4 h-4 text-slate-400" />
                                            <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-500">Total Per Department (Active Only)</h4>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                            {deptStats.map((dept) => (
                                                <DeptMiniCard key={dept.name} name={dept.name} count={dept.count} />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between pb-2">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <Input 
                        placeholder="Search by name, nik, or id..." 
                        className="pl-8 h-8 text-xs bg-slate-50 border-slate-200 w-full"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 flex bg-slate-50 p-0.5 rounded-lg border border-slate-200 scrollbar-hide">
                    <Button 
                        variant={statusFilter === '' ? 'default' : 'ghost'} 
                        onClick={() => handleStatusFilter('')}
                        className={`rounded-md h-7 px-3 font-semibold text-[10px] uppercase tracking-wider ${statusFilter === '' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        All
                    </Button>
                    <Button 
                        variant={statusFilter === 'AKTIF' ? 'default' : 'ghost'} 
                        onClick={() => handleStatusFilter('AKTIF')}
                        className={`rounded-md h-7 px-3 font-semibold text-[10px] uppercase tracking-wider ${statusFilter === 'AKTIF' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Active
                    </Button>
                    <Button 
                        variant={statusFilter === 'TIDAK_AKTIF' ? 'default' : 'ghost'} 
                        onClick={() => handleStatusFilter('TIDAK_AKTIF')}
                        className={`rounded-md h-7 px-3 font-semibold text-[10px] uppercase tracking-wider ${statusFilter === 'TIDAK_AKTIF' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Inactive
                    </Button>
                </div>
            </div>

            {/* Desktop Table View */}
            <Card className="hidden lg:block bg-white shadow-sm border border-slate-200">
                <CardContent className="p-0">
                    <div className="overflow-x-auto min-h-[400px]">
                        <Table>
                            <TableHeader className="bg-slate-50 border-b border-slate-200">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[120px] font-semibold text-slate-500 text-xs h-9 py-2 pl-4">Emp ID</TableHead>
                                    <TableHead className="w-[250px] font-semibold text-slate-500 text-xs h-9 py-2">Personnel Details</TableHead>
                                    <TableHead className="font-semibold text-slate-500 text-xs h-9 py-2">Organization</TableHead>
                                    <TableHead className="w-[150px] font-semibold text-slate-500 text-xs h-9 py-2">Join Date</TableHead>
                                    <TableHead className="w-[120px] font-semibold text-slate-500 text-xs h-9 py-2">Status</TableHead>
                                    <TableHead className="text-right font-semibold text-slate-500 text-xs h-9 py-2 pr-4">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    Array(10).fill(0).map((_, i) => (
                                        <TableRow key={i} className="animate-pulse">
                                            {Array(6).fill(0).map((_, j) => (
                                                <TableCell key={j} className="py-2">
                                                    <div className="h-4 bg-slate-100 rounded w-full opacity-40" />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : employees.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-64 text-center">
                                            <div className="flex flex-col items-center gap-2 text-slate-400">
                                                <Users className="w-8 h-8 opacity-20" />
                                                <p className="font-semibold uppercase tracking-wider text-[10px]">No personnel found</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    employees.map((employee) => (
                                        <TableRow key={employee.EMPL_ID} className="group hover:bg-slate-50/50 transition-colors">
                                            <TableCell className="pl-4 py-2">
                                                <span className="font-medium text-slate-600 text-xs">{employee.EMPL_ID}</span>
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-900 text-xs">{employee.NAMA}</span>
                                                    <span className="text-[10px] text-slate-500">{employee.NIK}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="flex items-center gap-1.5">
                                                        <Building2 className="w-3 h-3 text-slate-400" />
                                                        <span className="font-medium text-slate-700 text-[11px] lowercase first-letter:uppercase">{employee.mstdept?.CNM_DEPT || "Unknown Dept"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <UserCheck className="w-3 h-3 text-slate-300" />
                                                        <span className="font-medium text-slate-500 text-[10px] uppercase">{employee.mstjab?.CNM_JAB || "-"}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <div className="flex items-center gap-1.5 text-slate-600">
                                                    <Calendar className="w-3 h-3 text-slate-400" />
                                                    <span className="text-xs font-medium">
                                                        {employee.TGL_MSK ? format(new Date(employee.TGL_MSK), 'MMM dd, yyyy') : "-"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <Badge variant="outline" className={`
                                                    ${employee.KD_STS === 'AKTIF' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'} 
                                                    font-semibold uppercase text-[9px] px-1.5 py-0 border
                                                `}>
                                                    {employee.KD_STS === 'AKTIF' ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-4 py-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="w-7 h-7 p-0 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex flex-col md:flex-row items-center justify-between p-4 border-t border-slate-200 gap-4">
                        <div className="space-y-0.5">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                                Total Result: <span className="text-slate-900">{pagination.totalItems} Personnel</span>
                            </p>
                            <p className="text-[9px] text-slate-400">Page {page} of {pagination.totalPages}</p>
                        </div>
                        
                        <div className="flex items-center gap-1 bg-slate-50 p-0.5 rounded-lg border border-slate-200">
                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={page === 1 || loading}
                                onClick={() => setPage(p => p - 1)}
                                className="rounded-md h-7 w-7 p-0 disabled:opacity-20 hover:bg-white hover:shadow-sm transition-all text-slate-500"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                            </Button>
                            
                            <div className="flex items-center">
                                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                    let pageNum = page <= 3 ? i + 1 : page - 2 + i;
                                    if (pageNum > pagination.totalPages) return null;
                                    
                                    return (
                                        <Button
                                            key={i}
                                            variant={page === pageNum ? 'default' : 'ghost'}
                                            size="sm"
                                            onClick={() => setPage(pageNum)}
                                            className={`rounded-md h-7 w-7 font-semibold text-[10px] min-w-[28px] p-0 ${page === pageNum ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:bg-white hover:text-slate-700'}`}
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                })}
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={page === pagination.totalPages || loading}
                                onClick={() => setPage(p => p + 1)}
                                className="rounded-md h-7 w-7 p-0 disabled:opacity-20 hover:bg-white hover:shadow-sm transition-all text-slate-500"
                            >
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Mobile Cards View */}
            <div className="lg:hidden flex flex-col gap-3 pb-8">
                {loading ? (
                    Array(5).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse bg-white p-4 rounded-[1.5rem] h-28 border border-slate-100/60 shadow-sm" />
                    ))
                ) : employees.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-slate-300">
                        <Users className="w-12 h-12 mb-3 opacity-20" />
                        <p className="font-black uppercase tracking-widest text-[10px]">No personnel found</p>
                    </div>
                ) : (
                    employees.map((employee) => (
                        <div key={employee.EMPL_ID} className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 active:scale-[0.98] transition-all flex flex-col gap-2">
                            {/* Card Header: Avatar & Name */}
                            <div className="flex justify-between items-start gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-semibold text-xs text-slate-700 uppercase border border-slate-200 shrink-0">
                                        {employee.NAMA.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="font-semibold text-slate-900 text-xs leading-tight line-clamp-1">{employee.NAMA}</h4>
                                        <span className="text-[9px] text-slate-500 mt-0.5">
                                            {employee.NIK} • {employee.EMPL_ID}
                                        </span>
                                    </div>
                                </div>
                                <Badge className={`
                                    ${employee.KD_STS === 'AKTIF' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'} 
                                    font-semibold uppercase text-[9px] px-1.5 py-0 border shadow-sm shrink-0
                                `}>
                                    {employee.KD_STS === 'AKTIF' ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                            
                            {/* Roles & Dept */}
                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 flex flex-col gap-1.5">
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                                    <span className="font-medium text-slate-600 text-[10px] truncate">{employee.mstdept?.CNM_DEPT || "Unknown Dept"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <UserCheck className="w-3 h-3 text-slate-300 shrink-0" />
                                    <span className="font-medium text-slate-500 text-[10px] uppercase truncate">{employee.mstjab?.CNM_JAB || "-"}</span>
                                </div>
                            </div>
                            
                            {/* Footer: Date & Arrow */}
                            <div className="flex justify-between items-center text-[9px] text-slate-500 pt-1 border-t border-slate-100">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-2.5 h-2.5" />
                                    <span className="uppercase tracking-wider">
                                        Joined: {employee.TGL_MSK ? format(new Date(employee.TGL_MSK), 'MMM dd, yy') : "-"}
                                    </span>
                                </div>
                                <ChevronRight className="w-3 h-3 text-slate-400" />
                            </div>
                        </div>
                    ))
                )}
                
                {/* Mobile Pagination */}
                {!loading && employees.length > 0 && (
                    <div className="flex items-center justify-between mt-2 px-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Page {page} of {pagination.totalPages}
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1 || loading}
                                onClick={() => setPage(p => p - 1)}
                                className="h-8 w-8 p-0 rounded-full bg-white border-slate-200"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === pagination.totalPages || loading}
                                onClick={() => setPage(p => p + 1)}
                                className="h-8 w-8 p-0 rounded-full bg-white border-slate-200"
                            >
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
