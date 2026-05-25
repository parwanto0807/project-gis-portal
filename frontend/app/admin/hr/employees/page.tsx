'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import HeaderCard from '@/components/ui/header-card';
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
        <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2rem] bg-white/80 backdrop-blur-md overflow-hidden group hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</p>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value.toLocaleString()}</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass} shadow-inner group-hover:rotate-12 transition-transform`}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

const DeptMiniCard = ({ name, count }: any) => (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:bg-slate-900 group-hover:border-slate-900 transition-colors">
                <Briefcase className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </div>
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight truncate max-w-[120px]">{name}</span>
        </div>
        <span className="font-black text-slate-900 text-xs">{count}</span>
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
            <div className="hidden sm:block">
                <HeaderCard 
                    title="Employee Master"
                    description="Personnel Directory from HRM System"
                    icon={<Users className="w-6 h-6 text-white" />}
                />
            </div>

            {/* Insights Section - Accordion */}
            <div className="space-y-4">
                <Button 
                    variant="ghost" 
                    onClick={() => setShowInsights(!showInsights)}
                    className="group flex items-center gap-2 hover:bg-white rounded-2xl px-4 py-6 shadow-sm border border-slate-100 transition-all font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 w-full md:w-auto"
                >
                    <Filter className="w-4 h-4 text-slate-300 group-hover:text-slate-900" />
                    {showInsights ? 'Hide Insights' : 'Show Insights'}
                    {showInsights ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
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
                                <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white/60 backdrop-blur-md">
                                    <CardContent className="p-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Building2 className="w-5 h-5 text-slate-400" />
                                            <h4 className="font-black text-xs uppercase tracking-widest text-slate-500">Total Per Department (Active Only)</h4>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-2">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                    <Input 
                        placeholder="Search by name, nik, or id..." 
                        className="pl-11 h-12 bg-white border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-slate-950 transition-all font-medium border-none"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                <div className="w-full md:w-auto overflow-x-auto pb-1 -mb-1 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div className="flex items-center w-max gap-1.5 bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
                        <Button 
                            variant={statusFilter === '' ? 'default' : 'ghost'} 
                            onClick={() => handleStatusFilter('')}
                            className="rounded-xl h-10 px-6 font-bold text-[10px] uppercase tracking-widest"
                        >
                            All
                        </Button>
                        <Button 
                            variant={statusFilter === 'AKTIF' ? 'default' : 'ghost'} 
                            onClick={() => handleStatusFilter('AKTIF')}
                            className="rounded-xl h-10 px-6 font-bold text-[10px] uppercase tracking-widest"
                        >
                            Active
                        </Button>
                        <Button 
                            variant={statusFilter === 'TIDAK_AKTIF' ? 'default' : 'ghost'} 
                            onClick={() => handleStatusFilter('TIDAK_AKTIF')}
                            className="rounded-xl h-10 px-6 font-bold text-[10px] uppercase tracking-widest"
                        >
                            Inactive
                        </Button>
                    </div>
                </div>
            </div>

            {/* Desktop Table View */}
            <Card className="hidden lg:block border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white/70 backdrop-blur-xl border border-white/20">
                <CardContent className="p-0">
                    <div className="overflow-x-auto min-h-[500px]">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="hover:bg-transparent border-slate-100">
                                    <TableHead className="w-[120px] font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] h-16 pl-8">Emp ID</TableHead>
                                    <TableHead className="w-[250px] font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] h-16">Personnel Details</TableHead>
                                    <TableHead className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] h-16">Organization</TableHead>
                                    <TableHead className="w-[150px] font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] h-16">Join Date</TableHead>
                                    <TableHead className="w-[120px] font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] h-16">Status</TableHead>
                                    <TableHead className="text-right font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] h-16 pr-8">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    Array(10).fill(0).map((_, i) => (
                                        <TableRow key={i} className="animate-pulse border-slate-50">
                                            {Array(6).fill(0).map((_, j) => (
                                                <TableCell key={j} className="h-16">
                                                    <div className="h-4 bg-slate-100 rounded-full w-full opacity-40" />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : employees.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-64 text-center">
                                            <div className="flex flex-col items-center gap-3 text-slate-300">
                                                <Users className="w-12 h-12 opacity-20" />
                                                <p className="font-black uppercase tracking-widest text-xs">No personnel found</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    employees.map((employee) => (
                                        <TableRow key={employee.EMPL_ID} className="group hover:bg-slate-50/50 transition-all border-slate-50">
                                            <TableCell className="pl-8">
                                                <span className="font-black text-slate-900 text-xs tracking-widest">{employee.EMPL_ID}</span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-slate-900 uppercase tracking-tight text-sm">{employee.NAMA}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{employee.NIK}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                                        <span className="font-bold text-slate-600 text-xs lowercase first-letter:uppercase">{employee.mstdept?.CNM_DEPT || "Unknown Dept"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <UserCheck className="w-3.5 h-3.5 text-slate-300" />
                                                        <span className="font-bold text-slate-400 text-[10px] uppercase tracking-tighter">{employee.mstjab?.CNM_JAB || "-"}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <Calendar className="w-3.5 h-3.5 opacity-30" />
                                                    <span className="text-xs font-bold leading-none">
                                                        {employee.TGL_MSK ? format(new Date(employee.TGL_MSK), 'MMM dd, yyyy') : "-"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={`
                                                    ${employee.KD_STS === 'AKTIF' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm' : 'bg-rose-50 text-rose-600 border-rose-100'} 
                                                    font-black uppercase tracking-[0.15em] text-[8px] px-2.5 py-0.5 border w-fit
                                                `}>
                                                    {employee.KD_STS === 'AKTIF' ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-8">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="w-8 h-8 p-0 rounded-full hover:bg-slate-900 hover:text-white transition-all group-hover:scale-110 active:scale-95"
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
                    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-50/50 border-t border-slate-100 gap-4">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Total Result: <span className="text-slate-900">{pagination.totalItems} Personnel</span>
                            </p>
                            <p className="text-[9px] font-bold text-slate-300 italic">Page {page} of {pagination.totalPages}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={page === 1 || loading}
                                onClick={() => setPage(p => p - 1)}
                                className="rounded-xl h-9 w-9 p-0 disabled:opacity-20 translate-all"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                            
                            <div className="flex items-center">
                                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                    // Logic for page window
                                    let pageNum = page <= 3 ? i + 1 : page - 2 + i;
                                    if (pageNum > pagination.totalPages) return null;
                                    
                                    return (
                                        <Button
                                            key={i}
                                            variant={page === pageNum ? 'default' : 'ghost'}
                                            size="sm"
                                            onClick={() => setPage(pageNum)}
                                            className="rounded-xl h-9 w-9 font-black text-xs min-w-[36px]"
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
                                className="rounded-xl h-9 w-9 p-0 disabled:opacity-20"
                            >
                                <ArrowRight className="w-4 h-4" />
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
                        <div key={employee.EMPL_ID} className="bg-white rounded-[1.5rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 active:scale-[0.98] transition-all flex flex-col gap-3">
                            {/* Card Header: Avatar & Name */}
                            <div className="flex justify-between items-start gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center font-black text-sm text-indigo-600 uppercase border border-indigo-100 shrink-0">
                                        {employee.NAMA.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="font-bold text-slate-900 text-sm leading-tight line-clamp-1">{employee.NAMA}</h4>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                                            {employee.NIK} • {employee.EMPL_ID}
                                        </span>
                                    </div>
                                </div>
                                <Badge className={`
                                    ${employee.KD_STS === 'AKTIF' ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' : 'bg-rose-50 text-rose-600 border-rose-100/50'} 
                                    font-black uppercase tracking-widest text-[8px] px-2 py-0.5 border shadow-sm shrink-0 mt-1
                                `}>
                                    {employee.KD_STS === 'AKTIF' ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                            
                            {/* Roles & Dept */}
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/50 flex flex-col gap-2">
                                <div className="flex items-center gap-2.5">
                                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <span className="font-bold text-slate-600 text-[11px] truncate">{employee.mstdept?.CNM_DEPT || "Unknown Dept"}</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <UserCheck className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                                    <span className="font-bold text-slate-500 text-[10px] uppercase tracking-tighter truncate">{employee.mstjab?.CNM_JAB || "-"}</span>
                                </div>
                            </div>
                            
                            {/* Footer: Date & Arrow */}
                            <div className="flex justify-between items-center px-1 pt-1">
                                <div className="flex items-center gap-1.5 text-slate-400">
                                    <Calendar className="w-3.5 h-3.5 opacity-50" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                        Joined: {employee.TGL_MSK ? format(new Date(employee.TGL_MSK), 'MMM dd, yy') : "-"}
                                    </span>
                                </div>
                                <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center">
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                </div>
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
