'use client';

import { useState, useEffect, useMemo } from 'react';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
    AlertCircle, CheckCircle2, Clock, Activity, FileSearch,
    TrendingUp, CalendarDays, ArrowRight, Building, MapPin, Target, Flame, AlertTriangle
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';
import {
    Temuan, getTotalTemuan, getOpenTemuan, getCompletionRate, getAverageAging,
    getTrendData, getKategori4MData, getGedungData, getAreaData,
    getStatusData, getTopReporterData, getAgingData, getCriticalFindings
} from '@/lib/dashboard/temuanAnalytics';

const COLORS = {
    status: {
        'Open': '#EF4444',
        'In Progress': '#F59E0B',
        'Closed': '#10B981'
    },
    kategori: {
        'Man': '#3B82F6',
        'Material': '#8B5CF6',
        'Method': '#F97316',
        'Machine': '#14B8A6'
    }
};

const KPICard = ({ title, value, subtext, icon: Icon, colorClass, bgClass }: any) => (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-950 p-4 shadow-sm flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-3">
            <div className={`rounded-lg p-2 ${bgClass}`}>
                <Icon className={`h-5 w-5 ${colorClass}`} />
            </div>
        </div>
        <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{value}</h3>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{title}</p>
            {subtext && <p className="text-[10px] text-gray-500 dark:text-gray-500 mt-0.5">{subtext}</p>}
        </div>
    </div>
);

