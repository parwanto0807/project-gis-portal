'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Briefcase, Users, FileSearch, Database, ShieldAlert,
    ChevronRight, ArrowRight, Activity, CalendarDays, Server
} from 'lucide-react';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';

const ShortcutButton = ({ href, icon: Icon, label, colorClass, bgClass }: any) => (
    <Link href={href} className="flex flex-col items-center gap-2 group">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm ${bgClass}`}>
            <Icon className={`w-7 h-7 ${colorClass}`} />
        </div>
        <span className="text-[11px] font-medium text-center leading-tight text-gray-700 dark:text-gray-300">
            {label}
        </span>
    </Link>
);

const KPICard = ({ title, value, icon: Icon, color, bgIconClass }: any) => (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-950 dark:bg-gray-900 p-5 shadow-sm flex items-center gap-4">
        <div className={`rounded-xl p-3 ${bgIconClass}`}>
            <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</h3>
        </div>
    </div>
);

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        temuan: 0,
        discipline: 0,
        users: 0,
        backups: 0
    });
    const [recentTemuan, setRecentTemuan] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const user = useAuthStore((state) => state.user);
    const isStaff = user?.role?.toUpperCase() === 'STAFF';

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [resTemuan, resDiscipline, resBackups] = await Promise.all([
                api.get('/temuan-peduli').catch(() => ({ data: { data: [] } })),
                api.get('/discipline-reports').catch(() => ({ data: { data: [] } })),
                api.get('/backups').catch(() => ({ data: { data: [] } }))
                // Add users if endpoint exists, keeping it 0 for now if unknown
            ]);

            const temuanData = resTemuan.data?.data || [];
            
            setStats({
                temuan: temuanData.length,
                discipline: resDiscipline.data?.data?.length || 0,
                users: 12, // Dummy since we don't have a specific users API verified
                backups: resBackups.data?.data?.length || 0
            });

            // Get latest 5 temuan
            setRecentTemuan(temuanData.slice(0, 5));
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const todayDate = new Date().toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="space-y-6 pb-20 md:pb-0 w-full">
            
            {/* 1. Mobile Native-like Header Profile */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
                
                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <p className="text-blue-100 text-sm font-medium mb-1">{todayDate}</p>
                        <h1 className="text-2xl font-bold tracking-tight">Halo, Administrator 👋</h1>
                        <p className="text-sm text-blue-50 mt-1 opacity-90">Pusat kendali operasional GIS Portal.</p>
                    </div>
                    <div className="hidden sm:block">
                        <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                            <Activity className="h-8 w-8 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Quick Access / Shortcuts Grid */}
            <div>
                <h2 className="text-lg font-bold mb-4 px-1 text-gray-800 dark:text-gray-100">Akses Cepat</h2>
                <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-4 justify-between sm:justify-start sm:gap-8">
                    <ShortcutButton 
                        href="/admin/audit/temuan" 
                        icon={FileSearch} 
                        label="Temuan" 
                        bgClass="bg-red-50 dark:bg-red-900/20" 
                        colorClass="text-red-500" 
                    />
                    {!isStaff && (
                        <>
                            <ShortcutButton 
                                href="/admin/hr/discipline" 
                                icon={ShieldAlert} 
                                label="Disiplin" 
                                bgClass="bg-orange-50 dark:bg-orange-900/20" 
                                colorClass="text-orange-500" 
                            />
                            <ShortcutButton 
                                href="/admin/settings/backup" 
                                icon={Database} 
                                label="Backup" 
                                bgClass="bg-blue-50 dark:bg-blue-900/20" 
                                colorClass="text-blue-500" 
                            />
                            <ShortcutButton 
                                href="#" 
                                icon={Users} 
                                label="Pengguna" 
                                bgClass="bg-green-50 dark:bg-green-900/20" 
                                colorClass="text-green-500" 
                            />
                        </>
                    )}
                </div>
            </div>

            {/* 3. KPI Statistics */}
            <div>
                <div className="flex justify-between items-end mb-4 px-1">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Statistik Utama</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <KPICard
                        title="Total Temuan"
                        value={loading ? "..." : stats.temuan}
                        icon={FileSearch}
                        color="text-red-600"
                        bgIconClass="bg-red-50 dark:bg-red-900/30"
                    />
                    {!isStaff && (
                        <>
                            <KPICard
                                title="Laporan Disiplin"
                                value={loading ? "..." : stats.discipline}
                                icon={ShieldAlert}
                                color="text-orange-600"
                                bgIconClass="bg-orange-50 dark:bg-orange-900/30"
                            />
                            <KPICard
                                title="Total Karyawan"
                                value={loading ? "..." : stats.users}
                                icon={Users}
                                color="text-green-600"
                                bgIconClass="bg-green-50 dark:bg-green-900/30"
                            />
                            <KPICard
                                title="Sistem Backup"
                                value={loading ? "..." : stats.backups}
                                icon={Server}
                                color="text-blue-600"
                                bgIconClass="bg-blue-50 dark:bg-blue-900/30"
                            />
                        </>
                    )}
                </div>
            </div>

            {/* 4. Recent Activities List */}
            <div>
                <div className="flex justify-between items-center mb-4 px-1">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Aktivitas Terkini</h2>
                    <Link href="/admin/audit/temuan" className="text-sm font-medium text-blue-600 flex items-center hover:underline">
                        Lihat Semua <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
                
                <div className="bg-white dark:bg-slate-950 dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-sm text-gray-500">Memuat data terbaru...</div>
                    ) : recentTemuan.length === 0 ? (
                        <div className="p-8 text-center text-sm text-gray-500">Belum ada aktivitas.</div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {recentTemuan.map((item) => (
                                <Link href="/admin/audit/temuan" key={item.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="mt-1 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                                        <FileSearch className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                                            Temuan di {item.area}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                                            {item.temuan}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                            <CalendarDays className="w-3 h-3" />
                                            {new Date(item.tanggal).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                    <div className="shrink-0 pt-2">
                                        <ArrowRight className="w-4 h-4 text-gray-300" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
