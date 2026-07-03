'use client';

import { useState, useEffect, useMemo } from 'react';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
    AlertCircle, CheckCircle2, Clock, Activity, FileSearch,
    TrendingUp, CalendarDays, ArrowRight, Building, MapPin, Target, Flame, AlertTriangle,
    Lightbulb, DollarSign, Users, Award, BadgePercent, BarChart2
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';
import {
    Temuan, getTotalTemuan, getOpenTemuan, getCompletionRate, getAverageAging,
    getTrendData, getKategori4MData, getGedungData, getAreaData,
    getStatusData, getTopReporterData, getAgingData, getCriticalFindings
} from '@/lib/dashboard/temuanAnalytics';
import {
    Suggestion, getSuggestionKPI, getSuggestionTrend, getStatusDistribution,
    getDepartemenData, getAreaProsesData, getFocusDefectData,
    getTopSubmitters, getApresiasiData, getPendingLama
} from '@/lib/dashboard/suggestionAnalytics';

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
    const [trendTab, setTrendTab] = useState('Mingguan');
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
        if (user) {
            fetchData();
        }
    }, [user]);

    // Aggregations using useMemo to prevent recalculation on every render
    const kpi = useMemo(() => ({
        total: getTotalTemuan(data),
        open: getOpenTemuan(data),
        completionRate: getCompletionRate(data),
        avgAging: getAverageAging(data)
    }), [data]);

    const trendData = useMemo(() => {
        let filteredData = data;
        const now = new Date();

        if (trendTab === 'Mingguan') {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(now.getDate() - 7);
            filteredData = data.filter(d => new Date(d.tanggal) >= oneWeekAgo || d.status !== 'CLOSED');
        } else if (trendTab === 'Bulanan') {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(now.getMonth() - 1);
            filteredData = data.filter(d => new Date(d.tanggal) >= oneMonthAgo);
        } else if (trendTab === 'Tahunan') {
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(now.getFullYear() - 1);
            filteredData = data.filter(d => new Date(d.tanggal) >= oneYearAgo);
        }

        return getTrendData(filteredData, trendTab as any);
    }, [data, trendTab]);
    const kategoriData = useMemo(() => getKategori4MData(data), [data]);
    const gedungData = useMemo(() => getGedungData(data), [data]);
    const areaData = useMemo(() => getAreaData(data), [data]);
    const statusData = useMemo(() => getStatusData(data), [data]);
    const topReporters = useMemo(() => getTopReporterData(data), [data]);
    const agingData = useMemo(() => getAgingData(data), [data]);
    const criticalFindings = useMemo(() => getCriticalFindings(data), [data]);

    useEffect(() => {
        if (!loading && kpi.open.count > 0 && user?.role !== 'USER') {
            setIsWarningModalOpen(true);
        }
    }, [loading, kpi.open.count, user?.role]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    // if (user?.role === 'USER') {
    //     return <UserDashboardContent user={user} />;
    // }

    return (
        <div className="space-y-6 pb-20 md:pb-0 w-full animate-in fade-in duration-500">

            <Dialog open={isWarningModalOpen} onOpenChange={setIsWarningModalOpen}>
                <DialogContent className="sm:max-w-md border-red-200 dark:border-red-800 bg-red-50 dark:bg-slate-950 shadow-2xl shadow-red-900/20">
                    <DialogHeader className="items-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/80 mb-3 animate-pulse">
                            <AlertTriangle className="h-7 w-7 text-red-600 dark:text-red-400" aria-hidden="true" />
                        </div>
                        <DialogTitle className="text-xl font-bold text-red-700 dark:text-red-400">Peringatan Tindak Lanjut!</DialogTitle>
                        <DialogDescription className="text-center text-red-600 dark:text-slate-300 pt-2">
                            Terdapat <strong className="text-xl mx-1 font-black text-red-700 dark:text-red-400">{kpi.open.count} Temuan</strong> berstatus OPEN yang belum ditindaklanjuti.<br />
                            {criticalFindings.length > 0 && <span className="inline-block mt-2 font-bold bg-white dark:bg-slate-900 px-3 py-1 rounded-full text-red-600 dark:text-red-400 text-xs border border-red-200 dark:border-red-800/50">(Termasuk {criticalFindings.length} temuan kritis {'>'} 14 hari)</span>}
                            <br /><br />
                            <span className="text-xs text-red-500/80 dark:text-slate-400">Sistem memonitor aktivitas closing Anda. Harap segera melakukan closing temuan untuk menjaga performa dan komitmen di area Anda.</span>
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

            <Tabs defaultValue="temuan" className="w-full">
                <TabsList className="mb-4 bg-slate-100 dark:bg-slate-900/50 p-1 rounded-xl">
                    <TabsTrigger value="temuan" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm">
                        Audit Temuan
                    </TabsTrigger>
                    <TabsTrigger value="suggestion" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm">
                        Suggestion System
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="temuan" className="space-y-6">
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
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                                <h2 className="text-sm font-bold flex items-center gap-2"><TrendingUp className="w-4 h-4 text-indigo-500" /> Trend Pelaporan Temuan</h2>
                                <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                                    {['Mingguan', 'Bulanan', 'Tahunan'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setTrendTab(tab)}
                                            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${trendTab === tab ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.2} />
                                        <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} tickMargin={10} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} allowDecimals={false} />
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
                                            {kategoriData.map((entry: any, index: number) => (
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
                                        <XAxis dataKey="gedung" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f1f5f9' }} />
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
                                        <XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <YAxis dataKey="area" type="category" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={100} />
                                        <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f1f5f9' }} />
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
                                            {statusData.map((entry: any, index: number) => (
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
                                        <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f1f5f9' }} />
                                        <Bar dataKey="value" name="Total">
                                            {agingData.map((entry: any, index: number) => (
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
                                            <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{item.area} <br /><span className="text-[9px] text-gray-400">{item.gedung}</span></td>
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
                </TabsContent>

                <TabsContent value="suggestion" className="space-y-6">
                    <SuggestionAnalyticsDashboard />
                </TabsContent>
            </Tabs>
        </div>
    );
}

const SUGGESTION_STATUS_COLORS: Record<string, string> = {
    'Pending': '#F59E0B',
    'Approved': '#10B981',
    'Rejected': '#EF4444',
};

const DEFECT_COLORS = ['#6366F1', '#F59E0B', '#10B981', '#F43F5E', '#14B8A6', '#8B5CF6', '#EC4899', '#3B82F6'];

const formatRupiah = (value: number) =>
    `Rp ${value.toLocaleString('id-ID')}`;

const SuggestionAnalyticsDashboard = () => {
    const [analyticsData, setAnalyticsData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [trendTab, setTrendTab] = useState<'Mingguan' | 'Bulanan' | 'Tahunan'>('Bulanan');

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const res = await api.get('/suggestions/analytics');
                if (res.data?.success) setAnalyticsData(res.data.data);
            } catch { /* silent */ } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    if (loading || !analyticsData) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const { kpi, trendData, statusData, deptData, areaData, defectData, topSubmitters, apresiasiData, pendingLama } = analyticsData;
    const currentTrendData = trendData[trendTab];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* ── Section A: KPI Cards ─────────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <KPICard
                    title="Total Ide Submitted"
                    value={kpi.total}
                    subtext="Semua ide improvement"
                    icon={Lightbulb}
                    colorClass="text-indigo-600"
                    bgClass="bg-indigo-50 dark:bg-indigo-900/30"
                />
                <KPICard
                    title="Approval Rate"
                    value={`${kpi.approvalRate}%`}
                    subtext={`${kpi.approved} dari ${kpi.total} ide diterima`}
                    icon={BadgePercent}
                    colorClass="text-emerald-600"
                    bgClass="bg-emerald-50 dark:bg-emerald-900/30"
                />
                <KPICard
                    title="Total Apresiasi"
                    value={kpi.totalApresiasi > 0 ? formatRupiah(kpi.totalApresiasi) : 'Rp 0'}
                    subtext="Nilai apresiasi diberikan"
                    icon={DollarSign}
                    colorClass="text-amber-600"
                    bgClass="bg-amber-50 dark:bg-amber-900/30"
                />
                <KPICard
                    title="Menunggu Review"
                    value={kpi.pending}
                    subtext="Ide status PENDING"
                    icon={Clock}
                    colorClass="text-rose-600"
                    bgClass="bg-rose-50 dark:bg-rose-900/30"
                />
            </div>

            {/* ── Section B: Trend + Status ────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Trend */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                        <h2 className="text-sm font-bold flex items-center gap-2"><TrendingUp className="w-4 h-4 text-indigo-500" /> Trend Pengajuan Ide</h2>
                        <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                            {(['Mingguan', 'Bulanan', 'Tahunan'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setTrendTab(tab)}
                                    className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${trendTab === tab ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={currentTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.2} />
                                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} tickMargin={10} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} allowDecimals={false} />
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    name="Jumlah Ide"
                                    stroke="#6366F1"
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2, fill: '#ffffff', stroke: '#6366F1' }}
                                    activeDot={{ r: 6, strokeWidth: 0, fill: '#6366F1' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-500" /> Distribusi Status</h2>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {statusData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* ── Section C: Departemen + Focus Defect ─────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ide per Departemen */}
                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><Building className="w-4 h-4 text-blue-500" /> Ide per Departemen</h2>
                    <div className="h-[220px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={deptData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }} barSize={14}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#94a3b8" strokeOpacity={0.2} />
                                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                                <YAxis dataKey="departemen" type="category" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={110} />
                                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f1f5f9' }} />
                                <Bar dataKey="total" name="Total Ide" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Focus Defect */}
                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-purple-500" /> Distribusi Focus Defect</h2>
                    <div className="h-[220px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={defectData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={85}
                                    paddingAngle={4}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {defectData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={DEFECT_COLORS[index % DEFECT_COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* ── Section D: Area Proses + Top Submitters ───────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Area Proses Hotspot */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-rose-500" /> Top 10 Area Proses</h2>
                    <div className="h-[220px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={areaData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }} barSize={14}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#94a3b8" strokeOpacity={0.2} />
                                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                                <YAxis dataKey="area" type="category" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={110} />
                                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f1f5f9' }} />
                                <Bar dataKey="total" name="Total Ide" fill="#F43F5E" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Submitters Leaderboard */}
                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
                    <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><Users className="w-4 h-4 text-sky-500" /> Top Submitters</h2>
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-[11px] text-left">
                            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50 dark:bg-slate-900">
                                <tr>
                                    <th className="px-3 py-2 rounded-l-lg">Rank</th>
                                    <th className="px-3 py-2">Nama</th>
                                    <th className="px-3 py-2">Dept</th>
                                    <th className="px-3 py-2 rounded-r-lg text-center">Ide</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topSubmitters.map((s, idx) => (
                                    <tr key={idx} className="border-b border-gray-50 dark:border-slate-800/50 hover:bg-gray-50/50 dark:hover:bg-slate-900/50 transition-colors">
                                        <td className="px-3 py-2 font-bold text-slate-500 dark:text-slate-400">
                                            {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                                        </td>
                                        <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-200 max-w-[80px] truncate" title={s.name}>{s.name}</td>
                                        <td className="px-3 py-2 text-slate-500 dark:text-slate-400 max-w-[70px] truncate text-[9px]" title={s.dept}>{s.dept}</td>
                                        <td className="px-3 py-2 text-center">
                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400 font-bold text-[10px]">
                                                {s.total}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {topSubmitters.length === 0 && (
                                    <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Belum ada data.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ── Section E: Kategori Apresiasi + Pending Lama ─────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kategori Apresiasi */}
                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-amber-500" /> Distribusi Apresiasi</h2>
                    {apresiasiData.length > 0 ? (
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={apresiasiData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} barSize={40}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.2} />
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                                    <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f1f5f9' }} />
                                    <Bar dataKey="value" name="Jumlah">
                                        {apresiasiData.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[200px] text-slate-400">
                            <Award className="w-10 h-10 mb-2 opacity-20" />
                            <p className="text-xs font-medium">Belum ada ide yang di-approve</p>
                        </div>
                    )}
                </div>

                {/* Ide Pending Lama > 30 hari */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-3 gap-2">
                        <h2 className="text-sm font-bold flex items-center gap-2 text-amber-600">
                            <Flame className="w-4 h-4 shrink-0" /> Ide Pending Lama (&gt; 30 Hari)
                        </h2>
                        <Link href="/admin/suggestions" className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 shrink-0">
                            Evaluasi <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="w-full overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0">
                        <table className="w-full text-[11px] text-left min-w-[450px]">
                            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50 dark:bg-slate-900">
                                <tr>
                                    <th className="px-3 py-2 rounded-l-lg whitespace-nowrap">No Form</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Judul Ide</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Karyawan</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Dept</th>
                                    <th className="px-3 py-2 rounded-r-lg whitespace-nowrap">Aging</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingLama.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-50 dark:border-slate-800/50 hover:bg-gray-50/50 dark:hover:bg-slate-900/50">
                                        <td className="px-3 py-2 text-indigo-600 font-semibold whitespace-nowrap">{item.noForm}</td>
                                        <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-200 max-w-[140px] truncate" title={item.judulIde}>{item.judulIde}</td>
                                        <td className="px-3 py-2 text-slate-600 dark:text-slate-400 max-w-[100px] truncate" title={item.namaKaryawan}>{item.namaKaryawan}</td>
                                        <td className="px-3 py-2 text-slate-500 dark:text-slate-400 text-[9px]">{item.departemen}</td>
                                        <td className="px-3 py-2 font-bold text-amber-600">{item.aging} Hari</td>
                                    </tr>
                                ))}
                                {pendingLama.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                                            ✅ Tidak ada ide pending yang terlalu lama.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserDashboardContent = ({ user, hideGreeting = false }: { user: any, hideGreeting?: boolean }) => {
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserSuggestions = async () => {
            try {
                setLoading(true);
                const res = await api.get('/suggestions');
                if (res.data?.success) {
                    setSuggestions(res.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch suggestions", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserSuggestions();
    }, []);

    const total = suggestions.length;
    const pending = suggestions.filter(s => s.statusApproval === 'PENDING').length;
    const approved = suggestions.filter(s => s.statusApproval === 'APPROVED').length;
    const rejected = suggestions.filter(s => s.statusApproval === 'REJECTED').length;

    const recentSuggestions = suggestions.slice(0, 5);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20 md:pb-0 w-full animate-in fade-in duration-500">
            {!hideGreeting && (
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
                                Halo, {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.username || 'User'}! 👋
                            </h1>
                            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                Pantau performa Ide Improvement Anda di sini.
                            </p>
                        </div>
                    </div>
                    <Link href="/admin/suggestions/create">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm text-xs py-2 px-4 h-auto w-full md:w-auto">
                            <Flame className="w-4 h-4 mr-1.5" /> Buat Ide Baru
                        </Button>
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <KPICard
                    title="Total Ide"
                    value={total}
                    subtext="Semua ide yang disubmit"
                    icon={Target}
                    colorClass="text-indigo-600"
                    bgClass="bg-indigo-50 dark:bg-indigo-900/30"
                />
                <KPICard
                    title="Menunggu Review"
                    value={pending}
                    subtext="Ide status PENDING"
                    icon={Clock}
                    colorClass="text-amber-600"
                    bgClass="bg-amber-50 dark:bg-amber-900/30"
                />
                <KPICard
                    title="Ide Diterima"
                    value={approved}
                    subtext="Ide status APPROVED"
                    icon={CheckCircle2}
                    colorClass="text-emerald-600"
                    bgClass="bg-emerald-50 dark:bg-emerald-900/30"
                />
                <KPICard
                    title="Ide Ditolak"
                    value={rejected}
                    subtext="Ide status REJECTED"
                    icon={AlertCircle}
                    colorClass="text-rose-600"
                    bgClass="bg-rose-50 dark:bg-rose-900/30"
                />
            </div>

            <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                        <Activity className="w-4 h-4 text-indigo-500" /> {hideGreeting ? "Ide Terbaru Karyawan" : "Ide Terbaru Anda"}
                    </h2>
                    <Link href="/admin/suggestions" className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                        Lihat Semua <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>

                {recentSuggestions.length > 0 ? (
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-[11px] text-left">
                            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50 dark:bg-slate-900">
                                <tr>
                                    <th className="px-3 py-2 rounded-l-lg">No Form</th>
                                    <th className="px-3 py-2">Judul Ide</th>
                                    <th className="px-3 py-2">Area</th>
                                    <th className="px-3 py-2 rounded-r-lg">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentSuggestions.map((item, idx) => (
                                    <tr key={idx} className="border-b border-gray-50 dark:border-slate-800/50 hover:bg-gray-50/50 dark:hover:bg-slate-900/50 transition-colors">
                                        <td className="px-3 py-2 font-semibold text-slate-700 dark:text-slate-400">{item.noForm}</td>
                                        <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-200">{item.judulIde}</td>
                                        <td className="px-3 py-2 text-slate-600 dark:text-slate-400">{item.areaTemuan || '-'}</td>
                                        <td className="px-3 py-2">
                                            <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${item.statusApproval === 'PENDING' ? 'bg-amber-100 text-amber-700' : item.statusApproval === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                                {item.statusApproval}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mb-3 text-slate-400">
                            <Target className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Belum ada ide yang disubmit.</p>
                        <p className="text-xs text-slate-500 mt-1">Ayo mulai ciptakan improvement pertamamu!</p>
                        <Link href="/admin/suggestions/create" className="inline-block mt-4">
                            <Button variant="outline" size="sm" className="text-xs font-bold rounded-lg border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                                Buat Ide Sekarang
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