export default function AdminDashboard() {
    const [data, setData] = useState<Temuan[]>([]);
    const [loading, setLoading] = useState(true);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const user = useAuthStore((state) => state.user);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get('/temuan-peduli');
            setData(res.data?.data || []);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Aggregations using useMemo to prevent recalculation on every render
    const kpi = useMemo(() => ({
        total: getTotalTemuan(data),
        open: getOpenTemuan(data),
        completionRate: getCompletionRate(data),
        avgAging: getAverageAging(data)
    }), [data]);

    const trendData = useMemo(() => getTrendData(data), [data]);
    const kategoriData = useMemo(() => getKategori4MData(data), [data]);
    const gedungData = useMemo(() => getGedungData(data), [data]);
    const areaData = useMemo(() => getAreaData(data), [data]);
    const statusData = useMemo(() => getStatusData(data), [data]);
    const topReporters = useMemo(() => getTopReporterData(data), [data]);
    const agingData = useMemo(() => getAgingData(data), [data]);
    const criticalFindings = useMemo(() => getCriticalFindings(data), [data]);

    useEffect(() => {
        if (!loading && kpi.open.count > 0) {
            setIsWarningModalOpen(true);
        }
    }, [loading, kpi.open.count]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20 md:pb-0 w-full animate-in fade-in duration-500">
            
            <Dialog open={isWarningModalOpen} onOpenChange={setIsWarningModalOpen}>
                <DialogContent className="sm:max-w-md border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40">
                    <DialogHeader className="items-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 mb-3 animate-pulse">
                            <AlertTriangle className="h-7 w-7 text-red-600 dark:text-red-400" aria-hidden="true" />
                        </div>
                        <DialogTitle className="text-xl font-bold text-red-700 dark:text-red-400">Peringatan Tindak Lanjut!</DialogTitle>
                        <DialogDescription className="text-center text-red-600 dark:text-red-300 pt-2">
                            Terdapat <strong className="text-xl mx-1 font-black">{kpi.open.count} Temuan</strong> berstatus OPEN yang belum ditindaklanjuti.<br/>
                            {criticalFindings.length > 0 && <span className="inline-block mt-2 font-bold bg-white dark:bg-slate-900 px-3 py-1 rounded-full text-red-600 text-xs border border-red-200">(Termasuk {criticalFindings.length} temuan kritis {'>'} 14 hari)</span>}
                            <br/><br/>
                            <span className="text-xs text-red-500/80">Sistem memonitor aktivitas closing Anda. Harap segera melakukan closing temuan untuk menjaga performa dan komitmen di area Anda.</span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center mt-4">
                        <Button type="button" variant="destructive" onClick={() => setIsWarningModalOpen(false)} className="w-full font-bold bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30 text-xs sm:text-sm h-auto py-2.5 px-2 whitespace-normal text-center leading-tight">
                            SAYA MENGERTI & TINDAKLANJUTI
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl ring-2 ring-slate-100 dark:ring-slate-800 shadow-sm overflow-hidden shrink-0">
                        {user?.picture ? (
                            <img src={user.picture.startsWith('http') ? user.picture : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '').replace('/api', '') || 'http://localhost:5001'}/${user.picture.startsWith('/') ? user.picture.slice(1) : user.picture}`} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            (user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U').toUpperCase()
                        )}
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Selamat Datang, {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.username || 'User'}!
                        </h1>
                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            Analytics Dashboard & Operational Insights
                        </p>
                    </div>
                </div>
            </div>

            {/* Section A: KPI Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <KPICard
                    title="Total Temuan"
                    value={kpi.total}
                    subtext="All recorded findings"
                    icon={FileSearch}
                    colorClass="text-indigo-600"
                    bgClass="bg-indigo-50 dark:bg-indigo-900/30"
                />
                <KPICard
                    title="Open Findings"
                    value={kpi.open.count}
                    subtext={`${kpi.open.percentage}% Action Required`}
                    icon={AlertCircle}
                    colorClass="text-red-600"
                    bgClass="bg-red-50 dark:bg-red-900/30"
                />
                <KPICard
                    title="Completion Rate"
                    value={`${kpi.completionRate}%`}
                    subtext="Findings closed"
                    icon={CheckCircle2}
                    colorClass="text-emerald-600"
                    bgClass="bg-emerald-50 dark:bg-emerald-900/30"
                />
                <KPICard
                    title="Average Aging"
                    value={`${kpi.avgAging} Hari`}
                    subtext="Time to close/current age"
                    icon={Clock}
                    colorClass="text-orange-600"
                    bgClass="bg-orange-50 dark:bg-orange-900/30"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Section B: Trend Analysis */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-indigo-500" /> Trend Pelaporan Temuan</h2>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.2} />
                                <XAxis dataKey="date" tick={{fontSize: 12, fill: '#64748b'}} tickMargin={10} axisLine={false} tickLine={false} />
                                <YAxis tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} allowDecimals={false} />
                                <RechartsTooltip 
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} 
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="count" 
                                    name="Jumlah Temuan" 
                                    stroke="#4f46e5" 
                                    strokeWidth={3} 
                                    dot={{ r: 4, strokeWidth: 2, fill: '#ffffff', stroke: '#4f46e5' }} 
                                    activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5', stroke: '#c7d2fe' }} 
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Section C: Distribusi 4M */}
                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-purple-500" /> Distribusi Kategori 4M</h2>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={kategoriData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {kategoriData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={(COLORS.kategori as any)[entry.name] || '#94A3B8'} />
                                    ))}
                                </Pie>
                                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Section D: Temuan per Gedung */}
                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><Building className="w-4 h-4 text-blue-500" /> Temuan per Gedung</h2>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={gedungData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} barSize={40}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.2} />
                                <XAxis dataKey="gedung" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                                <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{fill: '#f1f5f9'}} />
                                <Bar dataKey="total" name="Total Temuan" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Section E: Area Hotspot */}
                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-rose-500" /> Top 10 Area Hotspot</h2>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={areaData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }} barSize={15}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#94a3b8" strokeOpacity={0.2} />
                                <XAxis type="number" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                                <YAxis dataKey="area" type="category" tick={{fontSize: 10}} axisLine={false} tickLine={false} width={100} />
                                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{fill: '#f1f5f9'}} />
                                <Bar dataKey="total" name="Total Temuan" fill="#F43F5E" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Section F: Status Distribution */}
                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-500" /> Status Distribution</h2>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={0}
                                    outerRadius={80}
                                    dataKey="value"
                                    stroke="white"
                                    strokeWidth={2}
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={(COLORS.status as any)[entry.name] || '#94A3B8'} />
                                    ))}
                                </Pie>
                                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Section H: Aging Analysis */}
                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-orange-500" /> Aging Analysis</h2>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={agingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} barSize={40}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.2} />
                                <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                                <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{fill: '#f1f5f9'}} />
                                <Bar dataKey="value" name="Total">
                                    {agingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Section G: Top Reporter */}
                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
                    <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-sky-500" /> Top Reporters</h2>
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-[11px] text-left">
                            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50 dark:bg-slate-900">
                                <tr>
                                    <th className="px-3 py-2 rounded-l-lg">Rank</th>
                                    <th className="px-3 py-2">Nama</th>
                                    <th className="px-3 py-2 rounded-r-lg text-center">Jumlah</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topReporters.map((reporter, idx) => (
                                    <tr key={idx} className="border-b border-gray-50 dark:border-slate-800/50 hover:bg-gray-50/50 dark:hover:bg-slate-900/50 transition-colors">
                                        <td className="px-3 py-2 font-semibold text-slate-700 dark:text-slate-400">#{idx + 1}</td>
                                        <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-200">{reporter.name}</td>
                                        <td className="px-3 py-2 text-center">
                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400 font-bold text-[10px]">
                                                {reporter.total}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {topReporters.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-8 text-center text-gray-400">Belum ada data pelapor.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Section I: Critical Findings */}
            <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm w-full overflow-hidden flex flex-col">
                <div className="flex justify-between items-start mb-3 gap-2">
                    <h2 className="text-sm font-bold flex items-center gap-2 text-rose-600 leading-tight">
                        <Flame className="w-4 h-4 shrink-0" /> Prioritas Kritis ({'>'} 14 Hari)
                    </h2>
                    <Link href="/admin/audit/temuan" className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 shrink-0 mt-0.5">
                        Lihat Semua <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
                <div className="w-full overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0">
                    <table className="w-full text-[11px] text-left min-w-[500px]">
                        <thead className="text-[10px] text-gray-500 uppercase bg-gray-50 dark:bg-slate-900">
                            <tr>
                                <th className="px-3 py-2 rounded-l-lg whitespace-nowrap">ID</th>
                                <th className="px-3 py-2 whitespace-nowrap">Temuan</th>
                                <th className="px-3 py-2 whitespace-nowrap">Area / Gedung</th>
                                <th className="px-3 py-2 whitespace-nowrap">Aging</th>
                                <th className="px-3 py-2 rounded-r-lg whitespace-nowrap">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {criticalFindings.map((item, idx) => (
                                <tr key={item.id} className="border-b border-gray-50 dark:border-slate-800/50 hover:bg-gray-50/50 dark:hover:bg-slate-900/50">
                                    <td className="px-3 py-2 text-gray-500 whitespace-nowrap">#{item.id}</td>
                                    <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-200 max-w-[120px] sm:max-w-[200px] md:max-w-xs truncate" title={item.temuan}>{item.temuan}</td>
                                    <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{item.area} <br/><span className="text-[9px] text-gray-400">{item.gedung}</span></td>
                                    <td className="px-3 py-2 font-bold text-rose-600">{item.aging} Hari</td>
                                    <td className="px-3 py-2">
                                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${item.status === 'OPEN' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {criticalFindings.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400">Tidak ada temuan kritis saat ini.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
