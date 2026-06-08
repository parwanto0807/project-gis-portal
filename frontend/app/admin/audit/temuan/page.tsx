'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { PlusCircle, Edit, Trash2, Image as ImageIcon, FileSpreadsheet, FileText, Search, ArrowLeft, ArrowRight, Eye, MapPin, Calendar, User, Clock, Wrench } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { TemuanForm } from '@/components/temuan/TemuanForm';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ListChecks, Info, Tags } from 'lucide-react';

const formatDateDDMMM = (dateStr: string | Date) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '-';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};

const formatPrintDateTime = () => {
    const d = new Date();
    const datePart = formatDateDDMMM(d);
    const timeOptions: Intl.DateTimeFormatOptions = { 
        timeZone: 'Asia/Jakarta', 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    const timeStr = d.toLocaleTimeString('id-ID', timeOptions).replace(/\./g, ':');
    return `Jakarta, ${datePart} ${timeStr}`;
};

export default function TemuanPeduliPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    
    // For Image Preview
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    // Detail Dialog
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState<any>(null);

    // Search, Filter, Pagination
    const [searchQuery, setSearchQuery] = useState('');
    const [filterKategori, setFilterKategori] = useState('');
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get('/temuan-peduli');
            if (res.data.success) {
                setData(res.data.data);
            }
        } catch (error) {
            toast.error('Gagal mengambil data temuan');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
        try {
            await api.delete(`/temuan-peduli/${id}`);
            toast.success('Data berhasil dihapus');
            fetchData();
        } catch (error) {
            toast.error('Gagal menghapus data');
        }
    };

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setSelectedItem(null);
        setIsFormOpen(true);
    };

    const handleViewDetail = (item: any) => {
        setSelectedDetail(item);
        setIsDetailOpen(true);
    };

    const viewPhotos = (urls: string[]) => {
        setPreviewImages(urls);
        setIsPreviewOpen(true);
    };

    const formatKategori = (cat: any) => {
        if (!cat) return null;
        const arr = Array.isArray(cat) ? cat : [];
        return arr.map((c: string) => <Badge key={c} variant="secondary" className="mr-1">{c}</Badge>);
    };

    const exportToExcel = () => {
        if (data.length === 0) {
            toast.error('Tidak ada data untuk diexport');
            return;
        }

        const exportData = data.map((item, index) => ({
            No: index + 1,
            Tanggal: formatDateDDMMM(item.tanggal),
            Jam: item.jam,
            Area: item.area,
            'Tempat Temuan': item.tempatTemuan,
            'Kategori 4M': Array.isArray(item.kategori4M) ? item.kategori4M.join(', ') : item.kategori4M || '',
            'Deskripsi Temuan': item.temuan,
            'Status': item.status || 'OPEN',
            'Tindakan Perbaikan': item.tindakanPerbaikan || '-',
            'Diinput Oleh': item.user ? `${item.user.firstName} ${item.user.lastName}` : item.diInputOleh,
            'Jumlah Foto': item.fotoUrls ? item.fotoUrls.length : 0
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Temuan');
        
        const wscols = [
            {wch: 5}, {wch: 15}, {wch: 10}, {wch: 20}, {wch: 20}, {wch: 20}, {wch: 40}, {wch: 15}, {wch: 40}, {wch: 20}, {wch: 15}
        ];
        worksheet['!cols'] = wscols;

        XLSX.writeFile(workbook, `Temuan_Audit_${new Date().toISOString().slice(0,10)}.xlsx`);
    };

    const exportToPDF = async () => {
        if (data.length === 0) {
            toast.error('Tidak ada data untuk diexport');
            return;
        }

        const doc = new jsPDF('landscape');
        
        // --- Header with Logo and Company Info ---
        try {
            const logoUrl = '/logo-md.png';
            const img = new window.Image();
            img.src = logoUrl;
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                const imgData = canvas.toDataURL('image/png');
                doc.addImage(imgData, 'PNG', 14, 10, 25, (img.height * 25 / img.width));
            }
        } catch (e) {
            console.warn('Failed to load logo for PDF', e);
        }

        const textX = 45; 
        
        // Company Name
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 255);
        doc.setFont("helvetica", "bold");
        doc.text('PT. GRAFINDO MITRASEMESTA', textX, 16);
        
        // Address & Phone
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        doc.setFont("helvetica", "normal");
        doc.text('Cikarang Industrial Estate Jababeka 1 Block U 8D, U 8C & U 7A, Cikarang, Harja Mekar', textX, 22);
        doc.text('Cikarang Utara, Bekasi Regency, West Java 17530 | Telepon: (021) 8934714', textX, 27);
        
        // Separator line
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(14, 32, 283, 32);

        // Report Title
        doc.setFontSize(14);
        doc.setTextColor(40, 40, 40);
        doc.setFont("helvetica", "bold");
        doc.text('LAPORAN AUDIT INTERNAL - Temuan Peduli Bersinergi', 14, 42);
        
        // --- Data Aggregation ---
        
        // --- Data Aggregation Variables ---
        const totalTemuan = data.length;
        
        const kategoriCount: Record<string, number> = {};
        data.forEach(item => {
            const cats = Array.isArray(item.kategori4M) ? item.kategori4M : (item.kategori4M ? [item.kategori4M] : ['Lainnya']);
            cats.forEach((c: string) => {
                kategoriCount[c] = (kategoriCount[c] || 0) + 1;
            });
        });
        const sortedKategori = Object.entries(kategoriCount).sort((a, b) => b[1] - a[1]);
        
        const areaCount: Record<string, number> = {};
        data.forEach(item => {
            const area = item.area || 'Lainnya';
            areaCount[area] = (areaCount[area] || 0) + 1;
        });
        const sortedArea = Object.entries(areaCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

        // --- Executive Summary ---
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 40);
        doc.setFont("helvetica", "bold");
        doc.text('Ringkasan Eksekutif', 14, 52);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Total Temuan: ${totalTemuan} kasus`, 14, 60);
        doc.text(`Tanggal Cetak: ${formatPrintDateTime()}`, 14, 66);

        // --- Pie Chart Helper ---
        const colors = [
            [41, 128, 185], // Blue
            [231, 76, 60],  // Red
            [46, 204, 113], // Green
            [241, 196, 15], // Yellow
            [155, 89, 182], // Purple
            [52, 73, 94]    // Dark Blue
        ];

        const drawPieChart = (cx: number, cy: number, radius: number, dataEntries: any[], title: string) => {
            const total = dataEntries.reduce((sum, item) => sum + item[1], 0);
            if (total === 0) return;

            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.text(title, cx - radius, cy - radius - 5);
            doc.setFont("helvetica", "normal");
            
            let currentAngle = -Math.PI / 2;
            let legendY = cy - radius + 2;

            dataEntries.forEach((item, index) => {
                const count = item[1];
                const label = item[0];
                const color = colors[index % colors.length];
                const sliceAngle = (count / total) * 2 * Math.PI;
                
                // Draw pie slice using triangles
                const numSegments = Math.max(5, Math.floor((sliceAngle / (2 * Math.PI)) * 30));
                doc.setFillColor(color[0], color[1], color[2]);
                
                const pts = [[cx, cy]];
                for (let i = 0; i <= numSegments; i++) {
                    const angle = currentAngle + (i / numSegments) * sliceAngle;
                    pts.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
                }
                
                for (let i = 1; i < pts.length - 1; i++) {
                    doc.triangle(pts[0][0], pts[0][1], pts[i][0], pts[i][1], pts[i+1][0], pts[i+1][1], 'F');
                }
                
                currentAngle += sliceAngle;
                
                // Draw Legend
                doc.setFillColor(color[0], color[1], color[2]);
                doc.rect(cx + radius + 8, legendY - 3, 4, 4, 'F');
                doc.setTextColor(50);
                doc.setFontSize(9);
                const perc = Math.round((count / total) * 100);
                doc.text(`${label.substring(0, 15)} (${perc}%)`, cx + radius + 15, legendY);
                legendY += 6;
            });
        };

        // Draw Pie Charts
        drawPieChart(110, 67, 15, sortedKategori.slice(0, 5), 'Distribusi 4M:');
        drawPieChart(210, 67, 15, sortedArea.slice(0, 5), 'Top 5 Area:');

        // Line separator before table
        const finalY = 92;
        doc.setDrawColor(200, 200, 200);
        doc.line(14, finalY + 2, 283, finalY + 2);

        // --- Detail Table ---
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 40);
        doc.setFont("helvetica", "bold");
        doc.text('Rincian Data Temuan', 14, finalY + 10);

        const tableColumn = ["No", "Waktu", "Area/Tempat", "Kategori", "Deskripsi", "Status", "Tindakan Perbaikan", "Pelapor"];
        const tableRows: any[] = [];

        data.forEach((item, index) => {
            const itemData = [
                index + 1,
                `${formatDateDDMMM(item.tanggal)}\n${item.jam}`,
                `${item.area}\n${item.tempatTemuan}`,
                Array.isArray(item.kategori4M) ? item.kategori4M.join(', ') : item.kategori4M || '',
                item.temuan,
                item.status || 'OPEN',
                item.tindakanPerbaikan || '-',
                item.user ? `${item.user.firstName} ${item.user.lastName}` : item.diInputOleh,
            ];
            tableRows.push(itemData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: finalY + 15,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 3 },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 20 },
                2: { cellWidth: 30 },
                3: { cellWidth: 25 },
                4: { cellWidth: 'auto' },
                5: { cellWidth: 20 },
                6: { cellWidth: 45 },
                7: { cellWidth: 25 },
            },
            didParseCell: function(data) {
                if (data.section === 'body' && data.column.index === 5) {
                    const statusText = data.cell.raw;
                    if (statusText === 'OPEN') {
                        data.cell.styles.textColor = [231, 76, 60]; // Red
                        data.cell.styles.fontStyle = 'bold';
                    } else if (statusText === 'IN_PROGRESS') {
                        data.cell.styles.textColor = [243, 156, 18]; // Orange/Amber
                        data.cell.styles.fontStyle = 'bold';
                    } else if (statusText === 'CLOSED') {
                        data.cell.styles.textColor = [46, 204, 113]; // Green
                        data.cell.styles.fontStyle = 'bold';
                    }
                }
            }
        });

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
    };

    useEffect(() => {
        setPage(1);
    }, [searchQuery, filterKategori]);

    const filteredData = data.filter(item => {
        const searchLower = searchQuery.toLowerCase();
        const pelapor = item.user ? `${item.user.firstName} ${item.user.lastName}` : item.diInputOleh;
        const matchesSearch = 
            item.area?.toLowerCase().includes(searchLower) ||
            item.tempatTemuan?.toLowerCase().includes(searchLower) ||
            item.temuan?.toLowerCase().includes(searchLower) ||
            pelapor?.toLowerCase().includes(searchLower);
        
        const matchesKategori = filterKategori === '' || (Array.isArray(item.kategori4M) ? item.kategori4M.includes(filterKategori) : item.kategori4M === filterKategori);

        return matchesSearch && matchesKategori;
    });

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE) || 1;
    const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'CLOSED':
                return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">Closed</Badge>;
            case 'IN_PROGRESS':
                return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none">In Progress</Badge>;
            default:
                return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-none">Open</Badge>;
        }
    };

    const totalTemuan = data.length;
    const closedTemuan = data.filter(d => d.status === 'CLOSED').length;
    const inProgressTemuan = data.filter(d => d.status === 'IN_PROGRESS').length;
    const openTemuan = data.filter(d => d.status === 'OPEN').length || data.filter(d => !d.status).length;
    const tindakLanjutTemuan = closedTemuan + inProgressTemuan;

    return (
        <div className="space-y-6">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                <div className="flex flex-col gap-1.5">
                    <Badge variant="secondary" className="w-fit px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-800">
                        <Breadcrumb>
                            <BreadcrumbList className="text-[10px] md:text-xs">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/admin/dashboard" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-50">Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/admin/audit" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-50">Audit</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-slate-900 dark:text-slate-50 font-semibold">Temuan Peduli</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </Badge>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight flex items-center gap-2">
                            <ListChecks className="w-5 h-5 text-indigo-600" />
                            Temuan Peduli Bersinergi
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Daftar temuan audit internal dari berbagai area gedung.</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full sm:w-auto">
                    <Button onClick={exportToExcel} variant="outline" size="sm" className="h-8 gap-2 bg-green-50 text-green-700 hover:bg-green-100 border-green-200 w-full sm:w-auto justify-center">
                        <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
                    </Button>
                    <Button onClick={exportToPDF} variant="outline" size="sm" className="h-8 gap-2 bg-red-50 text-red-700 hover:bg-red-100 border-red-200 w-full sm:w-auto justify-center">
                        <FileText className="w-3.5 h-3.5" /> PDF
                    </Button>
                    <Button onClick={handleCreate} size="sm" className="hidden sm:flex h-8 gap-2 w-full sm:w-auto justify-center">
                        <PlusCircle className="w-3.5 h-3.5" /> Tambah Temuan
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
                <div className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex flex-col justify-center">
                    <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Temuan</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-slate-50 leading-none">{totalTemuan}</div>
                </div>
                
                <div className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex flex-col justify-center">
                    <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Sudah Ditindaklanjuti</div>
                    <div className="flex items-end justify-between leading-none">
                        <div className="text-xl font-bold text-emerald-600 leading-none">{tindakLanjutTemuan}</div>
                        <p className="text-[9px] text-slate-400">In Progress & Closed</p>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex flex-col justify-center">
                    <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Status Perbaikan</div>
                    <div className="flex gap-4 items-center">
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-rose-500 leading-none">{openTemuan}</span>
                            <span className="text-[9px] text-slate-500 uppercase">Open</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-amber-500 leading-none">{inProgressTemuan}</span>
                            <span className="text-[9px] text-slate-500 uppercase">In Prog</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-emerald-500 leading-none">{closedTemuan}</span>
                            <span className="text-[9px] text-slate-500 uppercase">Closed</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Create Button */}
            <div className="block sm:hidden mb-2">
                <Button onClick={handleCreate} className="w-full h-10 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm">
                    <PlusCircle className="w-4 h-4" /> Tambah Temuan Baru
                </Button>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between pb-2">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <Input 
                        placeholder="Search by area, description, or pelapor..." 
                        className="pl-8 h-8 text-xs bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 w-full shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 flex bg-white dark:bg-slate-950 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm scrollbar-hide">
                    {['', 'Man', 'Machine', 'Material', 'Method'].map(kat => (
                        <Button 
                            key={kat}
                            variant={filterKategori === kat ? 'default' : 'ghost'} 
                            onClick={() => setFilterKategori(kat)}
                            className={`rounded-md h-7 px-3 font-semibold text-[10px] uppercase tracking-wider whitespace-nowrap ${filterKategori === kat ? 'bg-slate-900 dark:bg-slate-100 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-900'}`}
                        >
                            {kat === '' ? 'Semua Kategori' : kat}
                        </Button>
                    ))}
                </div>
            </div>

            <Card className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800">
                <CardContent className="p-0">
                    {/* Desktop / Tablet View (Table) */}
                    <div className="hidden md:block overflow-x-auto min-h-[400px]">
                        <Table className="min-w-full">
                            <TableHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[60px] font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2 pl-4">No</TableHead>
                                    <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2 w-[130px]">Tanggal & Jam</TableHead>
                                    <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2 w-[160px]">Area / Tempat</TableHead>
                                    <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2 w-[140px]">Kategori 4M</TableHead>
                                    <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2">Deskripsi Temuan</TableHead>
                                    <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2 w-[110px]">Status</TableHead>
                                    <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2">Tindakan Perbaikan</TableHead>
                                    <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2 w-[130px]">Pelapor</TableHead>
                                    <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2 w-[100px]">Foto</TableHead>
                                    <TableHead className="text-right font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2 pr-4 w-[220px]">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={10} className="text-center py-8 text-slate-400 font-medium text-xs">Memuat data...</TableCell>
                                    </TableRow>
                                ) : paginatedData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={10} className="text-center py-8 text-slate-400 font-medium text-xs">Belum ada data temuan peduli bersinergi.</TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <TableRow key={item.id} className="hover:bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
                                            <TableCell className="py-2 pl-4 text-xs font-medium text-slate-600 dark:text-slate-400">{(page - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                                            <TableCell className="py-2">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-900 dark:text-slate-50 text-xs">{formatDateDDMMM(item.tanggal)}</span>
                                                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.jam}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-900 dark:text-slate-50 text-xs">{item.area}</span>
                                                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.tempatTemuan}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <div className="flex flex-wrap gap-1">
                                                    {formatKategori(item.kategori4M)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <div className="text-xs text-slate-700 dark:text-slate-300 max-w-[180px] truncate" title={item.temuan}>
                                                    {item.temuan}
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-2">
                                                {getStatusBadge(item.status)}
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <div className="text-xs text-slate-700 dark:text-slate-300 max-w-[180px] truncate" title={item.tindakanPerbaikan}>
                                                    {item.tindakanPerbaikan || <span className="text-slate-400 italic text-[10px]">Belum ada</span>}
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                                    {item.user ? `${item.user.firstName} ${item.user.lastName}` : item.diInputOleh}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <div className="flex flex-col gap-1 items-start">
                                                    {item.fotoUrls && item.fotoUrls.length > 0 ? (
                                                        <Button variant="ghost" size="sm" onClick={() => viewPhotos(item.fotoUrls)} className="h-5 px-1.5 text-[9px] gap-1 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-100">
                                                            <ImageIcon className="w-2.5 h-2.5" /> {item.fotoUrls.length} Tmn
                                                        </Button>
                                                    ) : <span className="text-slate-400 text-[10px] pl-2">-</span>}
                                                    {item.fotoPerbaikanUrls && item.fotoPerbaikanUrls.length > 0 && (
                                                        <Button variant="ghost" size="sm" onClick={() => viewPhotos(item.fotoPerbaikanUrls)} className="h-5 px-1.5 text-[9px] gap-1 text-emerald-600 bg-emerald-50/50 hover:bg-emerald-100 mt-0.5">
                                                            <ImageIcon className="w-2.5 h-2.5" /> {item.fotoPerbaikanUrls.length} Prb
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right py-2 pr-4">
                                                <TooltipProvider>
                                                    <div className="flex justify-end gap-1.5">
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button variant="outline" size="sm" className="h-7 px-2.5 text-[10px] font-semibold rounded-md text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-700 transition-colors shadow-sm" onClick={() => handleViewDetail(item)}>
                                                                    <Eye className="w-3.5 h-3.5 mr-1" /> Detail
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="bg-slate-900 text-white border-slate-800">
                                                                <p>Lihat Detail Temuan</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                        
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button variant="outline" size="sm" className="h-7 px-2.5 text-[10px] font-semibold rounded-md text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 transition-colors shadow-sm" onClick={() => handleEdit(item)}>
                                                                    <Wrench className="w-3.5 h-3.5 mr-1" /> Improve
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="bg-slate-900 text-white border-slate-800">
                                                                <p>Update Status & Tindakan Perbaikan</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                        
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button variant="outline" size="sm" className="h-7 px-2.5 text-[10px] font-semibold rounded-md text-rose-600 border-rose-200 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 transition-colors shadow-sm" onClick={() => handleDelete(item.id)}>
                                                                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Hapus
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="bg-rose-600 text-white border-rose-600">
                                                                <p>Hapus Data Temuan Ini</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                </TooltipProvider>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex flex-col md:flex-row items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 gap-4">
                        <div className="space-y-0.5">
                            <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Total Result: <span className="text-slate-900 dark:text-slate-50">{filteredData.length} Temuan</span>
                            </p>
                            <p className="text-[9px] text-slate-400">Page {page} of {totalPages}</p>
                        </div>
                        
                        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800">
                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={page === 1 || loading}
                                onClick={() => setPage(p => p - 1)}
                                className="rounded-md h-7 w-7 p-0 disabled:opacity-20 hover:bg-white dark:bg-slate-950 hover:shadow-sm transition-all text-slate-500 dark:text-slate-400"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                            </Button>
                            
                            <div className="flex items-center">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum = page <= 3 ? i + 1 : page - 2 + i;
                                    if (pageNum > totalPages) return null;
                                    
                                    return (
                                        <Button
                                            key={i}
                                            variant={page === pageNum ? 'default' : 'ghost'}
                                            size="sm"
                                            onClick={() => setPage(pageNum)}
                                            className={`rounded-md h-7 w-7 font-semibold text-[10px] min-w-[28px] p-0 ${page === pageNum ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-sm border border-slate-200/50' : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:bg-slate-950 hover:text-slate-700 dark:text-slate-300'}`}
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                })}
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={page === totalPages || loading}
                                onClick={() => setPage(p => p + 1)}
                                className="rounded-md h-7 w-7 p-0 disabled:opacity-20 hover:bg-white dark:bg-slate-950 hover:shadow-sm transition-all text-slate-500 dark:text-slate-400"
                            >
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>

                    {/* Mobile View (Cards) */}
                    <div className="block md:hidden space-y-3 p-3">
                        {loading ? (
                            <div className="text-center py-10 text-slate-400 text-xs border rounded-lg border-slate-200 dark:border-slate-800">Memuat data...</div>
                        ) : paginatedData.length === 0 ? (
                            <div className="text-center py-10 text-slate-400 text-xs border rounded-lg border-slate-200 dark:border-slate-800">Belum ada data temuan.</div>
                        ) : (
                            <div className="space-y-3">
                                {paginatedData.map((item, index) => (
                                    <div key={item.id} className="bg-white dark:bg-slate-950 rounded-lg p-2.5 shadow-sm border border-slate-200 dark:border-slate-800">
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="flex items-center gap-1.5 overflow-hidden">
                                                {getStatusBadge(item.status)}
                                                <span className="font-bold text-slate-800 dark:text-slate-100 text-[10px] truncate max-w-[150px]">{item.area}</span>
                                                <span className="text-slate-400 text-[9px] truncate max-w-[100px]">• {item.tempatTemuan}</span>
                                            </div>
                                            <div className="text-[9px] font-medium text-slate-400 shrink-0">{formatDateDDMMM(item.tanggal)}</div>
                                        </div>
                                        
                                        <div className="space-y-0.5 mb-2">
                                            <p className="text-[10px] text-slate-600 dark:text-slate-300 truncate"><span className="font-medium text-slate-400 mr-1">Temuan:</span>{item.temuan}</p>
                                            {(item.tindakanPerbaikan || item.status !== 'OPEN') && (
                                                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 truncate"><span className="font-medium opacity-70 mr-1">Perbaikan:</span>{item.tindakanPerbaikan || <span className="italic opacity-60">Sedang diproses...</span>}</p>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center mt-1">
                                            <div className="flex flex-wrap gap-1">
                                                {formatKategori(item.kategori4M)}
                                            </div>
                                            
                                            <div className="flex items-center gap-0.5 shrink-0">
                                                {item.fotoUrls && item.fotoUrls.length > 0 && (
                                                    <Button variant="ghost" size="icon" onClick={() => viewPhotos(item.fotoUrls)} className="h-6 w-6 text-indigo-500 hover:bg-indigo-50" title="Foto Temuan">
                                                        <ImageIcon className="w-3.5 h-3.5" />
                                                    </Button>
                                                )}
                                                {item.fotoPerbaikanUrls && item.fotoPerbaikanUrls.length > 0 && (
                                                    <Button variant="ghost" size="icon" onClick={() => viewPhotos(item.fotoPerbaikanUrls)} className="h-6 w-6 text-emerald-500 hover:bg-emerald-50" title="Foto Perbaikan">
                                                        <ImageIcon className="w-3.5 h-3.5" />
                                                    </Button>
                                                )}
                                                <Button variant="ghost" size="icon" onClick={() => handleViewDetail(item)} className="h-6 w-6 text-emerald-500 hover:bg-emerald-50 ml-1">
                                                    <Eye className="w-3.5 h-3.5" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="h-6 w-6 text-blue-500 hover:bg-blue-50">
                                                    <Wrench className="w-3.5 h-3.5" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="h-6 w-6 text-rose-500 hover:bg-rose-50">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <TemuanForm 
                open={isFormOpen} 
                onOpenChange={setIsFormOpen} 
                onSuccess={fetchData} 
                initialData={selectedItem} 
            />

            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-xl rounded-xl">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-10">
                        <div>
                            <DialogTitle className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-slate-50">
                                <ImageIcon className="w-4 h-4 text-indigo-500" /> Dokumentasi Temuan
                            </DialogTitle>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                Terdapat {previewImages.length} foto dokumentasi untuk temuan ini.
                            </p>
                        </div>
                    </div>
                    <div className="p-4 max-h-[75vh] overflow-y-auto">
                        <div className={`grid grid-cols-1 ${previewImages.length > 1 ? 'md:grid-cols-2' : ''} gap-4`}>
                            {previewImages.map((url, i) => (
                                <div key={i} className="flex flex-col bg-white dark:bg-slate-950 p-2 rounded-lg border border-slate-100 shadow-sm group">
                                    <div className="relative flex justify-center items-center rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 min-h-[200px]">
                                        <img 
                                            src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '').replace('/api', '') || 'http://localhost:5001'}${url}`} 
                                            alt={`Foto ${i+1}`} 
                                            className="max-w-full max-h-[60vh] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                                        />
                                        <div className="absolute top-2 right-2 bg-slate-900/60 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-sm font-medium z-10">
                                            Foto {i+1} dari {previewImages.length}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* View Detail Dialog */}
            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="max-w-[95vw] sm:max-w-4xl rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl p-0 overflow-hidden bg-white dark:bg-slate-950">
                    {selectedDetail && (
                        <div className="flex flex-col sm:flex-row w-full h-full max-h-[85vh] overflow-y-auto sm:overflow-hidden">
                            {/* Left: Photos */}
                            <div className="w-full sm:w-2/5 min-h-[200px] sm:min-h-full bg-slate-100 dark:bg-slate-800 flex flex-col relative overflow-hidden border-r border-slate-200 dark:border-slate-800">
                                {selectedDetail.fotoUrls && selectedDetail.fotoUrls.length > 0 ? (
                                    <>
                                        <div className="flex-1 w-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden cursor-pointer group" onClick={() => viewPhotos(selectedDetail.fotoUrls)}>
                                            <img 
                                                src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '').replace('/api', '') || 'http://localhost:5001'}${selectedDetail.fotoUrls[0]}`} 
                                                alt="Dokumentasi Temuan Utama" 
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors" />
                                        </div>
                                        {selectedDetail.fotoUrls.length > 1 && (
                                            <div className="h-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 p-2 flex gap-2 overflow-x-auto shrink-0">
                                                {selectedDetail.fotoUrls.slice(1).map((url: string, i: number) => (
                                                    <div 
                                                        key={i} 
                                                        className="h-full w-20 shrink-0 rounded-md overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-400"
                                                        onClick={() => viewPhotos(selectedDetail.fotoUrls)}
                                                    >
                                                        <img 
                                                            src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '').replace('/api', '') || 'http://localhost:5001'}${url}`} 
                                                            className="w-full h-full object-cover" 
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                                        <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                                        <span className="text-[10px] font-semibold tracking-wider uppercase">Tidak ada dokumentasi foto</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                                    <Badge className="bg-indigo-500 dark:bg-indigo-600 text-white font-semibold uppercase text-[9px] border-0 shadow-sm px-1.5 py-0">
                                        {selectedDetail.area}
                                    </Badge>
                                </div>
                            </div>

                            {/* Right: Details */}
                            <div className="w-full sm:w-3/5 p-4 sm:p-6 flex flex-col overflow-y-auto">
                                <div className="space-y-5 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-0.5">
                                            <DialogTitle className="text-xl font-black text-slate-900 dark:text-slate-50 tracking-tight uppercase">
                                                {selectedDetail.area}
                                            </DialogTitle>
                                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Detail Temuan Peduli Bersinergi</p>
                                        </div>
                                        <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg flex items-center justify-center text-indigo-500 border border-indigo-100 dark:border-indigo-900/50">
                                            <ListChecks className="w-4 h-4" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-lg">
                                        <div className="space-y-0.5">
                                            <Label className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center">
                                                <MapPin className="w-2.5 h-2.5 mr-1" /> Tempat Temuan
                                            </Label>
                                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">{selectedDetail.tempatTemuan || "N/A"}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                            <Label className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center">
                                                <Calendar className="w-2.5 h-2.5 mr-1" /> Waktu Temuan
                                            </Label>
                                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">{formatDateDDMMM(selectedDetail.tanggal)} {selectedDetail.jam}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                            <Label className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center">
                                                <User className="w-2.5 h-2.5 mr-1" /> Pelapor
                                            </Label>
                                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                                                {selectedDetail.user ? `${selectedDetail.user.firstName} ${selectedDetail.user.lastName}` : selectedDetail.diInputOleh}
                                            </p>
                                        </div>
                                        <div className="space-y-0.5">
                                            <Label className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center">
                                                <Tags className="w-2.5 h-2.5 mr-1" /> Kategori 4M
                                            </Label>
                                            <div className="flex flex-wrap gap-1 mt-0.5">
                                                {Array.isArray(selectedDetail.kategori4M) 
                                                    ? selectedDetail.kategori4M.map((c: string) => (
                                                        <Badge key={c} variant="secondary" className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 text-[9px] px-1.5 py-0">
                                                            {c}
                                                        </Badge>
                                                    ))
                                                    : <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 text-[9px] px-1.5 py-0">{selectedDetail.kategori4M}</Badge>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 relative">
                                        <Label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 relative z-10">
                                            <Info className="w-3.5 h-3.5" /> Deskripsi Temuan
                                        </Label>
                                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden min-h-[120px]">
                                            <Info className="w-24 h-24 absolute -left-4 -top-4 text-slate-200/50 -rotate-12 pointer-events-none" />
                                            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic relative z-10">
                                                "{selectedDetail.temuan}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* Improvement / Status Section */}
                                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center justify-between mb-2 mt-2">
                                            <Label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                                <Wrench className="w-3.5 h-3.5 text-blue-500" /> Tindak Lanjut & Perbaikan
                                            </Label>
                                            {getStatusBadge(selectedDetail.status)}
                                        </div>
                                        
                                        <div className="bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 relative overflow-hidden min-h-[80px]">
                                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed relative z-10">
                                                {selectedDetail.tindakanPerbaikan || <span className="text-slate-400 italic">Belum ada tindakan perbaikan.</span>}
                                            </p>
                                        </div>
                                        
                                        {/* Foto Perbaikan */}
                                        {selectedDetail.fotoPerbaikanUrls && selectedDetail.fotoPerbaikanUrls.length > 0 && (
                                            <div className="mt-4">
                                                <Label className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">
                                                    Dokumentasi Perbaikan ({selectedDetail.fotoPerbaikanUrls.length} Foto)
                                                </Label>
                                                <div className="flex gap-2 overflow-x-auto pb-2">
                                                    {selectedDetail.fotoPerbaikanUrls.map((url: string, i: number) => (
                                                        <div 
                                                            key={i} 
                                                            className="h-16 w-16 shrink-0 rounded-md overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-blue-400 shadow-sm"
                                                            onClick={() => viewPhotos(selectedDetail.fotoPerbaikanUrls)}
                                                        >
                                                            <img 
                                                                src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '').replace('/api', '') || 'http://localhost:5001'}${url}`} 
                                                                className="w-full h-full object-cover" 
                                                                alt={`Foto Perbaikan ${i+1}`}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
