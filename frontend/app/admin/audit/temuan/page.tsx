'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import {
    PlusCircle, Edit, Trash2, Image as ImageIcon, FileText, Search,
    ArrowLeft, ArrowRight, Eye, MapPin, Calendar, User, Clock, Wrench,
    AlertTriangle, CheckCircle2, TrendingUp, Activity, BarChart3,
    SortAsc, SortDesc, ChevronDown, Timer, ListChecks, Info, Tags,
    RefreshCw, Shield, Flame, Target, Layers
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { TemuanForm } from '@/components/temuan/TemuanForm';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// ─── Utility Functions ──────────────────────────────────────────────────────

const formatKategori = (kategori: any) => {
    const cats = Array.isArray(kategori) ? kategori : [kategori].filter(Boolean);
    const colorMap: Record<string, string> = {
        Man: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
        Machine: 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800',
        Material: 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
        Method: 'bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800',
    };
    return cats.map((c: string) => (
        <Badge key={c} variant="secondary" className={`${colorMap[c] || 'bg-slate-100 text-slate-600'} text-[10px] px-2 py-0 font-semibold border`}>
            {c}
        </Badge>
    ));
};

const formatDateDDMMM = (dateStr: string | Date) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '-';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${String(d.getDate()).padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()}`;
};

const getAgeDays = (dateStr: string | Date): number => {
    if (!dateStr) return 0;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 0;
    return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
};

const getAgeLabel = (days: number): string => {
    if (days === 0) return 'Hari ini';
    if (days === 1) return '1 hari lalu';
    if (days < 7) return `${days} hari lalu`;
    if (days < 30) return `${Math.floor(days / 7)} minggu lalu`;
    return `${Math.floor(days / 30)} bulan lalu`;
};

const formatPrintDateTime = () => {
    const d = new Date();
    const datePart = formatDateDDMMM(d);
    const timeStr = d.toLocaleTimeString('id-ID', {
        timeZone: 'Asia/Jakarta', hour12: false,
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).replace(/\./g, ':');
    return `Jakarta, ${datePart} ${timeStr}`;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '').replace('/api', '') || 'http://localhost:5001';

// ─── Sub-Components ──────────────────────────────────────────────────────────

const AgeBadge = ({ dateStr, status }: { dateStr: string, status: string }) => {
    const days = getAgeDays(dateStr);
    if (status === 'CLOSED') return null;
    if (days >= 14) return (
        <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-full px-1.5 py-0.5">
            <Flame className="w-2.5 h-2.5" />{days}h
        </span>
    );
    if (days >= 7) return (
        <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-full px-1.5 py-0.5">
            <Timer className="w-2.5 h-2.5" />{days}h
        </span>
    );
    return null;
};

const StatusDot = ({ status }: { status: string }) => {
    if (status === 'OPEN') return <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse mr-1" />;
    if (status === 'IN_PROGRESS') return <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mr-1" />;
    return <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1" />;
};

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'CLOSED':
            return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none gap-1 text-[10px]"><StatusDot status={status} />Closed</Badge>;
        case 'IN_PROGRESS':
            return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none gap-1 text-[10px]"><StatusDot status={status} />In Progress</Badge>;
        default:
            return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-none gap-1 text-[10px]"><StatusDot status="OPEN" />Open</Badge>;
    }
};

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function TemuanPeduliPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [lastRefresh, setLastRefresh] = useState(new Date());

    // Image Preview
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    // Detail Dialog
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState<any>(null);

    // Delete Dialog
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    // Search, Filter, Sort, Pagination
    const [searchQuery, setSearchQuery] = useState('');
    const [filterKategori, setFilterKategori] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const router = useRouter();
    const { user } = useAuthStore();

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get('/temuan-peduli');
            if (res.data.success) {
                setData(res.data.data);
                setLastRefresh(new Date());
            }
        } catch {
            toast.error('Gagal mengambil data temuan');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.role === 'USER') router.push('/admin/dashboard');
        else fetchData();
    }, [user, router]);

    useEffect(() => { setPage(1); }, [searchQuery, filterKategori, filterStatus]);

    // ─── Computed Stats ───────────────────────────────────────────────────────

    const stats = useMemo(() => {
        const total = data.length;
        const open = data.filter(d => d.status === 'OPEN' || !d.status).length;
        const inProgress = data.filter(d => d.status === 'IN_PROGRESS').length;
        const closed = data.filter(d => d.status === 'CLOSED').length;
        const tindakLanjut = inProgress + closed;
        const closeRate = total > 0 ? Math.round((closed / total) * 100) : 0;
        const overdueCount = data.filter(d => (d.status === 'OPEN' || !d.status) && getAgeDays(d.tanggal) >= 7).length;
        return { total, open, inProgress, closed, tindakLanjut, closeRate, overdueCount };
    }, [data]);

    // ─── Filtered & Sorted Data ───────────────────────────────────────────────

    const filteredData = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return data
            .filter(item => {
                const pelapor = item.user ? `${item.user.firstName} ${item.user.lastName}` : item.diInputOleh;
                const matchSearch = !q || [item.area, item.tempatTemuan, item.temuan, pelapor].some(s => s?.toLowerCase().includes(q));
                const matchKategori = !filterKategori || (Array.isArray(item.kategori4M) ? item.kategori4M.includes(filterKategori) : item.kategori4M === filterKategori);
                const matchStatus = !filterStatus || (filterStatus === 'OPEN' ? (!item.status || item.status === 'OPEN') : item.status === filterStatus);
                return matchSearch && matchKategori && matchStatus;
            })
            .sort((a, b) => {
                const da = new Date(a.tanggal).getTime();
                const db = new Date(b.tanggal).getTime();
                return sortOrder === 'desc' ? db - da : da - db;
            });
    }, [data, searchQuery, filterKategori, filterStatus, sortOrder]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE) || 1;
    const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    // ─── Actions ──────────────────────────────────────────────────────────────

    const triggerDelete = (id: number) => { setItemToDelete(id); setIsDeleteDialogOpen(true); };
    const confirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await api.delete(`/temuan-peduli/${itemToDelete}`);
            toast.success('Data berhasil dihapus');
            fetchData();
        } catch { toast.error('Gagal menghapus data'); }
        finally { setIsDeleteDialogOpen(false); setItemToDelete(null); }
    };
    const handleEdit = (item: any) => { setSelectedItem(item); setIsFormOpen(true); };
    const handleCreate = () => { setSelectedItem(null); setIsFormOpen(true); };
    const handleViewDetail = (item: any) => { setSelectedDetail(item); setIsDetailOpen(true); };
    const viewPhotos = (urls: string[]) => { setPreviewImages(urls); setIsPreviewOpen(true); };

    // ─── PDF Export ───────────────────────────────────────────────────────────

    const exportToPDF = async () => {
        if (data.length === 0) { toast.error('Tidak ada data untuk diexport'); return; }

        const doc = new jsPDF('l', 'mm', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 14;
        const contentWidth = pageWidth - margin * 2;

        // Header Logo
        try {
            const img = new window.Image();
            img.src = '/logo-md.png';
            await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
            const logoW = 20, logoH = logoW * (img.height / img.width);
            doc.addImage(img, 'PNG', margin, 8, logoW, logoH);
        } catch {}

        const textX = margin + 28;
        doc.setFontSize(14); doc.setTextColor(30, 30, 30); doc.setFont("helvetica", "bold");
        doc.text('PT. GRAFINDO MITRASEMESTA', textX, 14);
        doc.setFontSize(8); doc.setTextColor(100, 100, 100); doc.setFont("helvetica", "normal");
        doc.text('Cikarang Industrial Estate Jababeka 1 Block U 8D, U 8C & U 7A', textX, 19);
        doc.text('Cikarang Utara, Bekasi Regency, West Java 17530 | Telp: (021) 8934714', textX, 23);
        doc.setFontSize(8); doc.setTextColor(100, 100, 100);
        doc.text(formatPrintDateTime(), pageWidth - margin, 14, { align: 'right' });

        // Blue top bar
        doc.setFillColor(41, 128, 185);
        doc.rect(margin, 6, contentWidth, 1.5, 'F');

        // Separator
        doc.setDrawColor(41, 128, 185); doc.setLineWidth(0.8);
        doc.line(margin, 27, pageWidth - margin, 27);

        // Report Title
        doc.setFontSize(12); doc.setTextColor(30, 30, 30); doc.setFont("helvetica", "bold");
        doc.text('LAPORAN AUDIT INTERNAL — Temuan Peduli Bersinergi', margin, 34);

        // KPI Cards
        const kpiItems = [
            { label: 'TOTAL TEMUAN', value: `${stats.total}`, color: [41, 128, 185] },
            { label: 'OPEN', value: `${stats.open}`, color: [231, 76, 60] },
            { label: 'IN PROGRESS', value: `${stats.inProgress}`, color: [243, 156, 18] },
            { label: 'CLOSED', value: `${stats.closed}`, color: [46, 204, 113] },
            { label: 'CLOSE RATE', value: `${stats.closeRate}%`, color: [155, 89, 182] },
            { label: 'OVERDUE (≥7hr)', value: `${stats.overdueCount}`, color: [192, 57, 43] },
        ];

        let kpiX = margin;
        const kpiY = 39;
        const kpiW = (contentWidth - (kpiItems.length - 1) * 2) / kpiItems.length;

        kpiItems.forEach(kpi => {
            doc.setFillColor(kpi.color[0], kpi.color[1], kpi.color[2]);
            doc.roundedRect(kpiX, kpiY, kpiW, 12, 1.5, 1.5, 'F');
            doc.setTextColor(255, 255, 255); doc.setFontSize(9); doc.setFont("helvetica", "bold");
            doc.text(kpi.value, kpiX + kpiW / 2, kpiY + 5.5, { align: 'center' });
            doc.setFontSize(5.5); doc.setFont("helvetica", "normal");
            doc.text(kpi.label, kpiX + kpiW / 2, kpiY + 9.5, { align: 'center' });
            kpiX += kpiW + 2;
        });

        // Table
        const tableStartY = kpiY + 20;
        doc.setDrawColor(200, 200, 200); doc.setLineWidth(0.3);
        doc.line(margin, tableStartY - 4, pageWidth - margin, tableStartY - 4);
        doc.setFontSize(10); doc.setTextColor(30, 30, 30); doc.setFont("helvetica", "bold");
        doc.text('Rincian Data Temuan', margin, tableStartY + 2);

        const tableRows = data.map((item, i) => [
            i + 1,
            formatDateDDMMM(item.tanggal),
            item.jam || '-',
            item.area || '-',
            item.tempatTemuan || '-',
            Array.isArray(item.kategori4M) ? item.kategori4M.join(', ') : item.kategori4M || '-',
            item.temuan || '-',
            item.status || 'OPEN',
            `${getAgeDays(item.tanggal)} hr`,
            item.tindakanPerbaikan || '-',
            item.user ? `${item.user.firstName} ${item.user.lastName}` : item.diInputOleh || '-',
        ]);

        autoTable(doc, {
            head: [["No", "Tanggal", "Jam", "Area", "Tempat", "Kategori", "Deskripsi", "Status", "Umur", "Tindakan", "Pelapor"]],
            body: tableRows,
            startY: tableStartY + 6,
            theme: 'striped',
            styles: { fontSize: 6.5, cellPadding: 2.2, lineColor: [220, 220, 220], lineWidth: 0.2, valign: 'middle', overflow: 'linebreak' },
            headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7, cellPadding: 3, halign: 'center' },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            columnStyles: {
                0: { cellWidth: 8, halign: 'center' },
                1: { cellWidth: 20, halign: 'center' },
                2: { cellWidth: 14, halign: 'center' },
                3: { cellWidth: 24 },
                4: { cellWidth: 26 },
                5: { cellWidth: 20 },
                6: { cellWidth: 'auto', minCellHeight: 10 },
                7: { cellWidth: 18, halign: 'center' },
                8: { cellWidth: 14, halign: 'center' },
                9: { cellWidth: 36 },
                10: { cellWidth: 28 },
            },
            didParseCell: (tableData) => {
                if (tableData.section === 'body' && tableData.column.index === 7) {
                    const s = String(tableData.cell.raw);
                    tableData.cell.styles.fontStyle = 'bold';
                    if (s === 'OPEN') { tableData.cell.styles.textColor = [231, 76, 60]; tableData.cell.styles.fillColor = [254, 226, 226]; }
                    else if (s === 'IN_PROGRESS') { tableData.cell.styles.textColor = [180, 83, 9]; tableData.cell.styles.fillColor = [254, 249, 195]; }
                    else if (s === 'CLOSED') { tableData.cell.styles.textColor = [6, 95, 70]; tableData.cell.styles.fillColor = [209, 250, 229]; }
                }
                if (tableData.section === 'body' && tableData.column.index === 8) {
                    const days = parseInt(String(tableData.cell.raw));
                    if (days >= 14) { tableData.cell.styles.textColor = [231, 76, 60]; tableData.cell.styles.fontStyle = 'bold'; }
                    else if (days >= 7) { tableData.cell.styles.textColor = [180, 83, 9]; tableData.cell.styles.fontStyle = 'bold'; }
                }
            },
            margin: { left: margin, right: margin },
        });

        // Footer
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setDrawColor(200, 200, 200); doc.setLineWidth(0.3);
            doc.line(margin, pageHeight - 9, pageWidth - margin, pageHeight - 9);
            doc.setFontSize(7); doc.setTextColor(150, 150, 150);
            doc.text(
                `Halaman ${i} dari ${pageCount} | Dicetak: ${formatPrintDateTime()} | PT. GRAFINDO MITRASEMESTA — Confidential`,
                pageWidth / 2, pageHeight - 6, { align: 'center' }
            );
        }

        const pdfUrl = URL.createObjectURL(doc.output('blob'));
        window.open(pdfUrl, '_blank');
    };

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <TooltipProvider>
            <div className="space-y-5">

                {/* ── Header ─────────────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Badge variant="secondary" className="w-fit px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-100 border-slate-200 dark:border-slate-800">
                            <Breadcrumb>
                                <BreadcrumbList className="text-[10px] md:text-xs">
                                    <BreadcrumbItem><BreadcrumbLink href="/admin/dashboard" className="text-slate-500 hover:text-slate-900">Dashboard</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem><BreadcrumbLink href="/admin/audit" className="text-slate-500 hover:text-slate-900">Audit</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem><BreadcrumbPage className="text-slate-900 dark:text-slate-50 font-semibold">Temuan Peduli</BreadcrumbPage></BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </Badge>

                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-indigo-200 dark:shadow-indigo-900/30 mt-0.5">
                                <ListChecks className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                                    Temuan Peduli Bersinergi
                                </h1>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Manajemen & monitoring temuan audit internal.</p>
                                    {stats.overdueCount > 0 && (
                                        <Badge className="bg-rose-100 text-rose-700 border-rose-200 gap-1 text-[10px] font-bold animate-pulse">
                                            <Flame className="w-3 h-3" />{stats.overdueCount} Overdue
                                        </Badge>
                                    )}
                                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                        <RefreshCw className="w-2.5 h-2.5" />
                                        {lastRefresh.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button onClick={handleCreate} size="sm" className="flex-1 sm:flex-none h-9 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm rounded-lg justify-center">
                            <PlusCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">Tambah Temuan</span>
                            <span className="sm:hidden">Tambah</span>
                        </Button>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={exportToPDF} variant="outline" size="sm" className="h-9 px-3 gap-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200 rounded-lg shadow-sm">
                                    <FileText className="w-4 h-4" /><span className="hidden sm:inline">Export PDF</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Export semua data ke PDF</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={fetchData} variant="outline" size="sm" className="h-9 w-9 p-0 border-slate-200 rounded-lg shadow-sm" disabled={loading}>
                                    <RefreshCw className={`w-4 h-4 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Refresh data</TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                {/* ── Summary Cards ───────────────────────────────────────── */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                    {/* Total */}
                    <div className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex flex-col gap-1 col-span-1">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total</span>
                            <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-slate-900 dark:text-slate-50 leading-none">{stats.total}</div>
                        <div className="text-[10px] text-slate-400">temuan tercatat</div>
                    </div>

                    {/* Open */}
                    <div className="bg-rose-50 dark:bg-rose-950/30 shadow-sm border border-rose-100 dark:border-rose-900 rounded-xl p-3 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Open</span>
                            <div className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-rose-600 dark:text-rose-400 leading-none">{stats.open}</div>
                        <div className="flex items-center gap-1">
                            {stats.overdueCount > 0 && (
                                <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-0.5">
                                    <Flame className="w-2.5 h-2.5" />{stats.overdueCount} overdue
                                </span>
                            )}
                            {stats.overdueCount === 0 && <span className="text-[10px] text-rose-400">Perlu ditindak</span>}
                        </div>
                    </div>

                    {/* In Progress */}
                    <div className="bg-amber-50 dark:bg-amber-950/30 shadow-sm border border-amber-100 dark:border-amber-900 rounded-xl p-3 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Progress</span>
                            <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                                <Activity className="w-3.5 h-3.5 text-amber-500" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-amber-600 dark:text-amber-400 leading-none">{stats.inProgress}</div>
                        <div className="text-[10px] text-amber-500">sedang diperbaiki</div>
                    </div>

                    {/* Closed */}
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 shadow-sm border border-emerald-100 dark:border-emerald-900 rounded-xl p-3 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Closed</span>
                            <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-none">{stats.closed}</div>
                        <div className="text-[10px] text-emerald-500">selesai ditangani</div>
                    </div>

                    {/* Tindak Lanjut */}
                    <div className="bg-blue-50 dark:bg-blue-950/30 shadow-sm border border-blue-100 dark:border-blue-900 rounded-xl p-3 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Tindak Lanjut</span>
                            <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-blue-600 dark:text-blue-400 leading-none">{stats.tindakLanjut}</div>
                        <div className="w-full bg-blue-200/50 dark:bg-blue-900/30 h-1.5 rounded-full mt-1 overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${stats.total > 0 ? (stats.tindakLanjut / stats.total) * 100 : 0}%` }} />
                        </div>
                    </div>

                    {/* Close Rate */}
                    <div className="bg-violet-50 dark:bg-violet-950/30 shadow-sm border border-violet-100 dark:border-violet-900 rounded-xl p-3 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">Close Rate</span>
                            <div className="w-6 h-6 rounded-lg bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                                <Target className="w-3.5 h-3.5 text-violet-500" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-violet-600 dark:text-violet-400 leading-none">{stats.closeRate}%</div>
                        <div className="w-full bg-violet-200/50 dark:bg-violet-900/30 h-1.5 rounded-full mt-1 overflow-hidden">
                            <div className="bg-violet-500 h-full rounded-full transition-all duration-1000" style={{ width: `${stats.closeRate}%` }} />
                        </div>
                    </div>
                </div>

                {/* ── Controls ─────────────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                    {/* Search */}
                    <div className="relative w-full sm:w-[220px] shrink-0">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <Input
                            placeholder="Cari area, temuan, pelapor..."
                            className="pl-8 h-9 text-xs bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-sm rounded-lg"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filter Status */}
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="h-9 w-full sm:w-[145px] text-xs border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm rounded-lg shrink-0">
                            <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Semua Status</SelectItem>
                            <SelectItem value="OPEN">Open</SelectItem>
                            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                            <SelectItem value="CLOSED">Closed</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Filter Kategori */}
                    <div className="flex-1 min-w-0 overflow-x-auto flex gap-1.5 items-center scrollbar-hide pb-1 -mb-1">
                        {['', 'Man', 'Machine', 'Material', 'Method'].map(kat => (
                            <Button
                                key={kat}
                                variant={filterKategori === kat ? 'default' : 'outline'}
                                onClick={() => setFilterKategori(kat)}
                                className={`rounded-full h-8 px-3.5 font-bold text-[11px] whitespace-nowrap shrink-0 border shadow-sm transition-colors ${filterKategori === kat ? 'bg-slate-900 dark:bg-slate-100 text-white border-slate-900' : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'}`}
                            >
                                {kat === '' ? 'Semua' : kat}
                            </Button>
                        ))}
                    </div>

                    {/* Sort */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSortOrder(s => s === 'desc' ? 'asc' : 'desc')}
                                className="h-9 w-9 p-0 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm rounded-lg shrink-0"
                            >
                                {sortOrder === 'desc' ? <SortDesc className="w-4 h-4 text-slate-500" /> : <SortAsc className="w-4 h-4 text-slate-500" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{sortOrder === 'desc' ? 'Terbaru → Terlama' : 'Terlama → Terbaru'}</TooltipContent>
                    </Tooltip>
                </div>

                {/* Result count */}
                <div className="flex items-center gap-2 -mt-2">
                    <span className="text-[11px] text-slate-500">
                        Menampilkan <span className="font-bold text-slate-900 dark:text-slate-50">{filteredData.length}</span> dari {data.length} temuan
                        {(searchQuery || filterKategori || filterStatus) && <span className="text-indigo-600 font-semibold"> (filter aktif)</span>}
                    </span>
                </div>

                {/* ── Table Card ──────────────────────────────────────────── */}
                <Card className="bg-white dark:bg-slate-950 shadow-md border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                    <CardContent className="p-0">

                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto min-h-[400px]">
                            <Table className="min-w-full">
                                <TableHeader className="bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="w-[50px] font-bold text-slate-500 text-xs h-10 py-2 pl-5">#</TableHead>
                                        <TableHead className="font-bold text-slate-500 text-xs h-10 py-2 w-[140px]">
                                            <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />Tanggal</div>
                                        </TableHead>
                                        <TableHead className="font-bold text-slate-500 text-xs h-10 py-2 w-[180px]">
                                            <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />Area / Tempat</div>
                                        </TableHead>
                                        <TableHead className="font-bold text-slate-500 text-xs h-10 py-2 w-[130px]">
                                            <div className="flex items-center gap-1"><Layers className="w-3 h-3" />Kategori 4M</div>
                                        </TableHead>
                                        <TableHead className="font-bold text-slate-500 text-xs h-10 py-2">Deskripsi Temuan</TableHead>
                                        <TableHead className="font-bold text-slate-500 text-xs h-10 py-2 w-[115px]">Status</TableHead>
                                        <TableHead className="font-bold text-slate-500 text-xs h-10 py-2 w-[180px]">Tindak Perbaikan</TableHead>
                                        <TableHead className="font-bold text-slate-500 text-xs h-10 py-2 w-[130px]">
                                            <div className="flex items-center gap-1"><User className="w-3 h-3" />Pelapor</div>
                                        </TableHead>
                                        <TableHead className="font-bold text-slate-500 text-xs h-10 py-2 w-[80px]">Dok.</TableHead>
                                        <TableHead className="text-right font-bold text-slate-500 text-xs h-10 py-2 pr-4 w-[200px]">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={10} className="text-center py-16">
                                                <div className="flex flex-col items-center gap-3 text-slate-400">
                                                    <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                                                    <span className="text-xs font-medium">Memuat data temuan...</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : paginatedData.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={10} className="text-center py-16">
                                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                                    <Shield className="w-10 h-10 opacity-30" />
                                                    <span className="text-sm font-semibold">Tidak ada data</span>
                                                    <span className="text-xs">Coba ubah filter atau tambah temuan baru.</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginatedData.map((item, index) => {
                                            const ageDays = getAgeDays(item.tanggal);
                                            const isOverdue = (item.status === 'OPEN' || !item.status) && ageDays >= 7;
                                            return (
                                                <TableRow
                                                    key={item.id}
                                                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors group ${isOverdue ? 'bg-rose-50/20 dark:bg-rose-950/10' : ''}`}
                                                >
                                                    {/* No */}
                                                    <TableCell className="py-3 pl-5 text-xs font-bold text-slate-400">
                                                        {(page - 1) * ITEMS_PER_PAGE + index + 1}
                                                    </TableCell>

                                                    {/* Tanggal */}
                                                    <TableCell className="py-3">
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="font-bold text-slate-800 dark:text-slate-100 text-xs">{formatDateDDMMM(item.tanggal)}</span>
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-[10px] text-slate-400">{item.jam}</span>
                                                                <AgeBadge dateStr={item.tanggal} status={item.status} />
                                                            </div>
                                                            <span className="text-[9px] text-slate-400 italic">{getAgeLabel(ageDays)}</span>
                                                        </div>
                                                    </TableCell>

                                                    {/* Area */}
                                                    <TableCell className="py-3">
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="font-bold text-slate-800 dark:text-slate-100 text-xs truncate max-w-[155px]">{item.area}</span>
                                                            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium truncate max-w-[155px]">{item.tempatTemuan}</span>
                                                        </div>
                                                    </TableCell>

                                                    {/* Kategori */}
                                                    <TableCell className="py-3">
                                                        <div className="flex flex-wrap gap-1">{formatKategori(item.kategori4M)}</div>
                                                    </TableCell>

                                                    {/* Deskripsi */}
                                                    <TableCell className="py-3 max-w-[200px]">
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <div className="text-xs text-slate-600 dark:text-slate-300 truncate font-medium cursor-default">{item.temuan}</div>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="max-w-xs text-xs">{item.temuan}</TooltipContent>
                                                        </Tooltip>
                                                    </TableCell>

                                                    {/* Status */}
                                                    <TableCell className="py-3">{getStatusBadge(item.status)}</TableCell>

                                                    {/* Tindakan */}
                                                    <TableCell className="py-3 max-w-[175px]">
                                                        {item.tindakanPerbaikan ? (
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <div className="text-xs text-emerald-700 dark:text-emerald-400 truncate font-medium cursor-default">{item.tindakanPerbaikan}</div>
                                                                </TooltipTrigger>
                                                                <TooltipContent className="max-w-xs text-xs">{item.tindakanPerbaikan}</TooltipContent>
                                                            </Tooltip>
                                                        ) : (
                                                            <span className="text-slate-400 italic text-[10px]">Belum ada tindakan</span>
                                                        )}
                                                    </TableCell>

                                                    {/* Pelapor */}
                                                    <TableCell className="py-3">
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                                                                {(item.user ? item.user.firstName[0] : (item.diInputOleh?.[0] || 'U')).toUpperCase()}
                                                            </div>
                                                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[90px]">
                                                                {item.user ? `${item.user.firstName} ${item.user.lastName}` : item.diInputOleh}
                                                            </span>
                                                        </div>
                                                    </TableCell>

                                                    {/* Dokumentasi */}
                                                    <TableCell className="py-3">
                                                        <div className="flex flex-col gap-1 items-start">
                                                            {item.fotoUrls?.length > 0 ? (
                                                                <Button variant="ghost" size="sm" onClick={() => viewPhotos(item.fotoUrls)} className="h-5 px-1.5 text-[9px] font-bold gap-1 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded">
                                                                    <ImageIcon className="w-2.5 h-2.5" />{item.fotoUrls.length} Tmn
                                                                </Button>
                                                            ) : <span className="text-slate-300 text-[10px] pl-1">—</span>}
                                                            {item.fotoPerbaikanUrls?.length > 0 && (
                                                                <Button variant="ghost" size="sm" onClick={() => viewPhotos(item.fotoPerbaikanUrls)} className="h-5 px-1.5 text-[9px] font-bold gap-1 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded">
                                                                    <ImageIcon className="w-2.5 h-2.5" />{item.fotoPerbaikanUrls.length} Prb
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </TableCell>

                                                    {/* Aksi */}
                                                    <TableCell className="text-right py-3 pr-4">
                                                        <div className="flex justify-end gap-1">
                                                            <Button variant="outline" size="sm" className="h-7 px-2.5 text-[10px] font-bold rounded-md text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 shadow-sm" onClick={() => handleViewDetail(item)}>
                                                                <Eye className="w-3.5 h-3.5 mr-1" />Detail
                                                            </Button>
                                                            <Button variant="outline" size="sm" className="h-7 px-2.5 text-[10px] font-bold rounded-md text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 shadow-sm" onClick={() => handleEdit(item)}>
                                                                <Wrench className="w-3.5 h-3.5 mr-1" />Improve
                                                            </Button>
                                                            <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-md text-rose-500 border-rose-200 bg-rose-50 hover:bg-rose-100 shadow-sm" onClick={() => triggerDelete(item.id)}>
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col md:flex-row items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 gap-3 bg-slate-50/50 dark:bg-slate-900/20">
                            <div className="text-center md:text-left">
                                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    {filteredData.length} Temuan &bull; Halaman <span className="text-slate-900 dark:text-slate-50">{page}</span> dari {totalPages}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                                <Button variant="ghost" size="sm" disabled={page === 1 || loading} onClick={() => setPage(1)} className="rounded-md h-7 px-2 text-[10px] font-bold disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">«</Button>
                                <Button variant="ghost" size="sm" disabled={page === 1 || loading} onClick={() => setPage(p => p - 1)} className="rounded-md h-7 w-7 p-0 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"><ArrowLeft className="w-4 h-4" /></Button>
                                <div className="flex items-center gap-0.5 px-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pn = page <= 3 ? i + 1 : page - 2 + i;
                                        if (pn > totalPages) return null;
                                        return (
                                            <Button key={i} variant={page === pn ? 'default' : 'ghost'} size="sm" onClick={() => setPage(pn)} className={`rounded-md h-7 w-7 font-bold text-[10px] min-w-[28px] p-0 ${page === pn ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                                                {pn}
                                            </Button>
                                        );
                                    })}
                                </div>
                                <Button variant="ghost" size="sm" disabled={page === totalPages || loading} onClick={() => setPage(p => p + 1)} className="rounded-md h-7 w-7 p-0 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"><ArrowRight className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="sm" disabled={page === totalPages || loading} onClick={() => setPage(totalPages)} className="rounded-md h-7 px-2 text-[10px] font-bold disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">»</Button>
                            </div>
                        </div>

                        {/* Mobile View (Cards) */}
                        <div className="block md:hidden space-y-3 p-3 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800">
                            {loading ? (
                                <div className="text-center py-10 text-slate-400 text-xs flex flex-col items-center gap-2">
                                    <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />Memuat data...
                                </div>
                            ) : paginatedData.length === 0 ? (
                                <div className="text-center py-10 text-slate-400 text-xs">Belum ada data temuan.</div>
                            ) : (
                                paginatedData.map((item) => {
                                    const ageDays = getAgeDays(item.tanggal);
                                    const isOverdue = (item.status === 'OPEN' || !item.status) && ageDays >= 7;
                                    return (
                                        <div key={item.id} className={`bg-white dark:bg-slate-950 rounded-xl overflow-hidden shadow-sm border ${isOverdue ? 'border-rose-200 dark:border-rose-900' : 'border-slate-200 dark:border-slate-800'}`}>
                                            {/* Progress indicator */}
                                            <div className="h-0.5 w-full bg-slate-100 dark:bg-slate-800">
                                                <div className={`h-full transition-all duration-700 ${item.status === 'CLOSED' ? 'w-full bg-emerald-500' : item.status === 'IN_PROGRESS' ? 'w-2/3 bg-amber-500' : 'w-1/4 bg-rose-500'}`} />
                                            </div>

                                            <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                    {getStatusBadge(item.status)}
                                                    <div>
                                                        <p className="font-bold text-slate-800 dark:text-slate-100 text-[11px] truncate max-w-[140px]">{item.area}</p>
                                                        <p className="text-indigo-600 dark:text-indigo-400 text-[9px] font-semibold truncate max-w-[140px]">{item.tempatTemuan}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end shrink-0 gap-0.5">
                                                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{formatDateDDMMM(item.tanggal)}</span>
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-[9px] text-slate-400">{item.jam}</span>
                                                        <AgeBadge dateStr={item.tanggal} status={item.status} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-3 space-y-2.5">
                                                <div>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Deskripsi Temuan</p>
                                                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">{item.temuan}</p>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kategori</p>
                                                        <div className="flex flex-wrap gap-1">{formatKategori(item.kategori4M)}</div>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Umur Temuan</p>
                                                        <p className={`text-[10px] font-bold ${isOverdue ? 'text-rose-600' : 'text-slate-600'}`}>{getAgeLabel(ageDays)}</p>
                                                    </div>
                                                </div>

                                                {item.tindakanPerbaikan && (
                                                    <div>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tindak Perbaikan</p>
                                                        <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium line-clamp-2">{item.tindakanPerbaikan}</p>
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-[9px] font-bold text-white">
                                                            {(item.user ? item.user.firstName[0] : (item.diInputOleh?.[0] || 'U')).toUpperCase()}
                                                        </div>
                                                        <span className="text-[10px] font-semibold text-slate-600 truncate max-w-[80px]">
                                                            {item.user ? `${item.user.firstName} ${item.user.lastName}` : item.diInputOleh}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {item.fotoUrls?.length > 0 && (
                                                            <Button variant="outline" size="sm" onClick={() => viewPhotos(item.fotoUrls)} className="h-6 px-1.5 text-[9px] font-bold gap-1 text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 rounded-md">
                                                                <ImageIcon className="w-2.5 h-2.5" />{item.fotoUrls.length}
                                                            </Button>
                                                        )}
                                                        {item.fotoPerbaikanUrls?.length > 0 && (
                                                            <Button variant="outline" size="sm" onClick={() => viewPhotos(item.fotoPerbaikanUrls)} className="h-6 px-1.5 text-[9px] font-bold gap-1 text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 rounded-md">
                                                                <ImageIcon className="w-2.5 h-2.5" />{item.fotoPerbaikanUrls.length}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex border-t border-slate-100 dark:border-slate-800">
                                                <Button variant="ghost" className="flex-1 h-9 rounded-none text-[10px] font-bold text-emerald-600 hover:bg-emerald-50 border-r border-slate-100 dark:border-slate-800" onClick={() => handleViewDetail(item)}>
                                                    <Eye className="w-3.5 h-3.5 mr-1" />Detail
                                                </Button>
                                                <Button variant="ghost" className="flex-1 h-9 rounded-none text-[10px] font-bold text-blue-600 hover:bg-blue-50 border-r border-slate-100 dark:border-slate-800" onClick={() => handleEdit(item)}>
                                                    <Wrench className="w-3.5 h-3.5 mr-1" />Improve
                                                </Button>
                                                <Button variant="ghost" className="flex-1 h-9 rounded-none text-[10px] font-bold text-rose-500 hover:bg-rose-50" onClick={() => triggerDelete(item.id)}>
                                                    <Trash2 className="w-3.5 h-3.5 mr-1" />Hapus
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* ── Form Modal ───────────────────────────────────────────── */}
                <TemuanForm open={isFormOpen} onOpenChange={setIsFormOpen} onSuccess={fetchData} initialData={selectedItem} />

                {/* ── Photo Preview ────────────────────────────────────────── */}
                <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                    <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-xl rounded-xl">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 sticky top-0 z-10">
                            <ImageIcon className="w-4 h-4 text-indigo-500" />
                            <DialogTitle className="text-sm font-bold text-slate-900 dark:text-slate-50">Dokumentasi Foto</DialogTitle>
                            <Badge className="ml-auto bg-indigo-100 text-indigo-700 border-none text-[10px]">{previewImages.length} foto</Badge>
                        </div>
                        <div className="p-4 max-h-[75vh] overflow-y-auto">
                            <div className={`grid grid-cols-1 ${previewImages.length > 1 ? 'md:grid-cols-2' : ''} gap-4`}>
                                {previewImages.map((url, i) => (
                                    <div key={i} className="flex flex-col bg-white dark:bg-slate-950 p-2 rounded-xl border border-slate-100 shadow-sm group">
                                        <div className="relative flex justify-center items-center rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 min-h-[200px]">
                                            <img src={`${BACKEND_URL}${url}`} alt={`Foto ${i + 1}`} className="max-w-full max-h-[60vh] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105" />
                                            <div className="absolute top-2 right-2 bg-slate-900/60 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-sm font-medium">
                                                {i + 1} / {previewImages.length}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* ── Detail Dialog ────────────────────────────────────────── */}
                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="max-w-[95vw] sm:max-w-4xl rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl p-0 overflow-hidden bg-white dark:bg-slate-950">
                        {selectedDetail && (
                            <div className="flex flex-col sm:flex-row w-full max-h-[88vh]">
                                {/* Left: Photo */}
                                <div className="w-full sm:w-2/5 min-h-[200px] bg-slate-100 dark:bg-slate-800 flex flex-col relative overflow-hidden border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800">
                                    {selectedDetail.fotoUrls?.length > 0 ? (
                                        <>
                                            <div className="flex-1 w-full flex items-center justify-center overflow-hidden cursor-pointer group" onClick={() => viewPhotos(selectedDetail.fotoUrls)}>
                                                <img src={`${BACKEND_URL}${selectedDetail.fotoUrls[0]}`} alt="Utama" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <div className="bg-white/90 rounded-full px-3 py-1.5 text-xs font-bold text-slate-700">Lihat Semua</div>
                                                </div>
                                            </div>
                                            {selectedDetail.fotoUrls.length > 1 && (
                                                <div className="h-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 p-2 flex gap-2 overflow-x-auto shrink-0">
                                                    {selectedDetail.fotoUrls.slice(1).map((url: string, i: number) => (
                                                        <div key={i} className="h-full w-16 shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-400 transition-colors" onClick={() => viewPhotos(selectedDetail.fotoUrls)}>
                                                            <img src={`${BACKEND_URL}${url}`} className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center min-h-[200px]">
                                            <ImageIcon className="w-10 h-10 mb-2 opacity-40" />
                                            <span className="text-[10px] font-semibold uppercase tracking-wider">Tidak ada dokumentasi foto</span>
                                        </div>
                                    )}
                                    {/* Badges overlay */}
                                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                                        <Badge className="bg-indigo-500 text-white font-bold uppercase text-[9px] border-0 shadow px-2">{selectedDetail.area}</Badge>
                                        {getStatusBadge(selectedDetail.status)}
                                    </div>
                                </div>

                                {/* Right: Details */}
                                <div className="w-full sm:w-3/5 flex flex-col overflow-y-auto">
                                    {/* Detail Header */}
                                    <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <DialogTitle className="text-lg font-black text-slate-900 dark:text-slate-50 tracking-tight uppercase leading-tight">{selectedDetail.area}</DialogTitle>
                                                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Detail Temuan Peduli Bersinergi</p>
                                            </div>
                                            <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl flex items-center justify-center text-indigo-500 border border-indigo-100 dark:border-indigo-900/50 shrink-0">
                                                <ListChecks className="w-4.5 h-4.5" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 space-y-5 flex-1">
                                        {/* Meta Info Grid */}
                                        <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-3.5 rounded-xl">
                                            <div className="space-y-0.5">
                                                <Label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />Tempat</Label>
                                                <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">{selectedDetail.tempatTemuan || 'N/A'}</p>
                                            </div>
                                            <div className="space-y-0.5">
                                                <Label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><Calendar className="w-2.5 h-2.5" />Waktu</Label>
                                                <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">{formatDateDDMMM(selectedDetail.tanggal)} {selectedDetail.jam}</p>
                                            </div>
                                            <div className="space-y-0.5">
                                                <Label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><User className="w-2.5 h-2.5" />Pelapor</Label>
                                                <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                                                    {selectedDetail.user ? `${selectedDetail.user.firstName} ${selectedDetail.user.lastName}` : selectedDetail.diInputOleh}
                                                </p>
                                            </div>
                                            <div className="space-y-0.5">
                                                <Label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><Timer className="w-2.5 h-2.5" />Umur Temuan</Label>
                                                <div className="flex items-center gap-1.5">
                                                    <p className={`text-xs font-bold ${getAgeDays(selectedDetail.tanggal) >= 14 ? 'text-rose-600' : getAgeDays(selectedDetail.tanggal) >= 7 ? 'text-amber-600' : 'text-slate-900 dark:text-slate-50'}`}>
                                                        {getAgeDays(selectedDetail.tanggal)} hari
                                                    </p>
                                                    <span className="text-[10px] text-slate-400">({getAgeLabel(getAgeDays(selectedDetail.tanggal))})</span>
                                                </div>
                                            </div>
                                            <div className="col-span-2 space-y-0.5">
                                                <Label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><Tags className="w-2.5 h-2.5" />Kategori 4M</Label>
                                                <div className="flex flex-wrap gap-1 mt-0.5">{formatKategori(selectedDetail.kategori4M)}</div>
                                            </div>
                                        </div>

                                        {/* Status Timeline */}
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Activity className="w-3 h-3" />Progress Status</Label>
                                            <div className="flex items-center gap-0 relative">
                                                {[
                                                    { label: 'Dilaporkan', icon: AlertTriangle, active: true, color: 'bg-rose-500 border-rose-500 text-rose-500' },
                                                    { label: 'Ditindaklanjuti', icon: Wrench, active: selectedDetail.status === 'IN_PROGRESS' || selectedDetail.status === 'CLOSED', color: 'bg-amber-500 border-amber-500 text-amber-500' },
                                                    { label: 'Selesai', icon: CheckCircle2, active: selectedDetail.status === 'CLOSED', color: 'bg-emerald-500 border-emerald-500 text-emerald-500' },
                                                ].map((step, i, arr) => (
                                                    <div key={i} className="flex items-center flex-1">
                                                        <div className="flex flex-col items-center gap-1 flex-1">
                                                            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${step.active ? step.color + ' text-white' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-300'}`}>
                                                                <step.icon className="w-3.5 h-3.5" />
                                                            </div>
                                                            <span className={`text-[9px] font-bold text-center leading-tight ${step.active ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'}`}>{step.label}</span>
                                                        </div>
                                                        {i < arr.length - 1 && (
                                                            <div className={`h-0.5 flex-1 -mt-4 transition-all ${arr[i + 1].active ? 'bg-amber-400' : 'bg-slate-200 dark:bg-slate-800'}`} />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Deskripsi Temuan */}
                                        <div className="space-y-1.5">
                                            <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Info className="w-3 h-3" />Deskripsi Temuan</Label>
                                            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden min-h-[90px]">
                                                <Info className="w-20 h-20 absolute -left-3 -top-3 text-slate-200/40 -rotate-12 pointer-events-none" />
                                                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic relative z-10">
                                                    "{selectedDetail.temuan}"
                                                </p>
                                            </div>
                                        </div>

                                        {/* Tindak Lanjut */}
                                        <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Wrench className="w-3 h-3 text-blue-500" />Tindak Lanjut & Perbaikan</Label>
                                                {getStatusBadge(selectedDetail.status)}
                                            </div>
                                            <div className="bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 min-h-[70px]">
                                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                                    {selectedDetail.tindakanPerbaikan || <span className="text-slate-400 italic">Belum ada tindakan perbaikan yang dicatat.</span>}
                                                </p>
                                            </div>

                                            {selectedDetail.fotoPerbaikanUrls?.length > 0 && (
                                                <div className="mt-3">
                                                    <Label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                                                        Dokumentasi Perbaikan ({selectedDetail.fotoPerbaikanUrls.length} foto)
                                                    </Label>
                                                    <div className="flex gap-2 overflow-x-auto pb-1">
                                                        {selectedDetail.fotoPerbaikanUrls.map((url: string, i: number) => (
                                                            <div key={i} className="h-16 w-16 shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-blue-400 transition-colors shadow-sm" onClick={() => viewPhotos(selectedDetail.fotoPerbaikanUrls)}>
                                                                <img src={`${BACKEND_URL}${url}`} className="w-full h-full object-cover" alt={`Perbaikan ${i + 1}`} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Detail Footer Actions */}
                                    <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex gap-2 justify-end">
                                        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-bold text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100" onClick={() => { setIsDetailOpen(false); handleEdit(selectedDetail); }}>
                                            <Wrench className="w-3.5 h-3.5" />Improve / Edit
                                        </Button>
                                        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-bold text-rose-600 border-rose-200 bg-rose-50 hover:bg-rose-100" onClick={() => { setIsDetailOpen(false); triggerDelete(selectedDetail.id); }}>
                                            <Trash2 className="w-3.5 h-3.5" />Hapus
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* ── Delete Confirm ───────────────────────────────────────── */}
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent className="sm:max-w-md border-rose-200 dark:border-rose-900 bg-white dark:bg-slate-950">
                        <DialogHeader className="items-center sm:items-start text-center sm:text-left">
                            <div className="flex justify-center sm:justify-start w-full mb-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/50">
                                    <Trash2 className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                                </div>
                            </div>
                            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">Hapus Data Temuan?</DialogTitle>
                            <DialogDescription className="text-slate-500 dark:text-slate-400 text-sm">
                                Data temuan ini akan dihapus secara <strong>permanen</strong> beserta semua foto dokumentasi. Tindakan ini tidak dapat dibatalkan.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex sm:justify-end gap-2 mt-4">
                            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="w-full sm:w-auto font-bold border-slate-200 hover:bg-slate-100">
                                Batal
                            </Button>
                            <Button type="button" variant="destructive" onClick={confirmDelete} className="w-full sm:w-auto font-bold bg-rose-600 hover:bg-rose-700 shadow-md gap-2">
                                <Trash2 className="w-4 h-4" />Ya, Hapus Sekarang
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </TooltipProvider>
    );
}
